import {define, initMethod, inject, singleton} from "appolo/index";
import * as socketIo from "socket.io";
import * as _ from "lodash";
import {IOptions} from "../IOptions";
import {SocketManager} from "./socketManager";
import {SocketController} from "./socketController";

@define()
@singleton()
export class SocketProvider {
    @inject() public socketServer: socketIo.Server;
    @inject() private socketManager: SocketManager;
    @inject() private moduleOptions: IOptions;


    @initMethod()
    private _init() {
        if (this.moduleOptions.auto) {
            this.initialize();
        }
    }

    public initialize() {
        this.socketManager.initialize();
    }

    public sendToAll(event: string, data: any): void {

        for (let namespace of this.socketManager.controllers.keys()){
            this.sendToNamesapce(namespace,event,data)
        }

    }

    public sendToNamesapce(namespace: string, event: string, data: any): void {
        this.socketServer.of(namespace).emit(event, data);
    }

    public get clients(): Map<string, SocketController> {
        return this.socketManager.clients;
    }


}