/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
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
 * <code>Notification</code>s.
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
 * <code>Notification</codes>, but it also eases implementation as
 * these classes have frequent <code>Facade</code> interactions and
 * usually require access to the facade anyway.
 * 
 * <P>
 * NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey. 
 * 
 * The multitonKey is set:
 * <UL>
 * <LI>On a <code>Command</code> when it is executed by the Controller.
 * <LI>On a <code>Mediator</code> is registered with the View.
 * <LI>On a <code>Proxy</code> is registered with the Model.
 *
 * 
 * @see org.puremvc.js.multicore.prototypejs.patterns.facade.Facade Facade
 * 
 * @constructor
 */
var Notifier = Class.create
(
	{
		/**
		 * The multiton Key for this app.
		 *
		 * @type {String}
		 * @private
		 */
		multitonKey: null,
		
		/**
		 * Initialize this <code>Notifier</code> instance.
		 * 
		 * <P>
		 * This is how a <code>Notifier</code> gets its multitonKey. 
		 * Calls to sendNotification or to access the
		 * facade will fail until after this method 
		 * has been called.
		 * 
		 * <P>
		 * <code>Mediators</code>, <code>Commands</code> or
		 * <code>Proxies</code> may override this method in order to send
		 * notifications or access the multiton Facade instance as soon as
		 * possible. They CANNOT access the facade in their constructors, since
		 * this method will not yet have been called.
		 * 
		 * @param {String} key
		 *		The multitonKey for this <code>Notifier</code> to use
		 */
		initializeNotifier: function( key )
		{
			this.multitonKey = key;
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
			if( this.facade() ) 
				this.facade().sendNotification( name, body, type );
		},
		
		/**
		 * Return the multiton <code>Facade</code> instance.
		 *
		 * @return {Facade}
		 *		The multiton <code>Facade</code> instance.
		 */
		facade: function()
		{
			if( this.multitonKey == null )
					throw Error( Notifier.MULTITON_MSG );

			return Facade.getInstance( this.multitonKey );
		}
	}
);

/**
 * Message Constants
 *
 * @type {String}
 * @private
 */
Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";