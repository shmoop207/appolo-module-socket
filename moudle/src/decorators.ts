import "reflect-metadata";
import {define} from '@appolo/inject';
import {Reflector, Classes,Strings,Functions} from '@appolo/utils';
import {ControllerOptions, MiddlewareTypes} from "./interfaces";

export const SocketControllerSymbol = "__SocketController__";


export function socket(namespace?: string) {
    return function (fn: any) {

        let data = Reflector.getFnMetadata<ControllerOptions>(SocketControllerSymbol, fn, {});

        data.namespace = namespace || "/";

        define()(fn);
    }
}

export function middleware(middleware?: MiddlewareTypes) {
    return function (fn: any) {

        if (Classes.isClass(middleware)) {
            middleware = Classes.className(middleware as Function)
        }

        let data = Reflector.getFnMetadata<ControllerOptions>(SocketControllerSymbol, fn, {});

        (data.middlewares || (data.middlewares = [])).push(middleware);
    }
}

export function action(eventName?: string) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let data = Reflector.getFnMetadata<ControllerOptions>(SocketControllerSymbol, target.constructor, {});

        data.actions = data.actions || (data.actions = {});

        data.actions[propertyKey] = eventName || propertyKey;

        let oldFn = descriptor.value;

        descriptor.value = async function () {
            let cb = arguments[arguments.length - 1];
            let hasCb = (typeof cb == "function");

            try {
                let result = await oldFn.apply(this, arguments);

                hasCb && cb(result);


            } catch (e) {
                hasCb && cb(e);
            }


        }
    }
}

