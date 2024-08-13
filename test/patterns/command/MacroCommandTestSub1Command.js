import {SimpleCommand} from "../../../src/index.js";

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
class MacroCommandTestSub1Command extends SimpleCommand {

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
