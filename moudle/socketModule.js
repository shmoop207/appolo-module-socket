"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
const socketProvider_1 = require("./src/socketProvider");
let SocketModule = class SocketModule extends index_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = { id: "socketProvider", auto: true };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: socketProvider_1.SocketProvider }];
    }
};
SocketModule = tslib_1.__decorate([
    index_1.module()
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socketModule.js.map