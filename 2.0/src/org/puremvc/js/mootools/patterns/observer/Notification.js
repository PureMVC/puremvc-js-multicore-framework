/**
 * @misc
 * @class A base <code>Notification</code> implementation.
 * <P>
 * PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.</P>
 *
 * <P>
 * The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.</P>
 *
 * <P>
 * Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, <code>Mediator</code> implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of <code>Notification</code>s to
 * trigger <code>Command</code>s or to communicate with other <code>Mediators</code>.
 * <code>IProxy</code> and <code>Command</code>
 * instances communicate with each other and <code>Mediator</code>s
 * by broadcasting <code>Notification</code>s.</P>
 *
 * <P>
 * A key difference between Flash <code>Event</code>s and PureMVC
 * <code>Notification</code>s is that <code>Event</code>s follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the <code>Event</code>, while
 * PureMVC <code>Notification</code>s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using <code>Notification</code>s.
 *
 * @param {String} name the name of the notification
 * @param {Object} body data to send with the notification
 * @param {String} type type identifier of the notification
 * @see Observer
 * @author Justin Wilaby
 *
 */
var Notification = function(name /* String */, body /* Object */, type /* String */){

    /**
     * The <code>Notification</code> name
     * @type String
     */
    this.name = null;
    /**
     * The <code>Notification</code> body
     * @type Object
     */
    this.body = null;
    /**
     * The <code>Notification</code> type
     * @type String
     */
    this.type = null;

    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(name /* String */, body /* Object */, type /* String */)
    {
	this.name = name;
	this.body = body;
	this.type = type;
    }

    /**
     * Get the name of the <code>Notification</code> instance.
     *
     * @return {String} the name of the <code>Notification</code> instance.
     */
    this.getName = function()
    {
	return this.name;
    }

    /**
     * Set the body of the <code>Notification</code> instance.
     *
     * @param {Object} body the body of the notification.
     */
    this.setBody = function(body /* Object */)
    {
	this.body = body;
    }

    /**
     * Get the body of the <code>Notification</code> instance.
     *
     * @return {Object} the body object.
     */
    this.getBody = function()
    {
	return this.body;
    }

    /**
     * Set the type of the <code>Notification</code> instance.
     *
     * @param {String} type the type identifier for the notification
     */
    this.setType = function(type /* String */)
    {
	this.type = type;
    }

    /**
     * Get the type of the <code>Notification</code> instance.
     *
     * @return {String} the type
     */
    this.getType = function()
    {
	return this.type;
    }

    /**
     * Get the string representation of the <code>Notification</code> instance.
     *
     * @return the string representation of the <code>Notification</code> instance.
     */
    this.toString = function()
    {
	var msg = "Notification Name: "+this.getName();
	msg += "\nBody:"+(( this.body == null )?"null":this.body.toString());
	msg += "\nType:"+(( this.type == null )?"null":this.type);
	return msg;
    }
}
Notification = new Class(new Notification());