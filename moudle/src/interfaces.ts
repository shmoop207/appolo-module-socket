import * as socketIo from "socket.io";
import {NextFn} from '@appolo/route'

export type MiddlewareTypes = string | IMiddlewareCtr | MiddlewareFn

export type MiddlewareFn = (socket: socketIo.Socket, next: NextFn) => any

export interface IMiddleware {
    run(socket: socketIo.Socket, next: NextFn)
}


export interface IMiddlewareCtr {
    new(...args: any[]): IMiddleware
}

export interface ControllerOptions {
    namespace?: string
    middlewares?: MiddlewareTypes[]
    actions?: { [index: string]: string }
}
