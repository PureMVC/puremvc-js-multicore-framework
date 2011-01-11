/**
 * @misc
 * In PureMVC, the <code>Model</code> class provides
 * access to model objects (Proxies) by named lookup.
 *
 * @class A Singleton <code>Model</code> implementation in the form
 * of a JSON object.
 * <P>
 * The <code>Model</code> assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of <code>Proxy</code> instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing
 * <code>Proxy</code> instances.</LI>
 * </UL>
 *
 * <P>
 * Your application must register <code>Proxy</code> instances
 * with the <code>Model</code>. Typically, you use an
 * <code>SimpleCommand</code> to create and register <code>Proxy</code>
 * instances once the <code>Facade</code> has initialized the Core
 * actors.</p>
 *
 * @see Proxy
 * @author Justin Wilaby
 */
var Model = function(){

    /**
     * @ignore
     * Constructor for MooTools Class creation
     */
    this.initialize = function()
    {
	this.initializeModel();
    }
    /**
     * HashTable of <code>Proxy</code> instances
     * registered with the <code>Model</code>
     * @type Object
     */
    this.proxyMap = {}

    /**
     * Register an <code>Proxy</code> with the <code>Model</code>.
     *
     * @param {Proxy} proxy a <code>Proxy</code> to be held by the <code>Model</code>.
     */
    this.registerProxy = function(proxy /* Proxy */)
    {
	this.proxyMap[proxy.getProxyName()] = proxy;
	proxy.onRegister();
    }

    /**
     * Retrieve an <code>IProxy</code> from the <code>Model</code>.
     *
     * @param {String} proxyName The name of the <code>Proxy</code> to retrieve.
     * @returns {Proxy} The the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
     */
    this.retrieveProxy = function(proxyName /* String */)
    {
	return this.proxyMap[proxyName];
    }

    /**
     * Check if a Proxy is registered
     *
     * @param {String} proxyName
     * @returns {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
     */
    this.hasProxy = function(proxyName /* String */)
    {
	return this.proxyMap[proxyName] != null;
    }

    /**
     * Remove an <code>Proxy</code> from the <code>Model</code>.
     *
     * @param {String} proxyName The name of the <code>Proxy</code> instance to be removed.
     * @returns {Proxy} the <code>Proxy</code> that was removed from the <code>Model</code>
     */
    this.removeProxy = function(proxyName /* String */)
    {
	var proxy = this.proxyMap[proxyName];
	if (proxy)
	{
	    delete this.proxyMap[proxyName];
	    proxy.onRemove();
	}
	return proxy;
    }

    /**
     * @ignore
     * Omitted
     */
    this.initializeModel = function()
    {

    }
}
/**
 * Singleton implementation for the <code>Model</code>
 * @return {Model} the Singleton instance of the <code>Model</code>
 */
Model.getInstance = function()
{
    if (Model.instance == undefined)
    {
	var classFactory = new Class(new Model());
	Model.instance = new classFactory();
    }
    return Model.instance;
}