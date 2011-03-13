/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A MacroCommand subclass used by MacroCommandTest.
 *
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTest MacroCommandTest
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTestSub1Command MacroCommandTestSub1Command
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTestSub2Command MacroCommandTestSub2Command
 * @see org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommandTestVO MacroCommandTestVO
 * @extends org.puremvc.js.multicore.prototypejs.patterns.command.MacroCommand MacroCommand
 * 
 * @constructor
 */
var MacroCommandTestCommand = Class.create
(
	MacroCommand,
	{
		/**
		 * Initialize the MacroCommandTestCommand by adding
		 * its 2 SubCommands.
		 * 
		 * @override
		 */
		initializeMacroCommand: function() 
		{
			this.addSubCommand( MacroCommandTestSub1Command );
			this.addSubCommand( MacroCommandTestSub2Command );
		}
	}
);