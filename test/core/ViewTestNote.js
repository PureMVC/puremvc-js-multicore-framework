import {puremvc} from "../../bin/puremvc-2.0.0.js";

/**
 *
 * @extends Notification
 */
class ViewTestNote extends puremvc.Notification {

    /**
     *
     * @param {string} name
     * @param {Object} body
     */
    constructor(name, body) {
        super(name, body);

        /** @type {Map<string, string>} */
        ViewTestNote.notes = {
            NOTE1: "Notification1",
            NOTE2: "Notification2",
            NOTE3: "Notification3",
            NOTE4: "Notification4",
            NOTE5: "Notification5",
            NOTE6: "Notification6"
        };
    }

    /**
     *
     * @param {Object} body
     * @static
     * @returns {ViewTestNote}
     */
    static create(body) {
        return new ViewTestNote(ViewTestNote.NAME, body)
    }

    static get NAME() { return "ViewTestNote" }

}
export {ViewTestNote}