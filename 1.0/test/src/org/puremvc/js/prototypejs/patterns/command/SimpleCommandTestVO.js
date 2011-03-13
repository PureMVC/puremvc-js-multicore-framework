/*
 PureMVC Javascript port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by SimpleCommandTest.
 * 
 * @see org.puremvc.js.prototypejs.patterns.command.SimpleCommandTest SimpleCommandTest
 * @see org.puremvc.js.prototypejs.patterns.command.SimpleCommandTestCommand SimpleCommandTestCommand
 *
 * @constructor
 */
var SimpleCommandTestVO = Class.create
(
	{
		/**
		 * Initialize a <code>SimpleCommandTestVO</code> instance.
		 * 
		 * @param {Number} input
		 * 		The number to be fed to the
		 * 		<code>SimpleCommandTestCommand</code>.
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
		result: null
	}
);