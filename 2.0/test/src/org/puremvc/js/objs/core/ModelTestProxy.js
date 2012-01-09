/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
 *
 * @extends puremvc.Proxy Proxy
 * 
 * @constructor
 */
var ModelTestProxy = Objs
(
	"puremvc.ModelTestProxy",
	"puremvc.Proxy",
	{
		/**
		 * @constructor
		 */
		initialize: function()
		{
			ModelTestProxy.$super.initialize.call( this, ModelTestProxy.NAME, '' );
		},
	
		/**
		 * @override.
		 */
		onRegister: function()
		{
			this.setData( ModelTestProxy.ON_REGISTER_CALLED );
		},		
	
		/**
		 * @override.
		 */
		onRemove: function()
		{
			this.setData( ModelTestProxy.ON_REMOVE_CALLED );
		}		
	}
);

/**
 * @type {String}
 * @constant
 */
ModelTestProxy.NAME = 'ModelTestProxy';


/**
 * @type {String}
 * @constant
 */
ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';


/**
 * @type {String}
 * @constant
 */
ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';