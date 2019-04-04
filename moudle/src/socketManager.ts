"use strict";
import {define, Events, IApp, initMethod, inject, Injector, NextFn, singleton} from 'appolo'
import * as socketIo from "socket.io";
import * as _ from "lodash";
import {SocketController} from "./socketController";
import {IOptions} from "../IOptions";
import {SocketControllerSymbol} from "./decorators";
import {ControllerOptions, IMiddleware, MiddlewareFn} from "./interfaces";

@define()
@singleton()
export class SocketManager {

    @inject() public socketServer: socketIo.Server;
    @inject() private moduleOptions: IOptions;
    @inject() private injector: Injector;
    @inject() private app: IApp;

    private _controllers: Map<string, typeof SocketController> = new Map();

    private _clients: Map<string, SocketController> = new Map();

    public initialize() {

        let parent = this.app;

        while (parent != null) {
            _.forEach(parent.exported, (item => this._createSocketClient(item)));
            parent = parent.parent;
        }

        this.app.once(Events.BeforeReset, () => {
            this.socketServer.close()
        })
    }

    public get clients() {
        return this._clients
    }

    public get controllers() {
        return this._controllers
    }

    private _createSocketClient(item: { fn: Function }) {
        let opts: ControllerOptions = Reflect.getOwnMetadata(SocketControllerSymbol, item.fn);

        if (!opts) {
            return
        }

        if (this._controllers.has(opts.namespace)) {
            throw new Error(`failed to load socket controller namespace already exists ${opts.namespace}`)
        }

        this._controllers.set(opts.namespace, item.fn as typeof SocketController);

        //convert middlewares
        let middlewares = _.map(opts.middlewares, (middleware) =>
            _.isString(middleware) ? this._invokeMiddleWare.bind(this, middleware) : middleware);

        middlewares.push(this._connectMiddleware.bind(this));

        _.forEach(middlewares, (middleware) =>
            this.socketServer.of(opts.namespace).use(middleware as MiddlewareFn))

    }

    private _invokeMiddleWare(middlewareId: string, socket: socketIo.Socket, next: NextFn) {

        try {
            let middleware = this.app.injector.get<IMiddleware>(middlewareId, [socket, next]);

            middleware.run(socket, next);
        } catch (e) {
            next(e);
        }
    }

    private async _connectMiddleware(socket: socketIo.Socket, next: NextFn) {
        try {
            let controller = this._controllers.get(socket.nsp.name);

            let options = Reflect.getOwnMetadata(SocketControllerSymbol, controller);

            let socketController = this.injector.get<SocketController>(controller, [socket, options]);

            await socketController.initialize();

            socket.once("disconnect", () => {
                this._clients.delete(socket.id);
                socket.removeAllListeners();
            });

            this._clients.set(socket.id, socketController);

            next()

        } catch (e) {

            next(e)
        }
    }


}
