/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A <code>MacroCommand</code> utility subclass used by
 * <code>MacroCommandTest</code>.
 *
 * @extends org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommand MacroCommand
 * 
 * @constructor
 */
var MacroCommandTestSub = Class.create
(
	MacroCommand,
	{
		/**
		 * @override
		 *
		 * Initialize a <code>MacroCommand</code> instance.
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 */
		initialize: function( $super )
		{
			$super()
		},
		
		/**
		 * A method to test if <code>Facade</code> instance of the object has
		 * well been declared during its construction.
		 * 
		 * @return {Boolean}
		 * 		<code>Facade</code> instance of the object has well been declared
		 * 		during its construction.
		 */
		hasFacade: function()
		{
			return this.facade() instanceof Facade;
		}
	}
);