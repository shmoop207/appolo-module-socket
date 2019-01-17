import {action, socket, SocketController} from "../../../index";

@socket("/foo")
export class NamespaceTestController extends SocketController {

    @action("foo")
    public test(name: string) {
        return {name, action: "NamespaceTestController"}
    }
}