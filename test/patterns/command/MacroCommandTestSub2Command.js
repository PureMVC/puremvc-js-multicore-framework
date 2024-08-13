import {SimpleCommand} from "../../../src/index.js";

/**
 * A SimpleCommand subclass used by MacroCommandTestCommand.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestCommand
 * @see MacroCommandTestVO
 *
 * @class MacroCommandTestSub2Command
 * @extends SimpleCommand
 */
class MacroCommandTestSub2Command extends SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by itself
     *
     * @param {Notification} notification event the `IEvent` carrying the `MacroCommandTestVO`
     */
    execute(notification) {
        /** @type MacroCommandTestVO */
        let vo = notification.body;

        // Fabricate a result
        vo.result2 = vo.input * vo.input;
    }
}
export { MacroCommandTestSub2Command }
