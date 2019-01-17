"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_1 = require("appolo");
const _ = require("lodash");
exports.SocketControllerSymbol = Symbol("SocketController");
function socket(namespace) {
    return function (fn) {
        let data = appolo_1.Util.getReflectData(exports.SocketControllerSymbol, fn, {});
        data.namespace = namespace || "/";
        appolo_1.define()(fn);
    };
}
exports.socket = socket;
function middleware(middleware) {
    return function (fn) {
        if (appolo_1.Util.isClass(middleware)) {
            middleware = _.camelCase(middleware.name);
        }
        let data = appolo_1.Util.getReflectData(exports.SocketControllerSymbol, fn, {});
        (data.middlewares || (data.middlewares = [])).push(middleware);
    };
}
exports.middleware = middleware;
function action(eventName) {
    return function (target, propertyKey, descriptor) {
        let data = appolo_1.Util.getReflectData(exports.SocketControllerSymbol, target.constructor, {});
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