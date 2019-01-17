import {module, Module} from "appolo/index";
import {IOptions} from "./IOptions";
import {SocketProvider} from "./src/socketProvider";

@module()
export class SocketModule extends Module<IOptions> {

    constructor(options?: IOptions) {
        super(options)
    }

    protected readonly Defaults: Partial<IOptions> = {id: "socketProvider", auto: true};

    public get exports() {
        return [{id: this.moduleOptions.id, type: SocketProvider}];
    }

}