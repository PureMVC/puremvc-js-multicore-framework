/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by FacadeTest.
 *
 * @see org.puremvc.js.multicore.prototypejs.patterns.facade.FacadeTest FacadeTest
 * @see org.puremvc.js.multicore.prototypejs.patterns.facade.FacadeTestVO FacadeTestVO
 * 
 * @extends SimpleCommand
 *
 * @constructor
 */
var FacadeTestCommand = Class.create
(
	SimpleCommand,
	{		
		/**
		 * Fabricate a result by multiplying the input by 2
		 * 
		 * @param {Notification} note
		 * 		The Notification carrying the FacadeTestVO
		 */
		execute: function( note ) 
		{
			var vo/*FacadeTestVO*/ = note.getBody();
			
			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
);