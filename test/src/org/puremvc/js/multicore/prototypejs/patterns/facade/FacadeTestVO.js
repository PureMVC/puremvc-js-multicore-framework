/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by FacadeTest.
 * 
 * @see org.puremvc.js.multicore.prototypejs.patterns.facade.FacadeTest FacadeTest
 * @see org.puremvc.js.multicore.prototypejs.patterns.facade.FacadeTestCommand FacadeTestCommand
 * 
 * @constructor
 */
var FacadeTestVO = Class.create
(
	{
		/**
		 * @constructor.
		 * 
		 * @param {Number} input
		 * 		The number to be fed to the FacadeTestCommand
		 */
		initialize: function( input )
		{
			this.input = input;
		},
		
		/**
		 * @type {Number}
		 */
		input : null,
		
		/**
		 * @type {Number}
		 */
		result : null
	}
);