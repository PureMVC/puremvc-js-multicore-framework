/**
 * @fileOverview
 * @author David Foley
 * @exports Observer as org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
 * An Observer is an encapsulation of a callback Function and an execution
 * context. Observers are used by PureMVC's notification system and are used
 * to delegate notifications to arbitrary recievers.
 * 
 * @param {Function} notifyMethod
 * @param {Object} notifyContext
 * @constructor
 */
function Observer (notifyMethod, notifyContext)
{
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
};

/**
 * Set the Observers notification method.
 * 
 * @param {Function} notifyMethod
 *  
 * @return {void}
 */
Observer.prototype.setNotifyMethod= function (notifyMethod)
{
    this.notify= notifyMethod;
};

/**
 * Set the Observers notification context.
 * 
 * @param {Object} notifyContext
 * @return {void}
 */
Observer.prototype.setNotifyContext= function (notifyContext)
{
    this.context= notifyContext;
};

/**
 * Get the Function that this Observer will invoke when it is notified.
 * 
 * @private
 * @return {Function}
 */
Observer.prototype.getNotifyMethod= function ()
{
    return this.notify;
};

/**
 * Get the Object that will serve as the Observers callback execution context
 * 
 * @private
 * @return {Object}
 */
Observer.prototype.getNotifyContext= function ()
{
    return this.context;
};

/**
 * Dispatch a Notification to this Observer. In turn, the Observer will invoke
 * its notification method, using its notification context as the methods
 * execution scope.
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 */
Observer.prototype.notifyObserver= function (notification)
{
    this.getNotifyMethod().call(this.getNotifyContext(), notification);
};

/**
 * Determine if this Observer is equivalent to another. Two Observers are 
 * equivalent if they have the same notification context.
 * 
 * @param {Object} object
 *  
 * @return {boolean}
 */
Observer.prototype.compareNotifyContext= function (object)
{
    return object === this.context;
};

/**
 * The Observers callback Function
 * 
 * @private
 * @type {Function}
 */
Observer.prototype.notify= null;

/**
 * The Observers callback Object
 * @private
 * @type {Object}
 */
Observer.prototype.context= null;