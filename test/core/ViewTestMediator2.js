//
//  ViewTestMediator2.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

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
        return [ViewTestNote.NOTE1, ViewTestNote.NOTE2];
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
