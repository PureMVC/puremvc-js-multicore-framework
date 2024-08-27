/*
 *  Observer.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

/**
 * A base `Observer` implementation.
 *
 * <P>An `Observer` is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular `Notification` is broadcast.</P>
 *
 * <P>In PureMVC, the `Observer` class assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL>
 *
 * @class Observer
 */
class Observer {

    /**
     * Constructor.
     *
     * <P>The notification method on the interested object should take
     * one parameter of type `Notification`</P>
     *
     * @param {function(Notification):void | null} [notify = null]
     * @param {Object | null} [context = null]
     */
    constructor(notify = null, context = null) {
        this._notifyMethod = notify;
        this._notifyContext = context;
    }

    /**
     * Notify the interested object.
     *
     * @param {Notification} notification
     */
    notifyObserver(notification) {
        this._notifyMethod.call(this._notifyContext, notification);
    }

    /**
     * Compare an object to the notification context.
     *
     * @param {Object} notifyContext
     * @returns {boolean}
     */
    compareNotifyContext(notifyContext) {
        return this._notifyContext === notifyContext;
    }

    /**
     * Get the notification method.
     *
     * @returns {function(Notification):void}
     */
    get notifyMethod() {
        return this._notifyMethod
    }

    /**
     * Set the notification method.
     *
     * <P>The notification method should take one parameter of type `Notification`.</P>
     *
     * @param {function(Notification): void} notifyMethod - The function to be called when a notification is received.
     */
    set notifyMethod(notifyMethod) {
        this._notifyMethod = notifyMethod;
    }

    /**
     * Get the notifyContext
     *
     * @returns {Object}
     */
    get notifyContext() {
        return this._notifyContext;
    }

    /**
     * Set the notification context.
     *
     * @param {Object} notifyContext
     */
    set notifyContext(notifyContext) {
        this._notifyContext = notifyContext;
    }

}
export { Observer }
