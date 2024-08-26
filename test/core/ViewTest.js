import chai from "chai"
import {View, Notification, Observer, Mediator} from "../../src/index.js";
import {ViewTestMediator} from "./ViewTestMediator.js";
import {ViewTestMediator2} from "./ViewTestMediator2.js";
import {ViewTestMediator3} from "./ViewTestMediator3.js";
import {ViewTestMediator4} from "./ViewTestMediator4.js";
import {ViewTestMediator5} from "./ViewTestMediator5.js";
import {ViewTestMediator6} from "./ViewTestMediator6.js";
import {ViewTestNote} from "./ViewTestNote.js";

/**
 * Test the PureMVC View class.
 */
describe("ViewTest", () => {
    /**
     * Tests the View Multiton Factory Method
     */
    it("should testGetInstance", () => {
        // Test Factory Method
        let view = View.getInstance("ViewTestKey1", key => {return new View(key)});

        // test assertions
        chai.assert.isNotNull(view, "Expecting instance not null");
    });

    /**
     * Tests registration and notification of Observers.
     *
     * <P>An Observer is created to callback the viewTestMethod of
     * this ViewTest instance. This Observer is registered with
     * the View to be notified of 'ViewTestEvent' events. Such
     * an event is created, and a value set on its payload. Then
     * the View is told to notify interested observers of this
     * Event.</P>
     *
     * <P>The View calls the Observer's notifyObserver method
     * which calls the viewTestMethod on this instance
     * of the ViewTest class. The viewTestMethod method will set
     * an instance variable to the value passed in on the Event
     * payload. We evaluate the instance variable to be sure
     * it is the same as that passed out as the payload of the
     * original 'ViewTestEvent'.</P>
     */
    it("should testRegisterAndNotifyObserver", () => {
        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey2", key => {return new View(key)});

        // Create observer, passing in notification method and context
        let observer = new Observer(viewTestMethod, this);

        // Register Observer's interest in a particular Notification with the View
        view.registerObserver(ViewTestNote.NAME, observer);

        // Create a ViewTestNote, setting
        // a body value, and tell the View to notify
        // Observers. Since the Observer is this class
        // and the notification method is viewTestMethod,
        // successful notification will result in our local
        // viewTestVar being set to the value we pass in
        // on the note body.
        let note = ViewTestNote.create(10);
        view.notifyObservers(note);

        // test assertions
        chai.assert.isTrue(viewTestVar === 10, "Expecting viewTestVar = 10");
    });

    /**
     * Tests registering and retrieving a mediator with
     * the View.
     */
    it("should testRegisterAndRetrieveMediator", () => {
        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey3", key => new View(key));

        // Create and register the test mediator
        let viewTestMediator = new ViewTestMediator(this);
        view.registerMediator(viewTestMediator);

        // Retrieve the component
        let mediator = view.retrieveMediator(ViewTestMediator.NAME);

        // test assertions
        chai.assert.isTrue(mediator !== undefined, "ViewTestMediator is not null");
    });

    it("testHasMediator", () => {
        // register a Mediator
        let view = View.getInstance("ViewTestKey4", key => new View(key));

        // Create and register the test mediator
        let mediator = new Mediator("hasMediatorTest", this);
        view.registerMediator(mediator);

        // assert that the view.hasMediator method returns true
        // for that mediator name
        chai.assert.isTrue(view.hasMediator("hasMediatorTest") === true, "Expecting view.hasMediator('hasMediatorTest') === true");

        view.removeMediator("hasMediatorTest");

        // assert that the view.hasMediator method returns false
        // for that mediator name
        chai.assert.isTrue(view.hasMediator("hasMediatorTest") === false, "Expecting view.hasMediator('hasMediatorTest') === false");
    });

    /**
     * Tests registering and removing a mediator
     */
    it("testRegisterAndRemoveMediator", () => {
        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey5", key => new View(key));

        // Create and register the test mediator
        let mediator = new Mediator("testing", {});
        view.registerMediator(mediator);

        // Remove the component
        let removedMediator = view.removeMediator("testing");

        // assert that we have removed the appropriate mediator
        chai.assert.isTrue(removedMediator.mediatorName === "testing", "Expecting removedMediator.mediatorName === 'testing'");

        // assert that the mediator is no longer retrievable
        chai.assert.isNull(view.retrieveMediator("testing"), "Expecting removedMediator.mediatorName to be null");
    });

    /**
     * Tests that the View called the onRegister and onRemove methods
     */
    it("testOnRegisterAndOnRemove", () => {
        let viewTest = {
            onRegisterCalled: false,
            onRemoveCalled: false
        };

        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey6", key => new View(key));

        // Create and register the test mediator
        let mediator = new ViewTestMediator4(viewTest);
        view.registerMediator(mediator);

        // assert that onRegister was called, and the mediator responded by setting our boolean
        chai.assert.isTrue(viewTest.onRegisterCalled, "Expecting onRegisterCalled === true");

        // Remove the component
        view.removeMediator(ViewTestMediator4.NAME);

        // assert that the mediator is no longer retrievable
        chai.assert.isTrue(viewTest.onRemoveCalled, "Expecting onRemoveCalled === true");
    });

    /**
     * Tests successive register and remove of same mediator.
     */
    it("testSuccessiveRegisterAndRemoveMediator", () => {
        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey7", key => new View(key));

        // Create and register the test mediator,
        // but not so we have a reference to it
        view.registerMediator(new ViewTestMediator({}));

        // test that we can retrieve it
        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator.NAME) != null, "Expecting view.retrieveMediator(ViewTestMediator.NAME) != null");

        // Remove the Mediator
        view.removeMediator(ViewTestMediator.NAME);

        // test that retrieving it now returns null
        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator.NAME) === null, "Expecting view.retrieveMediator(ViewTestMediator.NAME) === null");

        // test that removing the mediator again once its gone doesn't cause crash
        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator.NAME) === null, "Expecting view.retrieveMediator(ViewTestMediator.NAME) doesn't crash");

        // Create and register another instance of the test mediator,
        view.registerMediator(new ViewTestMediator({}));

        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator.NAME) != null, "view.retrieveMediator(ViewTestMediator.NAME) != null");

        // Remove the Mediator
        view.removeMediator(ViewTestMediator.NAME);
    });

    /**
     * Tests registering a Mediator for 2 different notifications, removing the
     * Mediator from the View, and seeing that neither notification causes the
     * Mediator to be notified. Added for the fix deployed in version 1.7
     */
    it("testRemoveMediatorAndSubsequentNotify", () => {
        let viewTest = {
            lastNotification: ""
        };

        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey8", key => new View(key));

        // Create and register the test mediator to be removed.
        view.registerMediator(new ViewTestMediator2(viewTest));

        // test that notifications work
        view.notifyObservers(new Notification(ViewTestNote.NOTE1))
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE1, "Expecting lastNotification === NOTE1");

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE2);

        // Remove the Mediator
        view.removeMediator(ViewTestMediator2.NAME);

        // test that retrieving it now returns null
        chai.assert.isTrue(view.retrieveMediator( ViewTestMediator2.NAME ) === null, "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");

        // test that notifications no longer work
        // (ViewTestMediator2 is the one that sets lastNotification
        // on this component, and ViewTestMediator)
        viewTest.lastNotification = null;

        view.notifyObservers(new Notification(ViewTestNote.NOTE1))
        chai.assert.isTrue(viewTest.lastNotification !== ViewTestNote.NOTE1, "Expecting lastNotification === NOTE1");

        view.notifyObservers(new Notification(ViewTestNote.NOTE2))
        chai.assert.isTrue(viewTest.lastNotification !== ViewTestNote.NOTE2, "Expecting lastNotification === NOTE2");
    });

    it("testRemoveOneOfTwoMediatorsAndSubsequentNotify", () => {
        let viewTest = { lastNotification: "" };

        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey9", key => new View(key));

        // Create and register that responds to notifications 1 and 2
        view.registerMediator(new ViewTestMediator2(viewTest));

        // Create and register that responds to notification 3
        view.registerMediator(new ViewTestMediator3(viewTest));

        // test that all notifications work
        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE1, "Expecting lastNotification === NOTE1");

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE2, "Expecting lastNotification === NOTE2");

        view.notifyObservers(new Notification(ViewTestNote.NOTE3));
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE3, "Expecting lastNotification === NOTE3");

        // Remove the Mediator that responds to 1 and 2
        view.removeMediator(ViewTestMediator2.NAME);

        // test that retrieving it now returns null
        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator2.NAME) === null, "Expecting view.retrieveMediator(ViewTestMediator2.NAME) != null");

        // test that notifications no longer work
        // for notifications 1 and 2, but still work for 3
        viewTest.lastNotification = null;

        view.notifyObservers(new Notification(ViewTestNote.NOTE1));
        chai.assert.isTrue(viewTest.lastNotification !== ViewTestNote.NOTE1, "Expecting lastNotification != NOTE1");

        view.notifyObservers(new Notification(ViewTestNote.NOTE2));
        chai.assert.isTrue(viewTest.lastNotification !== ViewTestNote.NOTE2, "Expecting lastNotification != NOTE2");

        view.notifyObservers(new Notification(ViewTestNote.NOTE3));
        chai.assert.isTrue(viewTest.lastNotification === ViewTestNote.NOTE3, "Expecting lastNotification === NOTE3");
    });

    /**
     * Tests registering the same mediator twice.
     * A subsequent notification should only illicit
     * one response. Also, since reregistration
     * was causing 2 observers to be created, ensure
     * that after removal of the mediator there will
     * be no further response.
     */
    it("testMediatorReregistration", () => {
        let viewTest = {
            counter: 0,
        }

        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey10", key => new View(key));

        // Create and register that responds to notification 5
        view.registerMediator(new ViewTestMediator5(viewTest));

        // try to register another instance of that mediator (uses the same NAME constant).
        view.registerMediator(new ViewTestMediator5(viewTest));

        // test that the counter is only incremented once (mediator 5's response)
        viewTest.counter = 0;
        view.notifyObservers(new Notification(ViewTestNote.NOTE5));
        chai.assert.isTrue(viewTest.counter === 1, "Expecting counter === 1");

        // Remove the Mediator
        view.removeMediator(ViewTestMediator5.NAME);

        // test that retrieving it now returns null
        chai.assert.isTrue(view.retrieveMediator(ViewTestMediator5.NAME) === null, "Expecting view.retrieveMediator(ViewTestMediator5.NAME) === null");

        // test that the counter is no longer incremented
        viewTest.counter = 0;
        view.notifyObservers(new Notification(ViewTestNote.NOTE5));
        chai.assert.isTrue(viewTest.counter === 0, "Expecting counter === 0");
    });

    /**
     * Tests the ability for the observer list to
     * be modified during the process of notification,
     * and all observers be properly notified. This
     * happens most often when multiple Mediators
     * respond to the same notification by removing
     * themselves.
     */
    it("testModifyObserverListDuringNotification", () => {
        let viewTest = {
            counter: 0,
        }

        // Get the Multiton View instance
        let view = View.getInstance("ViewTestKey11", key => new View(key));

        // Create and register several mediator instances that respond to notification 6
        // by removing themselves, which will cause the observer list for that notification
        // to change. versions prior to MultiCore Version 2.0.5 will see every other mediator
        // fails to be notified.
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/1", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/2", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/3", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/4", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/5", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/6", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/7", viewTest));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/8", viewTest));

        // clear the counter
        viewTest.counter = 0;

        // send the notification. each of the above mediators will respond by removing
        // themselves and incrementing the counter by 1. This should leave us with a
        // count of 8, since 8 mediators will respond.
        view.notifyObservers(new Notification(ViewTestNote.NOTE6));

        // verify the count is correct
        chai.assert.isTrue(viewTest.counter === 8, "Expecting counter === 8");

        // clear the counter
        viewTest.counter = 0;
        view.notifyObservers(new Notification(ViewTestNote.NOTE6));
        // verify the count is 0
        chai.assert.isTrue(viewTest.counter === 0, "Expecting counter === 0");
    });

    /**
     * A test variable that proves the viewTestMethod was
     * invoked by the View.
     */
    let viewTestVar;

    /**
     * A utility method to test the notification of Observers by the view
     * @param {Notification} notification
     */
    function viewTestMethod(notification) {
        // set the local viewTestVar to the number on the event payload
        viewTestVar = notification.body;
    }
});
