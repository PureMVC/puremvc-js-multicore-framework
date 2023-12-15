import {puremvc} from "../../../bin/puremvc-2.0.0.min.js";

/**
 * A SimpleCommand subclass used by FacadeTest.
 *
 * @see FacadeTest
 * @see FacadeTestVO
 *
 * @class FacadeTestCommand
 * @extends SimpleCommand
 */
class FacadeTestCommand extends puremvc.SimpleCommand {

    /**
     * Fabricate a result by multiplying the input by 2
     *
     * @param {Notification} notification the Notification carrying the FacadeTestVO
     */
    execute(notification) {
        /** @type FacadeTestVO */
        let vo = notification.body;

        // Fabricate a result
        vo.result = 2 * vo.input;
    }

}
export {FacadeTestCommand}