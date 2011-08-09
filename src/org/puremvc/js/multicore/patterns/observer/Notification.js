/**
 * @fileOverview
 * @exports Notification as org.puremvc.js.multicore.patterns.observer.Notification
 */

/**
 * @param {string} name
 * @param {Object} [body]
 * @param {Object} [type]
 * @constructor
 */
function Notification (name, body, type)
{
    this.name= name;
    this.body= body;
    this.type= type;
};

/**
 * @return {string}
 */
Notification.prototype.getName = function ()
{
    return this.name;
};

/**
 * 
 * @param {Object} body
 * @return {void}
 */
Notification.prototype.setBody = function (body)
{
    this.body= body;
};

/**
 * @return {Object|null}
 */
Notification.prototype.getBody = function ()
{
    return this.body
};

/**
 * 
 * @param {Object} type
 * @return {void}
 */
Notification.prototype.setType = function (type)
{
    this.type= type;
};

/**
 * @return {Object}
 */
Notification.prototype.getType = function ()
{
    return this.type;
};

/**
 * @override
 * @return {string}
 */
Notification.prototype.toString= function ()
{
    var msg = "Notification Name: "+this.getName();
    msg += "\nBody:"+(( this.body == null )?"null":this.body.toString());
    msg += "\nType:"+(( this.type == null )?"null":this.type);
    return msg;};

/**
 * @type {string}
 * @private
 */
Notification.prototype.name= null;

/**
 * @type {String}
 * @private
 */
Notification.prototype.type= null;

/**
 * @type {Object}
 * @private
 */
Notification.prototype.body= null;