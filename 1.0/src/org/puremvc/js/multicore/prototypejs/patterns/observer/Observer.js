/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The base <code>Observer</code> class.
 *
 * <P>
 * An <code>Observer</code> is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular <code>Notification</code> is broadcast.
 *
 * <P>
 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
 * 
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.
 * 
 * <LI>Encapsulate the notification context (this) of the interested object.
 * 
 * <LI>Provide methods for setting the notification method and context.
 * 
 * <LI>Provide a method for notifying the interested object.
 *
 * @see org.puremvc.js.multicore.prototypejs.core.View View
 * @see org.puremvc.js.multicore.prototypejs.patterns.observer.Notification Notification
 * 
 * @constructor
 */
var Observer = Class.create
(
	{
		/**
		 * The notification method of the interested object.
		 * 
		 * @type {Function}
		 * @private
		 */
		notify: null,
		
		/**
		 * The notification context of the interested object.
		 * 
		 * @type {Object}
		 * @private
		 */
		context: null,
		
		/**
		 * Initialize an <code>Observer</code> instance.
		 *
		 * @param {Function} notifyMethod
		 * 		The notification method of the interested object.
		 * 
		 * @param {Object} notifyContext
		 * 		The notification context of the interested object.
		 */
		initialize: function( notifyMethod, notifyContext )
		{
			this.setNotifyMethod( notifyMethod );
			this.setNotifyContext( notifyContext );
		},
		
		/**
		 * Get the notification method.
		 *
		 * @return {Function}
		 * 		The notification (callback) method of the interested object.
		 */
		getNotifyMethod: function()
		{
			return this.notify;
		},
		
		/**
		 * Set the notification method.
		 *
		 * <P>The notification method should take one parameter of type
		 * <code>Notification</code>.
		 *
		 * @param {Function} notifyMethod
		 * 		The notification (callback) method of the interested object.
		 */
		setNotifyMethod: function( notifyMethod )
		{
			this.notify = notifyMethod;
		},

		/**
		 * Get the notification context.
		 *
		 * @return {Object}
		 * 		The notification context (<code>this</code>) of the interested
		 * 		object.
		 */
		getNotifyContext: function()
		{
			return this.context;
		},
		
		/**
		 * Set the notification context.
		 *
		 * @param {Object} notifyContext
		 * 		The notification context (this) of the interested object.
		 */
		setNotifyContext: function( notifyContext )
		{
			this.context = notifyContext;
		},
		
		/**
		 * Notify the interested object.
		 *
		 * @param {Notification} note
		 * 		The <code>Notification</code> to pass to the interested object's
		 * 		notification method.
		 */
		notifyObserver: function( note )
		{
			this.getNotifyMethod().call( this.getNotifyContext(), note );
		},
		
		/**
		 * Compare an object to the notification context.
		 *
		 * @param {Object} object
		 * 		The object to compare.
		 *
		 * @return {Boolean}
		 * 		The object and the notification context are the same.
		 */
		compareNotifyContext: function( object )
		{
			return object === this.getNotifyContext();
		}
	}
);
