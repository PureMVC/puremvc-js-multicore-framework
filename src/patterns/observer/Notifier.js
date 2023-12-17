/*
 *  Notifier.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import {Facade} from "../facade/Facade.js";

/**
 * A Base `Notifier` implementation.
 *
 * <P>`MacroCommand, Command, Mediator` and `Proxy`
 * all have a need to send `Notifications`.<P>
 *
 * <P>The `Notifier` interface provides a common method called
 * `sendNotification` that relieves implementation code of
 * the necessity to actually construct `Notifications`.</P>
 *
 * <P>The `Notifier` class, which all the above-mentioned classes
 * extend, provides an initialized reference to the `Facade`
 * Multiton, which is required for the convenience method
 * for sending `Notifications`, but also eases implementation as these
 * classes have frequent `Facade` interactions and usually require
 * access to the facade anyway.</P>
 *
 * <P>NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey.</P>
 *
 * The multitonKey is set:
 *   * on a Command when it is executed by the Controller
 *   * on a Mediator is registered with the View
 *   * on a Proxy is registered with the Model.
 *
 * @see Proxy Proxy
 * @see Facade Facade
 * @see Mediator Mediator
 * @see MacroCommand MacroCommand
 * @see SimpleCommand SimpleCommand
 *
 * @class Notifier
 */
class Notifier {

    constructor() {}

    /**
     * Create and send an `Notification`.
     *
     * <P>Keeps us from having to construct new Notification
     * instances in our implementation code.</P>
     *
     * @param {string} notificationName
     * @param {Object} [body] body
     * @param {string} [type] type
     */
    sendNotification (notificationName, body = null, type = "") {
        if (this.facade != null) {
            this.facade.sendNotification(notificationName, body, type);
        }
    }

    /**
     * Initialize this Notifier instance.
     *
     * <P>This is how a Notifier gets its multitonKey.
     * Calls to sendNotification or to access the
     * facade will fail until after this method
     * has been called.</P>
     *
     * <P>Mediators, Commands or Proxies may override
     * this method in order to send notifications
     * or access the Multiton Facade instance as
     * soon as possible. They CANNOT access the facade
     * in their constructors, since this method will not
     * yet have been called.</P>
     *
     * @param {string} key the multitonKey for this Notifier to use
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    }

    /**
     * Return the Multiton Facade instance
     *
     * @typedef {Facade} Facade
     *
     * @throws {Error}
     */
    get facade() {
        if (this.multitonKey == null) throw new Error(Notifier.MULTITON_MSG);
        return Facade.getInstance(this.multitonKey, key => new Facade(key));
    }

    /**
     * Message Constants
     *
     * @static
     * @returns {string}
     */
    static get MULTITON_MSG() { return "multitonKey for this Notifier not yet initialized!" }
}
export { Notifier }
