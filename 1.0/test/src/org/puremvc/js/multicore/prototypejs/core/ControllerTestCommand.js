/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by ControllerTest.
 *
 * @see org.puremvc.js.multicore.prototypejs.core.ControllerTest ControllerTest
 * @see org.puremvc.js.multicore.prototypejs.core.ControllerTestVO ControllerTestVO
 *
 * @extends org.puremvc.js.multicore.prototypejs.core.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var ControllerTestCommand = Class.create
(
	SimpleCommand,
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 * 
		 * @param {Notification} note
		 * 		The note carrying the ControllerTestVO
		 */
		execute: function ( note ) 
		{
			
			var vo/*ControllerTestVO*/ = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
);