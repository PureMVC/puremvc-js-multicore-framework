//
//  ControllerTestCommand.js
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
 * @class ControllerTestCommand
 * @extends SimpleCommand
 */
class ControllerTestCommand extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param notification the note carrying the ControllerTestVO
     */
    execute(notification) {
        /** @type ControllerTestVO */
        let vo = notification.body;

        // Fabricate a result
        vo.setResult(2 * vo.getInput());
    }
}
export { ControllerTestCommand }
