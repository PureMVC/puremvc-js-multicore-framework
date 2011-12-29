/**
 * @fileOverview
 * @exports Notification as org.puremvc.js.multicore.patterns.observer.Notification
 * @author David Foley | david@objectkit.com
 */

/**
 * Create a new Notification.
 *
 * For the most part, you will never instantiate a Notification directly,
 *
 * @param {string} name
 *  The Notification name
 * @param {Object} [body]
 *  The Notification body
 * @param {Object} [type]
 *  The Notification type
 * @constructor
 * @see org.puremvc.js.multicore.patterns.facade.Facade#sendNotification
 * @see org.puremvc.js.multicore.patterns.observer.Notifier#sendNotification
 */
function Notification(name, body, type)
{
    this.name= name;
    this.body= body;
    this.type= type;
};

/**
 * Determine this notifications name. When a Notification is dispatched via
 * PureMVC's observers mechanism, it is the Notifications name which is
 * ultimately the decident factor governing which Command is instantiated and
 * executed.
 *
 * Generally speaking, this method is used internally
 * by the framework and you will not have to invoke it.
 *
 * @return {string}
 * @see {Facade#registerCommand}
 */
Notification.prototype.getName= function()
{
    return this.name;
};

/**
 * Set this Notifications body. A Notifications body can have any value,
 * including null or void values (though this is not recommended)
 *
 * @param {*} body
 * @return {void}
 */
Notification.prototype.setBody= function(body)
{
    this.body= body;
};

/**
 * Get the Notification body.
 *
 * @return {*}
 */
Notification.prototype.getBody= function()
{
    return this.body
};

/**
 * Set the Notifications type.
 *
 * @param {Object} type
 * @return {void}
 * @see #getType
 */
Notification.prototype.setType= function(type)
{
    this.type= type;
};

/**
 * Determine this Notifications type.
 * 
 * @return {Object}
 */
Notification.prototype.getType= function()
{
    return this.type;
};

/**
 * Get a string representation of this Notification
 *
 * @override
 * @return {string}
 */
Notification.prototype.toString= function()
{
    var msg= "Notification Name: " + this.getName();
    msg+= "\nBody:" + ((this.body == null ) ? "null" : this.body.toString());
    msg+= "\nType:" + ((this.type == null ) ? "null" : this.type);
    return msg;
};

/**
 * The Notifications name.
 *
 * @type {string}
 * @private
 */
Notification.prototype.name= null;

/**
 * The Notifications type.
 *
 * @type {String}
 * @private
 */
Notification.prototype.type= null;

/**
 * The Notifications body.
 *
 * @type {Object}
 * @private
 */
Notification.prototype.body= null;
