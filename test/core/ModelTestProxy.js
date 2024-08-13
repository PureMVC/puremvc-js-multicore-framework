import {Proxy} from "../../src/index.js"

/**
 * @class ModelTestProxy
 * @extends Proxy
 */
class ModelTestProxy extends Proxy {

    constructor() {
        super(ModelTestProxy.NAME, "");
    }

    onRegister() {
        this.data = ModelTestProxy.ON_REGISTER_CALLED
    }

    onRemove() {
        this.data = ModelTestProxy.ON_REMOVE_CALLED
    }

    static get ON_REGISTER_CALLED() { return "onRegister Called" }

    static get ON_REMOVE_CALLED() { return "onRemove Called" }

    static get NAME() { return "ModelTestProxy" }

}
export { ModelTestProxy }
