/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A Singleton <code>IModel</code> implementation.
*
* <P>
* In PureMVC, the <code>Model</code> class provides
* access to model objects (Proxies) by named lookup.
*
* <P>
* The <code>Model</code> assumes these responsibilities:</P>
*
* <UL>
* <LI>Maintain a cache of <code>IProxy</code> instances.</LI>
* <LI>Provide methods for registering, retrieving, and removing
* <code>IProxy</code> instances.</LI>
* </UL>
*
* <P>
* Your application must register <code>IProxy</code> instances
* with the <code>Model</code>. Typically, you use an
* <code>ICommand</code> to create and register <code>IProxy</code>
* instances once the <code>Facade</code> has initialized the Core
* actors.</p>
*
* @see org.puremvc.js.patterns.proxy.Proxy Proxy
* @see org.puremvc.js.interfaces.IProxy IProxy
*/
function class_org_puremvc_js_core_Model()
{
	Objs.register("org.puremvc.js.core.Model",Model);

	var IModel = Objs.load("org.puremvc.js.interfaces.IModel");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");

	/**
	 * Constructor.
	 *
	 * <p>
	 * This <code>IModel</code> implementation is a Singleton,
	 * so you should not call the constructor
	 * directly, but instead call the static Singleton
	 * Factory method <code>Model.getInstance()</code>.
	 * </p>
	 *
	 * @throws Error Error if Singleton instance has already been constructed
	 *
	 */
	function Model()
	{
		if(Objs.extending) return;

		if(Model._instance != null)
			throw Error(Model.SINGLETON_MSG);

		Model._instance = this;
		this._proxyMap = new Array();
		this._initializeModel();
	}

	/**
	 * <code>Model</code> implements <code>IModel</code>
	 */
	Objs.implement(Model,IModel);

	var o = Model.prototype;

	/**
	 * Mapping of proxyNames to IProxy instances
	 */
	o._proxyMap/*Array*/ = null;

	/**
	 * Singleton instance
	 */
	Model._instance/*IModel*/ = null;

	/* Message Constants */
	Model._SINGLETON_MSG/*String*/ = "Model Singleton already constructed!";

	/**
	 * Initialize the Singleton <code>Model</code> instance.
	 *
	 * <P>
	 * Called automatically by the constructor, this
	 * is your opportunity to initialize the Singleton
	 * instance in your subclass without overriding the
	 * constructor.</P>
	 *
	 * @return void
	 */
	o._initializeModel = function()
	{
	}

	/**
	 * <code>Model</code> Singleton Factory method.
	 *
	 * @return the Singleton instance
	 */
	Model.getInstance = function()/*IModel*/
	{
		if(Model._instance == null)
			Model._instance = new Model();

		return Model._instance;
	}

	/**
	 * Register an <code>IProxy</code> with the <code>Model</code>.
	 *
	 * @param proxy an <code>IProxy</code> to be held by the <code>Model</code>.
	 */
	o.registerProxy = function( proxy/*IProxy*/ )
	{
		this._proxyMap[ proxy.getProxyName() ] = proxy;
		proxy.onRegister();
	}

	/**
	 * Retrieve an <code>IProxy</code> from the <code>Model</code>.
	 *
	 * @param proxyName
	 * @return the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
	 */
	o.retrieveProxy = function( proxyName/*String*/ )/*IProxy*/
	{
		return this._proxyMap[ proxyName ];
	}

	/**
	 * Check if a Proxy is registered
	 *
	 * @param proxyName
	 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
	 */
	o.hasProxy = function( proxyName/*String*/ )/*Boolean*/
	{
		return this._proxyMap[ proxyName ] != null;
	}

	/**
	 * Remove an <code>IProxy</code> from the <code>Model</code>.
	 *
	 * @param proxyName name of the <code>IProxy</code> instance to be removed.
	 * @return the <code>IProxy</code> that was removed from the <code>Model</code>
	 */
	o.removeProxy = function( proxyName/*String*/ )/*IProxy*/
	{
		var proxy/*IProxy*/ = this._proxyMap [ proxyName ];
		if( proxy )
		{
			this._proxyMap[ proxyName ] = null;
			proxy.onRemove();
		}
		return proxy;
	}
}