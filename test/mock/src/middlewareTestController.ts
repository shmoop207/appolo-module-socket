import {action, socket, SocketController,middleware} from "../../../index";
import {TokenMiddleware} from "./tokenMiddleware";

@socket("/middleware")
@middleware(TokenMiddleware)
export class MiddlewareTestController extends SocketController {

    private user:any
    onConnected(){

        this.user = this.socket.request.user
    }

    @action("middle")
    public test(name: string) {
        return {name, action: "MiddlewareTestController",user:this.user}
    }
}