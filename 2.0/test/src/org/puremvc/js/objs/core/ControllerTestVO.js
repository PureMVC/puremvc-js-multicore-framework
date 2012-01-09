/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by ControllerTest.
 * 
 * @see puremvc.ControllerTest ControllerTest
 * @see puremvc.ControllerTestCommand ControllerTestCommand
 * 
 * @constructor.
 */
var ControllerTestVO = Objs
(
	"puremvc.ControllerTestVO",
	{
		/**
		 * @constructor.
		 * 
		 * @param {Number} input
		 * 		The number to be fed to the <code>ControllerTestCommand</code>.
		 */
		initialize: function( input )
		{
			this.input = input;
		},
	
		/**
		 * @type {Number}
		 */
		input: 0,
	
		/**
		 * @type {Number}
		 */		
		result: 0
	}
);