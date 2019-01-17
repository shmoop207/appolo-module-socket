import {IMiddleware} from "../../../index";
import * as socketIo from "socket.io";

import {define, NextFn} from "appolo/index";

@define()
export class TokenMiddleware implements IMiddleware {

    run(socket: socketIo.Socket, next: NextFn) {
        if (socket.handshake.query.token == "1") {
            socket.request.user = 1;
            next()
        } else {
            next(new Error("invalid token"))
        }

    }
}