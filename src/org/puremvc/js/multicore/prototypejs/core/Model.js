/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The multiton <code>Model</code> class. for PureMVC.
 *
 * <P>
 * In PureMVC, the <code>Model</code> class provides
 * access to model objects (Proxies) by named lookup.
 *
 * <P>
 * The <code>Model</code> assumes these responsibilities:
 *
 * <UL>
 * <LI>Maintain a cache of <code>Proxy</code> instances.
 * 
 * <LI>Provide methods for registering, retrieving, and removing
 * <code>Proxy</code> instances.
 *
 * <P>
 * Your application must register <code>Proxy</code> instances with the
 * <code>Model</code>. Typically, you use a <code>Command</code> to create and
 * register <code>Proxy</code> instances once the <code>Facade</code> has
 * initialized the core actors.
 * 
 * @see org.puremvc.js.multicore.prototypejs.patterns.proxy.Proxy Proxy
 * 
 * @constructor
 */
var Model = Class.create
(
	{
		/**
		 * HashTable of <code>Proxy</code> instances
		 * registered with the <code>Model</code>
		 * 
		 * @type {Object}
		 * @private
		 */
		proxyMap: null,

		/**
		 * Initialize a <code>Model</code> instance.
		 *
		 * @param {String} key
		 *		Multiton key for this instance of <code>Model</code>
		 *
		 * @throws {Error}
		 * 		Error if an instance for this multiton key has already been
		 *		constructed.
		 */
		initialize: function( key )
		{
			if( Model.instanceMap[ key ] )
				throw Error( Model.MULTITON_MSG );

			Model.instanceMap[ key ] = this;
			this.multitonKey = key;
			this.proxyMap = {};	

			this.initializeModel();
		},

		/**
		 * Initialize the multiton <code>Model</code> instance.
		 *
		 * <P>
		 * Called automatically by the constructor. This
		 * is the opportunity to initialize the multiton
		 * instance in a subclass without overriding the
		 * constructor.
		 */
		initializeModel: function()
		{

		},

		/**
		 * Register a <code>Proxy</code> with the <code>Model</code>.
		 *
		 * @param {Proxy} proxy
		 *		A <code>Proxy</code> to be held by the <code>Model</code>.
		 */
		registerProxy: function( proxy )
		{
			proxy.initializeNotifier( this.multitonKey );
			this.proxyMap[proxy.getProxyName()] = proxy;
			proxy.onRegister();
		},

		/**
		 * Retrieve an <code>Proxy</code> from the <code>Model</code>.
		 *
		 * @param {String} proxyName
		 *		The name of the <code>Proxy</code> to retrieve.
		 *
		 * @return {Proxy}
		 *		The <code>Proxy</code> instance previously registered with the
		 *		given <code>proxyName</code> or an explicit <code>null</code>
		 *		if it doesn't exists.
		 */
		retrieveProxy: function( proxyName )
		{
			//Here we explicitly want to return a strict "null"
			return this.proxyMap[ proxyName ] || null;
		},

		/**
		 * Check if a <code>Proxy</code> is registered.
		 *
		 * @param {String} proxyName
		 *		The name of the <code>Proxy</code> to verify the existence of
		 		its registration.
		 *
		 * @return {Boolean}
		 *		A Proxy is currently registered with the given
		 		<code>proxyName</code>.
		 */
		hasProxy: function( proxyName )
		{
			return this.proxyMap[proxyName] ? true : false;
		},

		/**
		 * Remove a <code>Proxy</code> from the <code>Model</code>.
		 *
		 * @param {String} proxyName
		 *		The name of the <code>Proxy</code> instance to be removed.
		 *
		 * @return {Proxy}
		 *		The <code>Proxy</code> that was removed from the
		 *		<code>Model</code> or an explicit <code>null</null> if the
		 *		<code>Proxy</code> didn't exist.
		 */
		removeProxy: function( proxyName )
		{
			var proxy/*Proxy*/ = this.proxyMap[proxyName];
			if( !proxy )
				return null;
				
			delete this.proxyMap[proxyName];
			proxy.onRemove();
			return proxy;
		}
	}
);

/**
 * @constant
 * @type {String}
 * @private
 */
Model.SINGLETON_MSG = "Model Singleton already constructed!";

/**
 * <code>Model</code>s singleton instance map.
 *
 * @type {Object}
 * @private
 */
Model.instanceMap = {};

/**
 * Retrieve the singleton instance of the <code>Model</code>.
 *
 * @param {String} key
 *		The multiton key of the instance of <code>Model</code> to create or
 *		retrieve.
 *
 * @return {Model}
 * 		The singleton instance of the <code>Model</code>.
 */
Model.getInstance = function( key )
{
	if( !Model.instanceMap[ key ] )
		Model.instanceMap[key] = new Model( key );

	return Model.instanceMap[ key ];
}

/**
 * Remove a <code>Model</code> instance
 * 
 * @param {String} key
 *		Multiton key identifier for the <code>Model</code> instance to remove.
 */
Model.removeModel = function( key )
{
	delete Model.instanceMap[ key ];
}