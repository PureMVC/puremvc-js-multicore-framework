/**
 * A utility class used by MacroCommandTest.
 *
 * @see MacroCommandTest
 * @see MacroCommandTestCommand
 * @see MacroCommandTestSub1Command
 * @see MacroCommandTestSub2Command
 *
 * @class MacroCommandTestVO
 */
class MacroCommandTestVO {

    /**
     * Constructor.
     *
     * @param {number} input the number to be fed to the MacroCommandTestCommand
     */
    constructor(input) {
        this.input = input;
        this.result1 = 0;
        this.result2 = 0;
    }

}
export { MacroCommandTestVO }
