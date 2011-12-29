/**
 * @fileOverview
 * @author David Foley
 * @exports Proxy as org.puremvc.js.multicore.patterns.proxy.Proxy
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * The Proxy's name defined as a static string property. It is common practice
 * for Proxy's to define their name as static properties
 * 
 * @example
 * // a UserProxy subclass would define its NAME property like so
 * UserProxy.NAME= 'userProxy';
 * 
 * @static
 * @const
 * @type string
 */
Proxy.NAME= "Proxy";

/**
 * Create a new Proxy.
 * 
 * @param {string} [proxyName]
 *  The Proxy's name. If none is provided, the Proxy will use its constructors
 *  NAME property.
 * @param {Object} [data]
 *  The Proxy;s data
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function Proxy(proxyName, data)
{
    this.proxyName= proxyName || this.constructor.NAME;
    if(data != null)
    {
        this.setData(data);
    }
};

Proxy.prototype= new Notifier;
Proxy.prototype.constructor= Proxy;

/**
 * Get the Proxy's name.
 *
 * @return {string}
 */
Proxy.prototype.getProxyName= function()
{
    return this.proxyName;
};

/**
 * Set the Proxy's data
 *
 * @param {Object} data
 * @return {void}
 */
Proxy.prototype.setData= function(data)
{
    this.data= data;
};

/**
 * Get the Proxy's data
 *
 * @return {Object|null}
 */
Proxy.prototype.getData= function()
{
    return this.data;
};

/**
 * The method invoked when the Proxy is registered with a Model. Override this
 * method to implement any data initialization logic you may need, such as 
 * loading data from a remote service or local storage.
 *
 * @return {void}
 */
Proxy.prototype.onRegister= function()
{
    return;
};

/**
 * The method invoked with the Proxy is removed from a Model. Override this 
 * method to implement any data de-initialization logic you may need, such as
 * closing any requests to remote services, or commiting data to local storage.
 * 
 * @return {void}
 */
Proxy.prototype.onRemove= function()
{
    return;
};

/**
 * The Proxys name.
 *
 * @protected
 * @type String
 */
Proxy.prototype.proxyName= null;

/**
 * The Proxy's data object.
 *
 * @protected
 * @type Object
 */
Proxy.prototype.data= null;
