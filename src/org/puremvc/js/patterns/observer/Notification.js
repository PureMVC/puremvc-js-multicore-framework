/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>INotification</code> implementation.
*
* <P>
* PureMVC does not rely upon underlying event models such
* as the one provided with Flash, and ActionScript 3 does
* not have an inherent event model.
* </P>
*
* <P>
* The Observer Pattern as implemented within PureMVC exists
* to support event-driven communication between the
* application and the actors of the MVC triad.
* </P>
*
* <P>
* Notifications are not meant to be a replacement for Events
* in Flex/Flash/Apollo. Generally, <code>IMediator</code> implementors
* place event listeners on their view components, which they
* then handle in the usual way. This may lead to the broadcast of
* <code>Notification</code>s to trigger <code>ICommand</code>s or to communicate
* with other <code>IMediators</code>. <code>IProxy</code> and
* <code>ICommand</code> instances communicate with each other and
* <code>IMediator</code>s by broadcasting <code>INotification</code>s.
* </P>
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
* @see org.puremvc.js.patterns.observer.Observer Observer
*
*/
function class_org_puremvc_js_patterns_observer_Notification()
{
	Objs.register("org.puremvc.js.patterns.observer.Notification",Notification);

	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");

	/**
	 * Constructor
	 *
	 * @param name name of the <code>Notification</code> instance. (required)
	 * @param body the <code>Notification</code> body. (optional)
	 * @param type the type of the <code>Notification</code> (optional)
	 */
	function Notification
	(
		name/*String*/,
		body/*Object*/,
		type/*String*/
	)
	{
		if(Objs.extending) return;

		this._name = name;
		this._body = body;
		this._type = type;
	}

	/**
	 * <code>Notification</code> implements <code>INotification</code>
	 */
	Objs.implement(Notification,INotification);

	var o = Notification.prototype;

	/**
	 * The name of the notification instance
	 */
	o._name/*String*/ = null;

	/**
	 * The type of the notification instance
	 */
	o._type/*String*/ = null;

	/**
	 * The body of the notification instance
	 */
	o._body/*Object*/ = null;

	/**
	 * Get the name of the <code>Notification</code> instance.
	 *
	 * @return the name of the <code>Notification</code> instance.
	 */
	o.getName = function()/*String*/
	{
		return this._name;
	}

	/**
	 * Set the body of the <code>Notification</code> instance.
	 */
	o.setBody = function( body/*Object*/ )
	{
		this._body = body;
	}

	/**
	 * Get the body of the <code>Notification</code> instance.
	 *
	 * @return the body object.
	 */
	o.getBody = function()/*Object*/
	{
		return this._body;
	}

	/**
	 * Set the type of the <code>Notification</code> instance.
	 */
	o.setType = function( type/*String*/ )
	{
		this._type = type;
	}

	/**
	 * Get the type of the <code>Notification</code> instance.
	 *
	 * @return the type
	 */
	o.getType = function()/*String*/
	{
		return this._type;
	}

	/**
	 * Get the string representation of the <code>Notification</code> instance.
	 *
	 * @return the string representation of the <code>Notification</code> instance.
	 */
	o.toString = function()/*String*/
	{
		var msg/*String*/ = "Notification Name:" + this.getName();
		msg += "\nBody:" + (( this._body == null ) ? "null" : this._body.toString());
		msg += "\nType:" + (( this._type == null ) ? "null" : this._type);
		return msg;
	}
}