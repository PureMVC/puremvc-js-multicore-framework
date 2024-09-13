//
//  SimpleCommandTestVO.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

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
