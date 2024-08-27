//
//  NotificationTest.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import chai from "chai"
import {Notification} from "../../../src/index.js";

/**
 * Test the PureMVC Notification class.
 *
 * @see Notification1
 */
describe("NotificationTest", () => {

    /**
     * Tests setting and getting the name using Notification class accessor methods.
     */
    it("should testNameAccessors", () => {
        // Create a new Notification and use accessors to set the note name
        let note = new Notification("TestNote", null, "");

        // test assertions
        chai.assert.isTrue(note.name === "TestNote", "Expecting note.getName() == 'TestNote'");
    });

    /**
     * Tests setting and getting the body using Notification class accessor methods.
     */
    it("should testBodyAccessors", () => {
        // Create a new Notification and use accessors to set the body
        let notification = new Notification("TestNote", null, "");
        notification.body = 5;

        // test assertions
        chai.assert.isTrue(notification.body === 5, "Expecting note.getBody() as Number == 5");
    });

    /**
     * Tests setting the name and body using the Notification class Constructor.
     */
    it("should testConstructor", () => {
        // Create a new Notification using the Constructor to set the note name and body
        let notification = new Notification("TestNote", 5, "TestNoteType");

        // test assertions
        chai.assert.isTrue(notification.name === "TestNote", "Expecting note.getName() == 'TestNote'");
        chai.assert.isTrue(notification.body === 5, "Expecting note.getBody() == 5");
        chai.assert.isTrue(notification.type === "TestNoteType", "Expecting note.getType() == 'TestNoteType'");
    });

    /**
     * Tests the toString method of the notification
     */
    it("should testToString", () => {
        // Create a new Notification and use accessors to set the note name
        let notification = new Notification("TestNote", [1,3,5], "TestType");
        let ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";

        // test assertions
        chai.assert.isTrue(notification.toString() === ts, "Expecting note.testToString() == '"+ts+"'");
    });

});
