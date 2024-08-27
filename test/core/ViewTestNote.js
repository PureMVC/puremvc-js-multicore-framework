//
//  ViewTestNote.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Notification} from "../../src/index.js"

/**
 *
 * @extends Notification
 */
class ViewTestNote extends Notification {

    static get NOTE1() { return "Notification1" }
    static get NOTE2()  { return "Notification2" }
    static get NOTE3() { return "Notification3" }
    static get NOTE4() { return "Notification4" }
    static get NOTE5() { return "Notification5" }
    static get NOTE6() { return  "Notification6" }

    /**
     *
     * @param {string} name
     * @param {Object} body
     */
    constructor(name, body) {
        super(name, body);
    }

    /**
     *
     * @param {Object} body
     * @returns {ViewTestNote}
     */
    static create(body) {
        return new ViewTestNote(ViewTestNote.NAME, body)
    }

    static get NAME() { return "ViewTestNote" }

}
export {ViewTestNote}
