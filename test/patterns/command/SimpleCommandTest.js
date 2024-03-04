import {puremvc} from "../../../bin/puremvc.min.js";
import chai from "chai"
import {SimpleCommandTestCommand} from "./SimpleCommandTestCommand.js";
import {SimpleCommandTestVO} from "./SimpleCommandTestVO.js";

/**
 * Test the PureMVC SimpleCommand class.
 *
 * @see SimpleCommandTestVO
 * @see SimpleCommandTestCommand
 */
describe("SimpleCommandTest", () => {

    /**
     * Tests the `execute` method of a `SimpleCommand`.
     *
     * <P>This test creates a new `Notification`, adding a
     * `SimpleCommandTestVO` as the body.
     * It then creates a `SimpleCommandTestCommand` and invokes
     * its `execute` method, passing in the note.</P>
     *
     * <P>Success is determined by evaluating a property on the
     * object that was passed on the Notification body, which will
     * be modified by the SimpleCommand</P>.
     */
    it("should testSimpleCommandExecute", () => {
        // Create the VO
        let vo = new SimpleCommandTestVO(5);

        // Create the Notification (note)
        let note = new puremvc.Notification("SimpleCommandTestNote", vo, "");

        // Create the SimpleCommand
        let command = new SimpleCommandTestCommand();

        // Execute the SimpleCommand
        command.execute(note);

        // test assertions
        chai.assert.isTrue(vo.getResult() === 10, "Expecting vo.result == 10");
    });

});
