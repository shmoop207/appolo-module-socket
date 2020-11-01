"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.middleware = exports.socket = exports.SocketControllerSymbol = void 0;
require("reflect-metadata");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
exports.SocketControllerSymbol = "__SocketController__";
function socket(namespace) {
    return function (fn) {
        let data = utils_1.Reflector.getFnMetadata(exports.SocketControllerSymbol, fn, {});
        data.namespace = namespace || "/";
        inject_1.define()(fn);
    };
}
exports.socket = socket;
function middleware(middleware) {
    return function (fn) {
        if (utils_1.Classes.isClass(middleware)) {
            middleware = utils_1.Classes.className(middleware);
        }
        let data = utils_1.Reflector.getFnMetadata(exports.SocketControllerSymbol, fn, {});
        (data.middlewares || (data.middlewares = [])).push(middleware);
    };
}
exports.middleware = middleware;
function action(eventName) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(exports.SocketControllerSymbol, target.constructor, {});
        data.actions = data.actions || (data.actions = {});
        data.actions[propertyKey] = eventName || propertyKey;
        let oldFn = descriptor.value;
        descriptor.value = async function () {
            let cb = arguments[arguments.length - 1];
            let hasCb = (typeof cb == "function");
            try {
                let result = await oldFn.apply(this, arguments);
                hasCb && cb(result);
            }
            catch (e) {
                hasCb && cb(e);
            }
        };
    };
}
exports.action = action;
//# sourceMappingURL=decorators.js.map