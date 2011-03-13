/*
 PureMVC Javascript MultiCore port for Objs by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
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
var ViewTestMediator4 = Objs
(
	"puremvc.ViewTestMediator4",
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
			ViewTestMediator4.$super.initialize.call( this, ViewTestMediator4.NAME, view );
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
		 */	
		onRegister: function()
		{
			this.getViewTest().onRegisterCalled = true;
		},
				
			
		/**
		 * @override
		 */	
		onRemove: function()
		{
			this.getViewTest().onRemoveCalled = true;
		}
	}
);

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator4.NAME = 'ViewTestMediator4';