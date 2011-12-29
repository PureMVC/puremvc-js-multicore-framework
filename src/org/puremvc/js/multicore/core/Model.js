/**
 * @fileOverview
 * @exports Model as org.puremvc.js.multicore.core.Model
 * @author David Foley
 */

/**
 *
 * @param {string} key
 * @constructor
 * @throws {Error}
 * @see org.puremvc.js.multicore.core.Model.getInstance
 */
function Model(key)
{
    if(Model.instanceMap[key])
    {
        throw new Error(Model.MULTITON_MSG);
    }

    this.multitonKey = key;
    Model.instanceMap[key] = this;
    this.proxyMap = [];
    this.initializeModel();
};

/**
 * The Models protected initialization method. Though subclassing should not be
 * required, if you do decide to subclass Model, then override this method with
 * your own Model initialization logic.
 *
 * @protected
 * @return {void}
 */
Model.prototype.initializeModel = function()
{
    return;
};

/**
 * Retrieve a Model for a given key. If no Model has been previously instantiated
 * with this key, a new instance will be created for you.
 *
 * You will most likely not use this method directly. Rather, Model instantiotion
 * will be driven by your  use of Facade.
 *
 * @example
 * var model= Model.getInstance('aMultitonKey')
 *
 * @static
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.Model}
 * @throws {Error}
 */
Model.getInstance = function(key)
{
    if(Model.instanceMap[key] == null)
    {
        Model.instanceMap[key] = new Model(key);
    }

    return Model.instanceMap[key];
};

/**
 * Register a Proxy with the Model. The Proxys #onRegister method will be invoked
 * once registered with the Model, and the Proxy name returned by
 * Proxy#getProxyName will be used to reference the Proxy instance.
 *
 * Note that you will rarely used this method directly, but indirectly via
 * Facade#registerProxy.
 *
 * @example
 * Model.getInstance('yourMultitonKey').registerProxy(new Proxy(Proxy.NAME))
 *
 * @param {org.puremvc.js.multicore.patterns.proxy.Proxy} proxy
 * 	A Proxy instance.
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#registerProxy
 * @see org.puremvc.js.multicore.patterns.proxy.Proxy#getProxyName
 * @see org.puremvc.js.multicore.patterns.proxy.Proxy#onRegister
 * @see #hasProxy
 */
Model.prototype.registerProxy = function(proxy)
{
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()] = proxy;
    proxy.onRegister();
};

/**
 * Retrieve a previously registered Proxy. If no Proxy can be found, the method
 * will return null.
 *
 * @description
 * <pre>
 * 	<code>
 * 		var model, found;
 *
 * 		model= Model.getInstance('yourMultitonKey')
 * 		// no model was previously registered, so retrieveProxy returns null
 * 		found= model.retrieveProxy(UserProxy.NAME) // null
 *
 * 		model.registerProxy(new UserProxy())
 * 		// after registering the proxy, the model will retrieve it
 * 		found= model.retrieveProxy(UserProxy.NAME); // UserProxy instance
 * 	</code>
 * </pre>
 *
 * @param {string} proxyName
 * 	The name of the Proxy to retrieve
 * @return {org.puremvc.js.multicore.patterns.proxy.Proxy|null}
 */
Model.prototype.retrieveProxy = function(proxyName)
{
    return this.proxyMap[proxyName];
};

/**
 * Determine if a particular Proxy is registered with the Model
 *
 * @param {string} proxyName
 * 	The name of a Proxy.
 * @return {boolean}
 * 	True if the Model has registered the Proxy, false otherwise.
 */
Model.prototype.hasProxy = function(proxyName)
{
    return this.proxyMap[proxyName] != null;
};

/**
 * Remove a previously regietered Proxy from the Model. No action is taken if the
 * Model does not have a Proxy with the proxy name supplied. Once the Proxy is
 * removed, the Proxys #onRemove method is invoked.
 *
 * @param {string} proxyName
 * @returns {org.puremvc.js.multicore.patterns.proxy.Proxy|null}
 * @see org.puremvc.js.multicore.patterns.proxy.Proxy#getProxyName
 */
Model.prototype.removeProxy = function(proxyName)
{
    var proxy = this.proxyMap[proxyName];
    if(proxy)
    {
        this.proxyMap[proxyName] = null;
        proxy.onRemove();
    }

    return proxy;
};

/**
 * Dispose of a Model instance by its multiton key. No action is
 * taken if no Model exists for the multiton key.
 *
 * @static
 * @param {string} key
 *  A Models multiton key.
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#removeCore
 */
Model.removeModel = function(key)
{
    delete Model.instanceMap[key];
};

/**
 * The map used by the Model to store Proxy instances.
 *
 * @protected
 * @type Array
 */
Model.prototype.proxyMap = null;

/**
 * The map used by the Model to store multiton instances
 *
 * @protected
 * @type Array
 */
Model.instanceMap = [];

/**
 * The Models multiton key.
 * 
 * @protected
 * @type string
 */
Model.prototype.multitonKey

/**
 * The error message presented if an attempt is made to instantiate Model directly
 * @static
 * @const
 * @type {string}
 */
Model.MULTITON_MSG = "Model instance for this Multiton key already constructed!";
