/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The <code>Model</code> class for PureMVC.
 *
 * <P>
 * In PureMVC, the <code>Model</code> class provides
 * access to model objects (Proxies) by named lookup.
 *
 * <P>
 * A singleton <code>Model</code> implementation.
 *
 * <P>
 * The <code>Model</code> assumes these responsibilities:
 *
 * <UL>
 * <LI>Maintain a cache of <code>Proxy</code> instances.
 * <LI>Provide methods for registering, retrieving, and removing
 * <code>Proxy</code> instances.
 *
 * <P>Your application must register <code>Proxy</code> instances with the
 * <code>Model</code>. Typically, you use a <code>SimpleCommand</code> to
 * create and register <code>Proxy</code> instances once the
 * <code>Facade</code> has initialized the core actors.
 * 
 * @see org.puremvc.js.prototypejs.patterns.proxy.Proxy Proxy
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
		 * @throws {Error}
		 * 		Throws an error if an instance for this singleton has already
		 * 		been constructed.
		 */
		initialize: function()
		{
			if( Model.instance )
				throw Error( Model.SINGLETON_MSG );

			this.proxyMap = {};
			this.initializeModel();
		},

		/**
		 * Register a <code>Proxy</code> with the <code>Model</code>.
		 *
		 * @param {Proxy} proxy
		 *		A <code>Proxy</code> to be held by the <code>Model</code>.
		 */
		registerProxy: function( proxy )
		{
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
			var proxy/*Proxy*/ = this.proxyMap[proxyName];
			
			//Here we want to return a strict "null"
			return proxy ? proxy : null;
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
		},

		/**
		 * Initialize the singleton <code>Model</code> instance.
		 *
		 * <P>
		 * Called automatically by the constructor. This
		 * is the opportunity to initialize the singleton
		 * instance in a subclass without overriding the
		 * constructor.
		 */
		initializeModel: function()
		{

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
 * @type {Model}
 * @private
 */
Model.instance = new Model();

/**
 * Retrieve the singleton instance of the <code>Model</code>.
 *
 * @return {Model}
 * 		The singleton instance of the <code>Model</code>.
 */
Model.getInstance = function()
{
	if( !Model.instance )
		Model.instance = new Model();

	return Model.instance;
}