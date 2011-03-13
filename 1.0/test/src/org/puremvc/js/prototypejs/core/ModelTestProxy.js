/*
 PureMVC Javascript port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase. 
 *
 * @extends org.puremvc.js.prototypejs.patterns.proxy.Proxy Proxy
 * 
 * @constructor
 */
var ModelTestProxy = Class.create
(
	Proxy,
	{
		/**
		 * @constructor
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 */
		initialize: function( $super )
		{
			$super( ModelTestProxy.NAME, '' );
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