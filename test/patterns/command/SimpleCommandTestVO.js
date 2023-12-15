/**
 * A utility class used by SimpleCommandTest.
 *
 * @see SimpleCommandTest
 * @see SimpleCommandTestCommand
 *
 * @class SimpleCommandTestVO
 */
class SimpleCommandTestVO {

    /**
     * Constructor.
     *
     * @param {number} input the number to be fed to the SimpleCommandTestCommand
     */
    constructor(input) {
        this.input = input
    }

    /**
     *
     * @returns {number}
     */
    getResult() {
        return this.result;
    }

    /**
     *
     * @param {number} result
     */
    setResult(result) {
        this.result = result;
    }

}
export { SimpleCommandTestVO }
