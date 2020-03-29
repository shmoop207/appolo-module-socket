"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_1 = require("appolo");
const __1 = require("../");
const io = require("socket.io-client");
const appolo_utils_1 = require("appolo-utils");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.use(sinonChai);
let should = require('chai').should();
//chai.use(sinonChai);
describe("socket module Spec", function () {
    let app, socket;
    beforeEach(async () => {
        app = appolo_1.createApp({ root: __dirname + "/mock", environment: "production", port: 8182 });
        await app.module(new __1.SocketModule({ socket: { transports: ['polling', 'websocket'] } }));
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    it("should load socket", async () => {
        socket = io('http://localhost:8182', {
            transports: ['polling', 'websocket'], transportOptions: {
                polling: {
                    extraHeaders: {
                        'x-clientid': 'abc'
                    }
                }
            }
        });
        await new Promise((resolve, reject) => {
            socket.on('connect', resolve);
            socket.on('connect_error', reject);
        });
        let data = await new Promise(resolve => {
            socket.emit("test2", "ping", resolve);
        });
        data.name.should.be.eq("ping");
        data.action.should.be.eq("test");
        socket.disconnect();
    });
    it("should load socket with namespace", async () => {
        socket = io('http://localhost:8182/foo', { transports: ['websocket'], forceNew: true });
        let data = await new Promise(resolve => {
            socket.emit("foo", "ping", resolve);
        });
        data.name.should.be.eq("ping");
        data.action.should.be.eq("NamespaceTestController");
        socket.disconnect();
    });
    it("should load socket with middleware", async () => {
        socket = io('http://localhost:8182/middleware', { transports: ['websocket'], forceNew: true, query: { token: 1 } });
        let data = await new Promise(resolve => {
            socket.emit("middle", "ping", resolve);
        });
        data.name.should.be.eq("ping");
        data.action.should.be.eq("MiddlewareTestController");
        data.user.should.be.eq(1);
        socket.disconnect();
    });
    it("should load socket with middleware invalid", async () => {
        socket = io('http://localhost:8182/middleware', { transports: ['websocket'], forceNew: true, query: { token: 2 } });
        let err = await new Promise((resolve, reject) => {
            socket.on("error", resolve);
        });
        err.should.be.eq("invalid token");
        socket.disconnect();
    });
    it("should have 2 sockets", async () => {
        let socket1 = io('http://localhost:8182/middleware', {
            transports: ['websocket'],
            forceNew: true,
            query: { token: 1 }
        });
        let socket2 = io('http://localhost:8182/foo', { transports: ['websocket'], forceNew: true, query: { token: 2 } });
        let [data1, data2] = await Promise.all([new Promise(resolve => {
                socket1.emit("middle", "ping", resolve);
            }), new Promise(resolve => {
                socket2.emit("foo", "ping", resolve);
            })]);
        data2.name.should.be.eq("ping");
        data2.action.should.be.eq("NamespaceTestController");
        data1.name.should.be.eq("ping");
        data1.action.should.be.eq("MiddlewareTestController");
        data1.user.should.be.eq(1);
        socket1.disconnect();
        socket2.disconnect();
    });
    it("should have socket provider", async () => {
        let socket1 = io('http://localhost:8182/middleware', {
            transports: ['websocket'],
            forceNew: true,
            query: { token: 1 }
        });
        await new Promise(resolve => socket1.on("connect", resolve));
        let socketProvider = app.injector.get(__1.SocketProvider);
        socketProvider.clients.size.should.eq(2);
        setTimeout(() => socketProvider.sendToAll("test", "working"));
        let result = await new Promise(resolve => socket1.once("test", resolve));
        result.should.be.eq("working");
        setTimeout(() => socketProvider.sendToNamespace("/middleware", "test", "working2"));
        let result2 = await new Promise(resolve => socket1.once("test", resolve));
        result2.should.be.eq("working2");
        socket1.disconnect();
    });
    it("should messages with redis", async () => {
        let redis = process.env.REDIS;
        let app = appolo_1.createApp({ root: __dirname + "/mock", environment: "production", port: 8184 });
        let app2 = appolo_1.createApp({ root: __dirname + "/mock", environment: "production", port: 8183 });
        await app.module(new __1.SocketModule({ redis, socket: { transports: ['polling', 'websocket'] } }));
        await app2.module(new __1.SocketModule({ redis, socket: { transports: ['polling', 'websocket'] } }));
        await app.launch();
        await app2.launch();
        let socket = io('http://localhost:8184/multi', { transports: ['websocket'], forceNew: true });
        let socket2 = io('http://localhost:8183/multi', { transports: ['websocket'], forceNew: true });
        let spy = sinon.spy();
        let spy2 = sinon.spy();
        socket2.on("test", spy2);
        socket.on("test", spy);
        await new Promise(resolve => socket.emit("multi", "aaa", resolve));
        await appolo_utils_1.Promises.delay(1000);
        spy.should.have.been.called;
        spy2.should.have.been.called;
        await app.reset();
        await app2.reset();
    });
});
//# sourceMappingURL=spec.js.map