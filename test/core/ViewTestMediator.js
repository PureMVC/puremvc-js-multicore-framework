//
//  ViewTestMediator.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator} from "../../src/index.js";

/**
 * A Mediator class used by ViewTest.
 *
 * @class ViewTestMediator
 * @extends Mediator
 */
class ViewTestMediator extends Mediator {

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
