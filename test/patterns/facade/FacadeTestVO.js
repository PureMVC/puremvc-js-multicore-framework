//
//  FacadeTestVO.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

/**
 * A utility class used by FacadeTest.
 *
 * @class FacadeTestVO
 */
class FacadeTestVO {

    /**
     * @constructor
     * @param {number} input the number to be fed to the FacadeTestCommand
     */
    constructor(input) {
        this.input = input;
        this.result = 0;
    }

}
export {FacadeTestVO}
