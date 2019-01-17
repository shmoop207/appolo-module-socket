import {action, socket, SocketController} from "../../../index";

@socket()
export class testController extends SocketController {

    @action("test2")
    public test(name: string) {
        return {name, action: "test"}
    }
}