import {Mediator} from "../../src/index.js";
import {ViewTestNote} from "./ViewTestNote.js";

/**
 * @class ViewTestMediator5
 * @extends Mediator
 */
class ViewTestMediator5 extends Mediator {

    /**
     *
     * @param {Object} view
     */
    constructor(view) {
        super(ViewTestMediator5.NAME, view);
    }

    /**
     * @override
     * @returns {[string]}
     */
    listNotificationInterests() {
        return [ViewTestNote.NOTE5];
    }

    /**
     * @override
     * @param {Notification} notification
     */
    handleNotification(notification) {
        this.viewTest.counter++;
    }

    /**
     *
     * @returns {Object}
     */
    get viewTest() {
        return this.viewComponent;
    }

    /**
     *
     * @static
     * @returns {string}
     */
    static get NAME() { return "ViewTestMediator5" }
}
export {ViewTestMediator5}
