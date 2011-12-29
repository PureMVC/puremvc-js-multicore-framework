/**
 * @fileOverview
 * @author David Foley
 * @exports Notifier as org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * Create a new Notifier. Notifiers are generally used internally by the
 * framework and are used as entry points to PureMVC's notification system,
 * delegating to Facade instances.
 *
 * @constructor
 */
function Notifier()
{
};

/**
 * Dispatch a notification through PureMVC's notification system.
 *
 * @param {string} notificationName
 *  A notification name
 * @param {Object} [body]
 *  The body of the notification
 * @param {string} [type]
 *  The notification type
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#sendNotification
 */
Notifier.prototype.sendNotification = function(notificationName, body, type)
{
    var facade = this.getFacade();
    if(facade)
    {
        facade.sendNotification(notificationName, body, type);
    }
};

/**
 * The Notifiers framework initialization method. This method is rarely if ever
 * called by client code, and is used by the framework to associate this Notifier
 * with a PureMVC core.
 *
 * @param {string} key
 *  The Notifiers multiton key;
 * @return {void}
 */
Notifier.prototype.initializeNotifier = function(key)
{
    this.multitonKey = key;
};

/**
 * Retrieve the Facade associated with the Notifier
 *
 *
 * @protected
 * @return {org.puremvc.js.multicore.patterns.facade.Facade}
 */
Notifier.prototype.getFacade = function()
{
    if(this.multitonKey == null)
    {
        throw new Error(Notifier.MULTITON_MSG);
    };

    return Facade.getInstance(this.multitonKey);
};

/**
 * The Notifiers internal multiton key.
 *
 * @protected
 * @type string
 */
Notifier.prototype.multitonKey = null;

/**
 * The error message used if the Notifier is not initialized correctly and
 * attempts to retrieve its own multiton key
 *
 * @static
 * @protected
 * @const
 * @type string
 */
Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
