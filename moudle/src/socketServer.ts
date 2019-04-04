import {App, define, factory, IFactory, inject, Injector, singleton} from 'appolo'
import {IOptions} from "../IOptions";
import socketIo = require('socket.io');
import socketIoRedis = require('socket.io-redis');
import _ = require('lodash');

@define()
@singleton()
@factory()
export class SocketServer implements IFactory<socketIo.Server> {

    @inject() injector: Injector;
    @inject() app: App;
    @inject() protected moduleOptions: IOptions;


    public async get() {

        let io = socketIo(this.app.root.server, _.defaults({}, this.moduleOptions.socket || {}, {"transports": ['polling','websocket']}));

        if (this.moduleOptions.redis) {

            io.adapter(socketIoRedis(this.moduleOptions.redis));
        }


        return io;

    }

}
