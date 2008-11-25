/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>IObserver</code> implementation.
*
* <P>
* An <code>Observer</code> is an object that encapsulates information
* about an interested object with a method that should
* be called when a particular <code>INotification</code> is broadcast. </P>
*
* <P>
* In PureMVC, the <code>Observer</code> class assumes these responsibilities:
* <UL>
* <LI>Encapsulate the notification (callback) method of the interested object.</LI>
* <LI>Encapsulate the notification context (this) of the interested object.</LI>
* <LI>Provide methods for setting the notification method and context.</LI>
* <LI>Provide a method for notifying the interested object.</LI>
* </UL>
*
* @see org.puremvc.js.core.view.View View
* @see org.puremvc.js.patterns.observer.Notification Notification
*/
function class_org_puremvc_js_patterns_observer_Observer()
{
	Objs.register("org.puremvc.js.patterns.observer.Observer",Observer);

	var IObserver = Objs.load("org.puremvc.js.interfaces.IObserver");

	/**
	 * Constructor.
	 *
	 * <P>
	 * The notification method on the interested object should take
	 * one parameter of type <code>INotification</code></P>
	 *
	 * @param notifyMethod the notification method of the interested object
	 * @param notifyContext the notification context of the interested object
	 */
	function Observer(notifyMethod/*Function*/, notifyContext/*Object*/ )
	{
		if(Objs.extending) return;

		this.setNotifyMethod( notifyMethod );
		this.setNotifyContext( notifyContext );
	}

	var o = Observer.prototype;

	o._notify/*Function*/ = null;
	o._context/*Object*/ = null;

	/**
	 * <code>Observer</code> implements <code>IObserver</code>
	 */
	Objs.implement(Observer,IObserver);

	/**
	 * Set the notification method.
	 *
	 * <P>
	 * The notification method should take one parameter of type <code>INotification</code>.</P>
	 *
	 * @param notifyMethod the notification (callback) method of the interested object.
	 */
	o.setNotifyMethod = function( notifyMethod/*Function*/ )
	{
		this._notify = notifyMethod;
	}

	/**
	 * Set the notification context.
	 *
	 * @param notifyContext the notification context (this) of the interested object.
	 */
	o.setNotifyContext = function( notifyContext/*Object*/ )
	{
		this._context = notifyContext;
	}

	/**
	 * Get the notification method.
	 *
	 * @return the notification (callback) method of the interested object.
	 */
	o.__getNotifyMethod = function()/*Function*/
	{
		return this._notify;
	}

	/**
	 * Get the notification context.
	 *
	 * @return the notification context (<code>this</code>) of the interested object.
	 */
	o.__getNotifyContext = function()/*Object*/
	{
		return this._context;
	}

	/**
	 * Notify the interested object.
	 *
	 * @param notification the <code>INotification</code> to pass to the interested object's notification method.
	 */
	o.notifyObserver = function( notification/*INotification*/ )
	{
		this.__getNotifyMethod().apply(this.__getNotifyContext(),[notification]);
	}

	/**
	 * Compare an object to the notification context.
	 *
	 * @param object the object to compare
	 * @return boolean indicating if the object and the notification context are the same
	 */
	o.compareNotifyContext = function( object/*Object*/ )/*Boolean*/
	{
		return object === this._context;
	}
}