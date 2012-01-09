/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A MacroCommand subclass used by MacroCommandTest.
 *
 * @see puremvc.MacroCommandTest MacroCommandTest
 * @see puremvc.MacroCommandTestSub1Command MacroCommandTestSub1Command
 * @see puremvc.MacroCommandTestSub2Command MacroCommandTestSub2Command
 * @see puremvc.MacroCommandTestVO MacroCommandTestVO
 * 
 * @extends puremvc.MacroCommand MacroCommand
 * 
 * @constructor
 */
var MacroCommandTestCommand = Objs
(
	"puremvc.MacroCommandTestCommand",
	"puremvc.MacroCommand",
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