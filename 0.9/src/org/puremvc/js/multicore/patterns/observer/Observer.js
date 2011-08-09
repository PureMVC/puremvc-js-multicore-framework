/**
 * @fileOverview
 * @author David Foley
 * @exports Observer as org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
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
 * 
 * @param {Function} notifyMethod
 * @return {void}
 */
Observer.prototype.setNotifyMethod= function (notifyMethod)
{
    this.notify= notifyMethod;
};

/**
 * 
 * @param {Object} notifyContext
 * @return {void}
 */
Observer.prototype.setNotifyContext= function (notifyContext)
{
    this.context= notifyContext;
};

/**
 * @return {Function}
 * @private
 */
Observer.prototype.getNotifyMethod= function ()
{
    return this.notify;
};

/**
 * @return {Function}
 * @private
 */
Observer.prototype.getNotifyContext= function ()
{
    return this.context;
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.INotification} notification
 * @return {void}
 */
Observer.prototype.notifyObserver= function (notification)
{
	// TODO use call instead of apply
    this.getNotifyMethod().apply(this.getNotifyContext(), [notification]);
};

/**
 * 
 * @param {Object} object
 * @return {boolean}
 */
Observer.prototype.compareNotifyContext= function (object)
{
    return object === this.context;
};


/**
 * @private
 * @type {Function}
 */
Observer.prototype.notify= null;

/**
 * @private
 * @type {Function}
 */
Observer.prototype.context= null;