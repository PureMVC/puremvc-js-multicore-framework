/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The Base <code>Notifier</code> class.
 *
 * <P>
 * <code>MacroCommand</code>, <code>Command</code>,
 * <code>Mediator</code> and <code>Proxy</code> all have a need to send
 * <code>Notifications</code>.
 * 
 * <P>
 * The <code>Notifier</code> base class provides a common method
 * called <code>sendNotification</code> that relieves implementation
 * code of the necessity to actually construct
 * <code>Notification</code>s.
 *
 * <P>
 * The <code>Notifier</code> class, which all of the above mentioned
 * classes extend, provides an initialized reference to the
 * <code>Facade</code> singleton, which is required by the convenience
 * method <code>sendNotification</code>	for sending
 * <code>Notifications</code>, but it also eases implementation as
 * these classes have frequent <code>Facade</code> interactions and
 * uusually require access to the facade anyway.
 * 
 * @see org.puremvc.js.prototypejs.patterns.facade.Facade Facade
 * 
 * @constructor
 */
var Notifier = Class.create
(
	{
		/**
		 * Facade of the <code>Notifier</code> object.
		 * 
		 * @type {Facade}
		 * @private
		 */
		facade: null,

		/**
		 * Initialize a <code>Notifier</code> instance.
		 */
		initialize: function()
		{
			this.facade = Facade.getInstance();
		},
		
		/**
		 * Create and send a <code>Notification</code>.
		 *
		 * <P>
		 * Keeps us from having to construct new <code>Notification</code>
		 * instances in our implementation code.
		 * 
		 * @param {String} name
		 * 		The name of the notification to send.
		 * 
		 * @param {Object} body
		 * 		The (optional) body of the notification.
		 *
		 * @param {String} type
		 * 		The (optional) type of the notification.
		 */
		sendNotification: function( name, body, type )
		{
			this.facade.sendNotification( name, body, type );
		}
	}
);