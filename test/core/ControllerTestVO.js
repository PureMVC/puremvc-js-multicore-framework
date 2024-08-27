//
//  ControllerTestVO.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by ControllerTest.
 *
 * @see ControllerTest
 * @see ControllerTestCommand
 *
 * @class ControllerTestVO
 */
class ControllerTestVO {

    /**
     * Constructor
     *
     * @param {number} input
     */
    constructor(input) {
        this.input = input;
        this.result = 0;
    }

    /**
     *
     * @returns {number}
     */
    getInput() {
        return this.input;
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
export { ControllerTestVO }
