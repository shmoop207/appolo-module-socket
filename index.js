"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketModule_1 = require("./moudle/socketModule");
exports.SocketModule = socketModule_1.SocketModule;
const socketProvider_1 = require("./moudle/src/socketProvider");
exports.SocketProvider = socketProvider_1.SocketProvider;
const socketController_1 = require("./moudle/src/socketController");
exports.SocketController = socketController_1.SocketController;
const decorators_1 = require("./moudle/src/decorators");
exports.action = decorators_1.action;
exports.middleware = decorators_1.middleware;
exports.socket = decorators_1.socket;
exports.socketIO = require("socket.io");
//# sourceMappingURL=index.js.map