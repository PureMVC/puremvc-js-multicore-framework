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
var ViewTestMediator4 = Class.create
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
			$super( ViewTestMediator4.NAME, view );
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