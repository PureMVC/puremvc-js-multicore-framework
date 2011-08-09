/**
 * @fileOverview
 * @author David Foley
 * @exports Proxy as org.puremvc.js.multicore.patterns.proxy.Proxy
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * 
 * @static
 * @const
 * @type string
 */
Proxy.NAME= "Proxy";

/**
 * 
 * @param {string} proxyName
 * @param {Object} data
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function Proxy (proxyName, data)
{
    this.proxyName= proxyName || this.constructor.NAME;
    if (data != null)
    {
        this.setData(data);
    }
};

Proxy.prototype= new Notifier;
Proxy.prototype.constructor= Proxy;

/**
 * @return {string}
 */
Proxy.prototype.getProxyName= function ()
{
    return this.proxyName;
};

/**
 * 
 * @param {Object} data
 * @return {void}
 */
Proxy.prototype.setData= function (data)
{
    this.data= data;
};

/**
 * @return {Object|null}
 */
Proxy.prototype.getData= function ()
{
    return this.data;
};

/**
 * @return {void}
 */
Proxy.prototype.onRegister= function ()
{
    return;
};

/**
 * @return {void}
 */
Proxy.prototype.onRemove= function ()
{
    return;
};

/**
 * The proxy name.
 * 
 * @protected
 * @type String
 */
Proxy.prototype.proxyName= null;

/**
 * The data object.
 * 
 * @protected
 * @type Object
 */
Proxy.prototype.data= null;

