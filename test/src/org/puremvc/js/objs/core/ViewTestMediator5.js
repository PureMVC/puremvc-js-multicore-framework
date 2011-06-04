/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Mediator class used by ViewTest.
 * 
 * @see puremvc.ViewTest ViewTest
 *
 * @extends puremvc.Mediator Mediator
 * 
 * @constructor
 */
var ViewTestMediator5 = Objs
(
	"puremvc.ViewTestMediator5",
	"puremvc.Mediator", 
	{
		/**
		 * Initialize a <code>Mediator</code> subclass instance.
		 * 
		 * @param {Object} view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		initialize: function( view )
		{
			ViewTestMediator5.$super.initialize.call( this, ViewTestMediator5.NAME, view );
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
			return [ ViewTest.NOTE5 ];
		},
	
		/**
		 * @override
		 *
		 * @param {Notification} notification
		 * 		The notification instance to be handled.
		 */
		handleNotification: function( notification )
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
ViewTestMediator5.NAME = 'ViewTestMediator5';