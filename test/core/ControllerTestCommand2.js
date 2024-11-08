//
//  ControllerTestCommand2.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {SimpleCommand} from "../../src/index.js";

/**
 * A SimpleCommand subclass used by ControllerTest.
 *
 * @see ControllerTest
 * @see ControllerTestVO
 *
 * @class ControllerTestCommand2
 * @extends SimpleCommand
 */
class ControllerTestCommand2 extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2 and adding to the existing result
     *
     * @param {Notification} notification
     */
    execute(notification) {
        /** @type ControllerTestVO */
        let vo = notification.body;

        // Fabricate a result
        vo.setResult(vo.getResult() + (2 * vo.getInput()));
    }

}
export { ControllerTestCommand2 }
