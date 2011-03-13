/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
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
 * @extends org.puremvc.js.multicore.prototypejs.patterns.command.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var ControllerTestCommand2 = Class.create
(
	SimpleCommand,
	{
		/**
		 * Fabricate a result by multiplying the input by 2 and adding to the
		 * existing result.
		 * 
		 * <P>
		 * This tests accumulation effect that would show if the command were
		 * executed more than once.
		 * 
		 * @param {Notification} note 
		 * 		The note carrying the ControllerTestVO.
		 */
		execute: function( note ) 
		{
			
			var vo/*ControllerTestVO*/ = note.getBody();
			
			// Fabricate a result
			vo.result = vo.result+(2 * vo.input);
		}
	}
);