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
var ViewTestMediator6 = Objs
(
	"puremvc.ViewTestMediator6",
	"puremvc.Mediator", 
	{
		/**
		 * Initialize a <code>Mediator</code> subclass instance.
		 * 
		 * @param {String} mediatorName
		 * 		The name of the <code>Mediator</code>.
		 *
		 * @param {Object} view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		initialize: function( name, view )
		{
			ViewTestMediator6.$super.initialize.call( this, name, view );
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