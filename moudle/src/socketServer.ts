import {define, factory, IFactory, inject, Injector, singleton} from '@appolo/inject'
import {App} from '@appolo/core'
import {Objects} from '@appolo/utils'
import {IOptions} from "../IOptions";
import {Server} from 'socket.io' ;
import {createAdapter} from '@socket.io/redis-adapter';
import Redis = require("ioredis");

@define()
@singleton()
@factory()
export class SocketServer implements IFactory<Server> {

    @inject() injector: Injector;
    @inject() app: App;
    @inject() protected moduleOptions: IOptions;


    public async get() {

        let io = new Server((this.app.tree.root as App).route.server, Objects.defaults({}, this.moduleOptions.socket || {}, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            },
            transports: ['polling', 'websocket']
        }));

        if (this.moduleOptions.redis) {

            let pubClient = new Redis(this.moduleOptions.redis);
            let subClient = pubClient.duplicate();

            io.adapter(createAdapter(pubClient, subClient));
        }


        return io;

    }

}
