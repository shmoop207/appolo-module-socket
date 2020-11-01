import { define, factory, IFactory, inject, Injector, singleton} from '@appolo/inject'
import {App} from '@appolo/core'
import {Objects} from '@appolo/utils'
import {IOptions} from "../IOptions";
import socketIo = require('socket.io');
import socketIoRedis = require('socket.io-redis');

@define()
@singleton()
@factory()
export class SocketServer implements IFactory<socketIo.Server> {

    @inject() injector: Injector;
    @inject() app: App;
    @inject() protected moduleOptions: IOptions;


    public async get() {

        let io = socketIo((this.app.tree.root as App).route.server, Objects.defaults({}, this.moduleOptions.socket || {}, {"transports": ['polling','websocket']}));

        if (this.moduleOptions.redis) {

            io.adapter(socketIoRedis(this.moduleOptions.redis));
        }



        return io;

    }

}
