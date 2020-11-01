"use strict";
var SocketModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const socketProvider_1 = require("./src/socketProvider");
let SocketModule = SocketModule_1 = class SocketModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = { id: "socketProvider", auto: true };
    }
    static for(options) {
        return { type: SocketModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: socketProvider_1.SocketProvider }];
    }
};
SocketModule = SocketModule_1 = tslib_1.__decorate([
    engine_1.module()
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socketModule.js.map