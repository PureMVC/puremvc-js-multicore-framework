import {puremvc} from "../../bin/puremvc-2.0.0.js";

/**
 * @class ViewTestMediator4
 * @extends Mediator
 */
class ViewTestMediator4 extends puremvc.Mediator {

    /**
     * Constructor
     * @param {Object} view
     */
    constructor(view) {
        super(ViewTestMediator4.NAME, view);
    }

    /**
     * @override
     */
    onRegister() {
        this.viewTest.onRegisterCalled = true;
    }

    /**
     * @override
     */
    onRemove() {
        this.viewTest.onRemoveCalled = true;
    }

    /**
     *
     * @returns {ViewTest}
     */
    get viewTest() {
        return this.viewComponent;
    }

    static get NAME() { return "ViewTestMediator4" }
}
export {ViewTestMediator4}