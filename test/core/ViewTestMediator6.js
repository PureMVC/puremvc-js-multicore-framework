import {Mediator} from "../../src/index.js";
import {ViewTestNote} from "./ViewTestNote.js";

/**
 * @class ViewTestMediator6
 * @extends Mediator
 */
class ViewTestMediator6 extends Mediator {

    constructor(name, view) {
        super(name, view);
    }

    listNotificationInterests() {
        return [ViewTestNote.NOTE6];
    }

    handleNotification(notification) {
        this.facade.removeMediator(this.mediatorName);
    }

    onRemove() {
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
     * The Mediator base name
     *
     * @static
     * @returns {string}
     */
    static get NAME() { return "ViewTestMediator6" }

}
export {ViewTestMediator6}
