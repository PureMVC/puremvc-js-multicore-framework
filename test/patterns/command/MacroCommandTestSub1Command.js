import {puremvc} from "../../../bin/puremvc-2.0.0.min.js";

/**
 * A SimpleCommand subclass used by MacroCommandTestCommand.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestCommand
 * @see MacroCommandTestVO
 *
 * @class MacroCommandTestSub1Command
 * @extends SimpleCommand
 */
class MacroCommandTestSub1Command extends puremvc.SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param {Notification} notification event the `IEvent` carrying the `MacroCommandTestVO`
     */
    execute(notification) {
        /** @type MacroCommandTestVO */
        let vo = notification.body;

        // Fabricate a result
        vo.result1 = 2 * vo.input;
    }
}
export { MacroCommandTestSub1Command }
