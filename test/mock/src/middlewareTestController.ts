import {action, socket, SocketController, middleware} from "../../../index";
import {TokenMiddleware} from "./tokenMiddleware";

@socket("/middleware")
@middleware(TokenMiddleware)
export class MiddlewareTestController extends SocketController {

    private user: any;

    async onConnected() {

        this.user = (this.socket.request as any).user
    }

    @action("middle")
    public test(name: string) {
        return {name, action: "MiddlewareTestController", user: this.user}
    }
}
