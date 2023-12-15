import {puremvc} from "../../../bin/puremvc-2.0.0.min.js";

/**
 * A SimpleCommand subclass used by SimpleCommandTest.
 *
 * @class SimpleCommandTestCommand
 * @extends SimpleCommand
 */
class SimpleCommandTestCommand extends puremvc.SimpleCommand {

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