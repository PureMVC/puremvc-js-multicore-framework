/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Mediator class used by ViewTest.
 * 
 * @see org.puremvc.js.multicore.prototypejs.core.ViewTest ViewTest
 *
 * @extends org.puremvc.js.multicore.prototypejs.patterns.mediator.Mediator Mediator
 * 
 * @constructor
 */
var ViewTestMediator2 = Class.create
(
	Mediator, 
	{
		/**
		 * @constructor
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 * 
		 * @param {Object} view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		initialize: function( $super, view )
		{
			$super( ViewTestMediator2.NAME, view );
		},
				
		/**
		 * Standard getter to return the view handled by the
		 * <code>Mediator</code>.
		 * 
		 * @return {Object}
		 * 		The view handled by the <code>Mediator</code>.
		 * 
		 * @private
		 */
		getViewTest: function()
		{
			return this.viewComponent;
		},
		
		/**
		 * @override
		 *
		 * @return {Array}
		 * 		The list of notifications names in which is interested the
		 * 		<code>Mediator</code>.
		 */
		listNotificationInterests: function()
		{
			// be sure that the mediator has some Observers created
			// in order to test removeMediator
			return [ ViewTest.NOTE1,  ViewTest.NOTE2 ];
		},
		
		/**
		 * @override
		 *
		 * @param {Notification} note
		 * 		The notification instance to be handled.
		 */
		handleNotification: function( note )
		{
			this.getViewTest().lastNotification = note.getName();
		}
	}
);

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator2.NAME = 'ViewTestMediator2';