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
var ViewTestMediator = Objs
(
	"puremvc.ViewTestMediator",
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
			ViewTestMediator.$super.initialize.call( this, ViewTestMediator.NAME, view );
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
			return [ 'ABC', 'DEF', 'GHI'  ];
		}
	}
);

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator.NAME = "ViewTestMediator";
