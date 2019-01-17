import {IModuleOptions} from "appolo/index";
import socketIo = require('socket.io');


export interface IOptions extends IModuleOptions {
    id?: string,
    redis?: string,
    auto?: boolean,
    socket?: socketIo.ServerOptions

}