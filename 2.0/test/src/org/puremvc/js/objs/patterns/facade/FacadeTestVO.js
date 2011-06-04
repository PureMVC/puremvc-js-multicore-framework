/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by FacadeTest.
 * 
 * @see puremvc.FacadeTest FacadeTest
 * @see puremvc.FacadeTestCommand FacadeTestCommand
 * 
 * @constructor
 */
var FacadeTestVO = Objs
(
	"puremvc.FacadeTestVO",
	{
		/**
		 * Initialize a <code>FacadeTestVo</code> instance.
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