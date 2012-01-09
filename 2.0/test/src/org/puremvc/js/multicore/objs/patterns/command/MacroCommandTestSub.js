/*
 PureMVC Javascript MultiCore port for Objs by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A <code>MacroCommand</code> utility subclass used by
 * <code>MacroCommandTest</code>.
 *
 * @extends puremvc.MacroCommand MacroCommand
 * 
 * @constructor
 */
var MacroCommandTestSub = Objs
(
	"puremvc.MacroCommandTestSub",
	"puremvc.MacroCommand",
	{
		/**
		 * @override
		 * 
		 * Initialize a <code>MacroCommandTestSub</code> instance.
		 * 
		 * @return {MacroCommandTestSub}
		 * 		This <code>MacroCommandTestSub</code> instance.
		 */
		initialize: function()
		{
			MacroCommandTestSub.$super.initialize.call( this );
	
			return this;
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
			var Facade = Objs("puremvc.Facade");
			return this.facade() instanceof Facade;
		}
	}
);