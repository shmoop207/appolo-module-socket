import {action, socket, SocketController, SocketProvider} from "../../../index";
import {inject} from "appolo";

@socket("/multi")
export class MultiSocketTestController extends SocketController {

    @inject() socketProvider: SocketProvider;

    protected async onConnected() {

        this.socket.join("roomTest");
    }

    @action("multi")
    public test(name: string) {

        this.socketProvider.sendToNamespaceRoom("/multi", "roomTest", "test", {working: 1});

        return {name, action: "MultiSocketTestController"}
    }
}
