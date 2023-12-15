import {puremvc} from "../../../bin/puremvc-2.0.0.min.js";
import chai from "chai"
import {MacroCommandTestCommand} from "./MacroCommandTestCommand.js"
import {MacroCommandTestVO} from "./MacroCommandTestVO.js"
/**
 * Test the PureMVC SimpleCommand class.
 *
 * @see MacroCommandTestVO
 * @see MacroCommandTestCommand
 */
describe("MacroCommandTest", () => {

    /**
     * Tests operation of a `MacroCommand`.
     *
     * <P>This test creates a new `Notification`, adding a
     * `MacroCommandTestVO` as the body.
     * It then creates a `MacroCommandTestCommand` and invokes
     * its `execute` method, passing in the
     * `Notification`.</P>
     *
     * <P>The `MacroCommandTestCommand` has defined an
     * `initializeMacroCommand` method, which is
     * called automatically by its constructor. In this method
     * the `MacroCommandTestCommand` adds 2 SubCommands
     * to itself, `MacroCommandTestSub1Command` and
     * `MacroCommandTestSub2Command`.</P>
     *
     * <P>The `MacroCommandTestVO` has 2 result properties,
     * one is set by `MacroCommandTestSub1Command` by
     * multiplying the input property by 2, and the other is set
     * by `MacroCommandTestSub2Command` by multiplying
     * the input property by itself.</P>
     *
     * <P>Success is determined by evaluating the 2 result properties
     * on the `MacroCommandTestVO` that was passed to
     * the `MacroCommandTestCommand` on the Notification
     * body.</P>
     */
    it("should testMacroCommandExecute", () => {
        // Create the VO
        let vo = new MacroCommandTestVO(5);

        // Create the Notification (note)
        let note = new puremvc.Notification("MacroCommandTest", vo, "");

        // Create the SimpleCommand
        let command = new MacroCommandTestCommand();

         // Execute the SimpleCommand
         command.execute(note);

        // test assertions
        chai.assert.isTrue(vo.result1 === 10, "Expecting vo.result1 == 10");
        chai.assert.isTrue(vo.result2 === 25, "Expecting vo.result2 == 25")
    });

});
