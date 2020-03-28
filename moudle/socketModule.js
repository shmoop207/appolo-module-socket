"use strict";
var SocketModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
const socketProvider_1 = require("./src/socketProvider");
let SocketModule = SocketModule_1 = class SocketModule extends index_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = { id: "socketProvider", auto: true };
    }
    static for(options) {
        return new SocketModule_1(options);
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: socketProvider_1.SocketProvider }];
    }
};
SocketModule = SocketModule_1 = tslib_1.__decorate([
    index_1.module()
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socketModule.js.map