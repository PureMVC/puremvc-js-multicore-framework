//
//  SimpleCommandTestCommand.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {SimpleCommand} from "../../../src/index.js";

/**
 * A SimpleCommand subclass used by SimpleCommandTest.
 *
 * @class SimpleCommandTestCommand
 * @extends SimpleCommand
 */
class SimpleCommandTestCommand extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param {Notification} notification event the `INotification` carrying the `SimpleCommandTestVO`
     */
    execute(notification) {
        /** @type {SimpleCommandTestVO} */
        let vo = notification.body;

        // Fabricate a result
        vo.setResult(2 * vo.input);
    }

}

export { SimpleCommandTestCommand }
