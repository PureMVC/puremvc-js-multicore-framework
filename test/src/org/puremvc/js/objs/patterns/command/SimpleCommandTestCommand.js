/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by SimpleCommandTest.
 *
 * @see puremvc.SimpleCommandTest SimpleCommandTest
 * @see puremvc.SimpleCommandTestVO SimpleCommandTestVO
 *
 * @extends puremvc.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var SimpleCommandTestCommand = Objs
(
	"puremvc.SimpleCommandTestCommand",
	"puremvc.SimpleCommand",
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 * 
		 * @param {Notification} note
		 * 		The <code>Notification</code> carrying the
		 * 		<code>SimpleCommandTestVO</code>
		 */
		execute: function( note ) 
		{
			var vo/*SimpleCommandTestVO*/ = note.getBody();
	
			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
);