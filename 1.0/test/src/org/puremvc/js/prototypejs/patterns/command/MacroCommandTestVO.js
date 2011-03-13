/*
 PureMVC Javascript port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by MacroCommandTest.
 * 
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommandTest MacroCommandTest
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommandTestCommand MacroCommandTestCommand
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommandTestSub1Command MacroCommandTestSub1Command
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommandTestSub2Command MacroCommandTestSub2Command
 * 
 * @constructor
 */
var MacroCommandTestVO = Class.create
(
	{
		/**
		 * Initialize a <code>MacroCommandTestVO</code> instance.
		 * 
	  	 * @param {Number} input
	  	 * 		A random number to pass to the command.
	 	 */
		initialize: function( input )
		{
			this.input = input;
		},
		
		/**
		 * @type {Number}
		 */
		input: null,
		
		/**
		 * @type {Number}
		 */
		result1: null,
		
		/**
		 * @type {Number}
		 */
		result2: null
	}
);