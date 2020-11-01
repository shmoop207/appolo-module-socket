"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const decorators_1 = require("./decorators");
let SocketManager = class SocketManager {
    constructor() {
        this._controllers = new Map();
        this._clients = new Map();
    }
    initialize() {
        let parent = this.app;
        while (parent != null) {
            parent.discovery.exported.forEach(item => this._createSocketClient(item));
            parent = parent.tree.parent;
        }
        this.app.event.beforeReset.on(() => {
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
        let middlewares = (opts.middlewares || []).map(middleware => utils_1.Strings.isString(middleware) ? this._invokeMiddleWare.bind(this, middleware) : middleware);
        middlewares.push(this._connectMiddleware.bind(this));
        (middlewares || []).forEach(middleware => this.socketServer.of(opts.namespace).use(middleware));
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
    inject_1.inject()
], SocketManager.prototype, "socketServer", void 0);
tslib_1.__decorate([
    inject_1.inject()
], SocketManager.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    inject_1.inject()
], SocketManager.prototype, "injector", void 0);
tslib_1.__decorate([
    inject_1.inject()
], SocketManager.prototype, "app", void 0);
SocketManager = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], SocketManager);
exports.SocketManager = SocketManager;
//# sourceMappingURL=socketManager.js.map