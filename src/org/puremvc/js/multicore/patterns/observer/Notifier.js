/**
 * @fileOverview
 * @author David Foley
 * @exports Notifier as org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * 
 * @constructor
 */
function Notifier () { };

/**
 * 
 * @param {string} notificationName
 * @param {Object} [body]
 * @param {string} [type]
 * @return {void}
 */
Notifier.prototype.sendNotification= function (notificationName, body, type)
{
    var facade= this.getFacade();
    if (facade)
    {
        facade.sendNotification(notificationName, body, type);
    }
};

/**
 * 
 * @param {string} key
 * @return {void}
 */
Notifier.prototype.initializeNotifier= function (key)
{
    this.multitonKey= key;
};

/**
 * 
 * @protected
 * @return {org.puremvc.js.multicore.patterns.facade.Facade}
 */
Notifier.prototype.getFacade= function ()
{
    if (this.multitonKey == null)
    {
        throw new Error(Notifier.MULTITON_MSG);
    };
    
    return Facade.getInstance(this.multitonKey);
};

/**
 * 
 * @protected
 * @type string
 */
Notifier.prototype.multitonKey= null;

/**
 * 
 * @static
 * @protected
 * @const
 * @type string
 */
Notifier.MULTITON_MSG= "multitonKey for this Notifier not yet initialized!";
