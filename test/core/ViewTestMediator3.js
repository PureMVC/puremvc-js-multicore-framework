import {Mediator} from "../../src/index.js";
import {ViewTestNote} from "./ViewTestNote.js";

/**
 * @class ViewTestMediator3
 * @extends Mediator
 */
class ViewTestMediator3 extends Mediator {

    /**
     * @constructor
     * @param {object} view
     */
    constructor(view) {
        super(ViewTestMediator3.NAME, view);
    }

    listNotificationInterests() {
        // be sure that the mediator has some Observers created
        // in order to test removeMediator
        return [ViewTestNote.notes.NOTE3];
    }

    /**
     * @override
     * @param notification
     */
    handleNotification(notification) {
        this.viewComponent.lastNotification = notification.name;
    }

    /**
     * The Mediator name
     * @returns {string}
     */
    static get NAME() { return "ViewTestMediator3" }

}
export {ViewTestMediator3}
