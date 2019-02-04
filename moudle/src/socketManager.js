"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const _ = require("lodash");
const decorators_1 = require("./decorators");
let SocketManager = class SocketManager {
    constructor() {
        this._controllers = new Map();
        this._clients = new Map();
    }
    initialize() {
        _.forEach(this.app.parent.exported, (item => this._createSocketClient(item)));
        this.app.once(appolo_1.Events.BeforeReset, () => {
            this.socketServer.close();
        });
    }
    get clients() {
        return this._clients;
    }
    get controllers() {
        return this._controllers;
    }
    _createSocketClient(item) {
        let opts = Reflect.getOwnMetadata(decorators_1.SocketControllerSymbol, item.fn);
        if (!opts) {
            return;
        }
        if (this._controllers.has(opts.namespace)) {
            throw new Error(`failed to load socket controller namespace already exists ${opts.namespace}`);
        }
        this._controllers.set(opts.namespace, item.fn);
        //convert middlewares
        let middlewares = _.map(opts.middlewares, (middleware) => _.isString(middleware) ? this._invokeMiddleWare.bind(this, middleware) : middleware);
        middlewares.push(this._connectMiddleware.bind(this));
        _.forEach(middlewares, (middleware) => this.socketServer.of(opts.namespace).use(middleware));
    }
    _invokeMiddleWare(middlewareId, socket, next) {
        try {
            let middleware = this.app.injector.get(middlewareId, [socket, next]);
            middleware.run(socket, next);
        }
        catch (e) {
            next(e);
        }
    }
    async _connectMiddleware(socket, next) {
        try {
            let controller = this._controllers.get(socket.nsp.name);
            let options = Reflect.getOwnMetadata(decorators_1.SocketControllerSymbol, controller);
            let socketController = this.injector.get(controller, [socket, options]);
            await socketController.initialize();
            socket.once("disconnect", () => {
                this._clients.delete(socket.id);
                socket.removeAllListeners();
            });
            this._clients.set(socket.id, socketController);
            next();
        }
        catch (e) {
            next(e);
        }
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], SocketManager.prototype, "socketServer", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], SocketManager.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], SocketManager.prototype, "injector", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], SocketManager.prototype, "app", void 0);
SocketManager = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], SocketManager);
exports.SocketManager = SocketManager;
//# sourceMappingURL=socketManager.js.map