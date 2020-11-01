import {Module, module, IModuleParams} from "@appolo/engine";
import {IOptions} from "./IOptions";
import {SocketProvider} from "./src/socketProvider";

@module()
export class SocketModule extends Module<IOptions> {

    public static for(options: IOptions): IModuleParams {
        return {type: SocketModule, options}
    }

    protected readonly Defaults: Partial<IOptions> = {id: "socketProvider", auto: true};

    public get exports() {
        return [{id: this.moduleOptions.id, type: SocketProvider}];
    }

}
