import {Mediator} from "../../src/index.js";
import {ViewTestNote} from "./ViewTestNote.js";

/**
 * @class ViewTestMediator2
 * @extends Mediator
 */
class ViewTestMediator2 extends Mediator {

    /**
     * Constructor
     *
     * @constructor
     * @param view
     */
    constructor(view) {
        super(ViewTestMediator2.NAME, view);
    }

    /**
     * @override
     * @returns {[string]}
     */
    listNotificationInterests() {
        return [ViewTestNote.notes.NOTE1, ViewTestNote.notes.NOTE2];
    }

    /**
     * @override
     * @param notification
     */
    handleNotification(notification) {
        this.viewComponent.lastNotification = notification.name;
    }

    /**
     *
     * @returns {string}
     * @static
     */
    static get NAME() { return "ViewTestMediator2" }
}
export {ViewTestMediator2}
