/*
 PureMVC Javascript MultiCore port for Objs by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A <code>SimpleCommand</code> utility subclass used by
 * <code>SimpleCommandTest</code>.
 * 
 * @extends puremvc.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var SimpleCommandTestSub = Objs
(
	"puremvc.SimpleCommandTestSub",
	"puremvc.SimpleCommand",
	{
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