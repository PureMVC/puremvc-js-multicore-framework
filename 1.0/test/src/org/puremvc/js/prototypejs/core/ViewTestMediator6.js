/*
 PureMVC Javascript port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Mediator class used by ViewTest.
 * 
 * @see org.puremvc.js.prototypejs.core.ViewTest ViewTest
 *
 * @extends org.puremvc.js.prototypejs.patterns.mediator.Mediator Mediator
 * 
 * @constructor
 */
var ViewTestMediator6 = Class.create
(
	Mediator, 
	{
		/**
		 * Initialize a <code>Mediator</code> subclass instance.
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 *
		 * @param {String} name
		 * 		The name of the <code>Mediator</code>.
		 *
		 * @param {Object} view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		initialize: function( $super, name, view )
		{
			$super( name, view );
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
			return [ ViewTest.NOTE6 ];
		},

		/**
		 * @override
		 *
		 * @param {Notification} notification
		 * 		The notification instance to be handled.
		 */
		handleNotification: function( notification )
		{
			this.facade.removeMediator(this.getMediatorName());
		},

		/**
		 * @override
		 */
		onRemove: function()
		{
			this.getViewTest().counter++;
		}
	}
);

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator6.NAME = 'ViewTestMediator6';