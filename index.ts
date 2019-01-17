"use strict";
import {SocketModule} from "./moudle/socketModule";
import {IMiddleware} from "./moudle/src/interfaces";
import {SocketProvider} from "./moudle/src/socketProvider";
import {SocketController} from "./moudle/src/socketController";
import {action, middleware, socket} from "./moudle/src/decorators";
export import socketIO = require('socket.io');

export {SocketModule, SocketProvider, SocketController, socket, action, middleware,IMiddleware}


