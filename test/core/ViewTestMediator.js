import {puremvc} from "../../bin/puremvc.js";

/**
 * A Mediator class used by ViewTest.
 *
 * @class ViewTestMediator
 * @extends Mediator
 */
class ViewTestMediator extends puremvc.Mediator {

    /**
     * @param {View} view
     */
    constructor(view) {
        super(ViewTestMediator.NAME, view)
    }

    listNotificationInterests() {
        // be sure that the mediator has some Observers created
        // in order to test removeMediator
        return ["ABC", "DEF", "GHI"];
    }

    /**
     * The Mediator name
     */
    static get NAME() { return "ViewTestMediator" }
}
export {ViewTestMediator}
