"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.action = exports.socket = exports.SocketController = exports.SocketProvider = exports.SocketModule = void 0;
const socketModule_1 = require("./moudle/socketModule");
Object.defineProperty(exports, "SocketModule", { enumerable: true, get: function () { return socketModule_1.SocketModule; } });
const socketProvider_1 = require("./moudle/src/socketProvider");
Object.defineProperty(exports, "SocketProvider", { enumerable: true, get: function () { return socketProvider_1.SocketProvider; } });
const socketController_1 = require("./moudle/src/socketController");
Object.defineProperty(exports, "SocketController", { enumerable: true, get: function () { return socketController_1.SocketController; } });
const decorators_1 = require("./moudle/src/decorators");
Object.defineProperty(exports, "action", { enumerable: true, get: function () { return decorators_1.action; } });
Object.defineProperty(exports, "middleware", { enumerable: true, get: function () { return decorators_1.middleware; } });
Object.defineProperty(exports, "socket", { enumerable: true, get: function () { return decorators_1.socket; } });
exports.socketIO = require("socket.io");
//# sourceMappingURL=index.js.map