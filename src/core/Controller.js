/*
 *  Controller.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import {View} from "./View.js"
import {Observer} from "../patterns/observer/Observer.js";

/**
 * A Multiton `Controller` implementation.
 *
 * <P>In PureMVC, the `Controller` class follows the
 * 'Command and Controller' strategy, and assumes these
 * responsibilities:</P>
 *
 * <UL>
 * <LI> Remembering which `Command`s
 * are intended to handle which `Notifications`.</LI>
 * <LI> Registering itself as an `Observer` with
 * the `View` for each `Notification`
 * that it has a `Command` mapping for.</LI>
 * <LI> Creating a new instance of the proper `Command`
 * to handle a given `Notification` when notified by the `View`.</LI>
 * <LI> Calling the `Command`'s `execute`
 * method, passing in the `Notification`.</LI>
 * </UL>
 *
 * <P>Your application must register `Commands` with the
 * Controller.</P>
 *
 * <P>The simplest way is to subclass `Facade`,
 * and use its `initializeController` method to add your
 * registrations.</P>
 *
 * @see View View
 * @see Observer Observer
 * @see Notification Notification
 * @see SimpleCommand SimpleCommand
 * @see MacroCommand MacroCommand
 *
 * @class Controller
 */
class Controller {

    /**
     * Constructor.
     *
     * <P>This `Controller` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Factory method,
     * passing the unique key for this instance
     * `Controller.getInstance( multitonKey )`</P>
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     *
     * @constructor
     * @param {string} key
     */
    constructor(key) {
        if (Controller.instanceMap[key] != null) throw new Error(Controller.MULTITON_MSG);
        /** @protected
         * @type {string} */
        this.multitonKey = key;
        Controller.instanceMap.set(this.multitonKey, this);
        /** @protected
         * @type {Map<string, function():SimpleCommand>} */
        this.commandMap = new Map();
        this.initializeController();
    }

    /**
     * Initialize the Multiton `Controller` instance.
     *
     * <P>Called automatically by the constructor.</P>
     *
     * <P>Note that if you are using a subclass of `View`
     * in your application, you should <i>also</i> subclass `Controller`
     * and override the `initializeController` method in the
     * following way:</P>
     *
     * <pre>`
     *		// ensure that the Controller is talking to my View implementation
     *		initializeController( )
     *		{
     *			this.view = MyView.getInstance(this.multitonKey, (key) => new MyView(key));
     *		}
     * `</pre>
     *
     */
    initializeController() {
        /** @protected
         * @type {View} **/
        this.view = View.getInstance(this.multitonKey, (key) => new View(key));
    }

    /**
     * `Controller` Multiton Factory method.
     *
     * @static
     * @param {string} key
     * @param {function(string):Controller} factory
     * @returns {Controller} the Multiton instance of `Controller`
     */
    static getInstance(key, factory) {
        if (Controller.instanceMap == null)
            /** @static
             @type {Map<string, Controller>} */
            Controller.instanceMap = new Map();
        if (Controller.instanceMap.get(key) == null) Controller.instanceMap.set(key, factory(key));
        return Controller.instanceMap.get(key);
    }

    /**
     * <P>If a `Command` has previously been registered
     * to handle the given `Notification`, then it is executed.</P>
     *
     * @param {Notification} notification a `Notification`
     */
    executeCommand(notification) {
        let factory = this.commandMap.get(notification.name);
        if (factory == null) return;

        let commandInstance = factory();
        commandInstance.initializeNotifier(this.multitonKey);
        commandInstance.execute(notification);
    }

    /**
     * <P>Register a particular `Command` class as the handler
     * for a particular `Notification`.</P>
     *
     * <P>If an `Command` has already been registered to
     * handle `Notification`s with this name, it is no longer
     * used, the new `Command` is used instead.</P>
     *
     * <P>The Observer for the new Command is only created if this the
     * first time a Command has been registered for this Notification name.</P>
     *
     * @param notificationName the name of the `Notification`
     * @param {function():SimpleCommand} factory
     */
    registerCommand(notificationName, factory) {
        if (this.commandMap.get(notificationName) == null) {
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }
        this.commandMap.set(notificationName, factory);
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName
     * @return {boolean} whether a Command is currently registered for the given `notificationName`.
     */
    hasCommand(notificationName) {
        return this.commandMap.has(notificationName);
    }

    /**
     * Remove a previously registered `Command` to `Notification` mapping.
     *
     * @param {string} notificationName the name of the `Notification` to remove the `Command` mapping for
     */
    removeCommand(notificationName) {
        // if the Command is registered...
        if(this.hasCommand(notificationName)) {
            // remove the observer
            this.view.removeObserver(notificationName, this);

            // remove the command
            this.commandMap.delete(notificationName)
        }
    }

    /**
     * Remove a Controller instance
     *
     * @static
     * @param {string} key of Controller instance to remove
     */
    static removeController(key) {
        Controller.instanceMap.delete(key);
    }

    /**
     * Message Constants
     *
     * @static
     * @type {string}
     */
    static get MULTITON_MSG() { return "Controller instance for this Multiton key already constructed!" };
}
export { Controller }
