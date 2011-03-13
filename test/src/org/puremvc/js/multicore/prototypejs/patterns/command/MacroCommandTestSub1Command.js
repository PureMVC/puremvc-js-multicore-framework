/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by MacroCommandTestCommand.
 *
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTest MacroCommandTest
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTestCommand MacroCommandTestCommand
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTestVO MacroCommandTestVO
 *
 * @extends org.puremvc.js.multicore.prototypejs.patterns.command.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var MacroCommandTestSub1Command = Class.create
(
	SimpleCommand,
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 * 
		 * @param {Notification} note
		 * 		The <code>Notification</code> carrying the
		 * 		<code>MacroCommandTestVO</code>
		 */
		execute : function( note ) 
		{
			
			var vo/*MacroCommandTestVO*/ = note.getBody();
			
			// Fabricate a result
			vo.result1 = 2 * vo.input;
		}
	}
);