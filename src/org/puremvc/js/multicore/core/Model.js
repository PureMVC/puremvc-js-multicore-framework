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
 * @see org.puremvc.js.multicore.interfaces.IModel
 */
function Model (key)
{
    if (Model.instanceMap[key])
    {
        throw new Error (Model.MULTITON_MSG);
    }
    
    this.multitonKey= key;
    Model.instanceMap[key]= this;
    this.proxyMap= [];
    this.initializeModel();
};

/**
 * 
 */
Model.prototype.initializeModel= function ()
{
    return;
};

/**
 * 
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.Model}
 * @static
 * @throws {Error}
 */
Model.getInstance= function (key)
{
    if (Model.instanceMap[key] == null)
    {
        Model.instanceMap[key]= new Model(key);
    }  
    
    return Model.instanceMap[key];
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.IProxy} proxy
 * @return {void}
 */
Model.prototype.registerProxy= function (proxy)
{
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()]= proxy;
    proxy.onRegister();
};

/**
 * 
 * @param {string} proxyName
 * @return {org.puremvc.js.multicore.interfaces.IProxy|null}
 */
Model.prototype.retrieveProxy= function (proxyName)
{
    return this.proxyMap[proxyName];    
};

/**
 * 
 * @param {string} proxyName
 * @return {boolean}
 */
Model.prototype.hasProxy= function (proxyName)
{
    return this.proxyMap[proxyName] != null;
};


/**
 * 
 * @param {string} proxyName
 * @returns {org.puremvc.js.multicore.interfaces.IProxy|null}
 */
Model.prototype.removeProxy= function (proxyName)
{
    var proxy= this.proxyMap[proxyName];
    if (proxy)
    {
        this.proxyMap[proxyName]= null;
        proxy.onRemove();
    }
    
    return proxy;
};

/**
 * 
 * @param {string} key
 * @return {void}
 * @static
 */
Model.removeModel= function (key)
{
    delete Model.instanceMap[key];
};

/**
 * @type Array
 * @protected
 */
Model.prototype.proxyMap= null;

/**
 * @type Array
 * @protected
 */
Model.instanceMap= [];

/**
 * @type string
 * @protected
 */
Model.prototype.multitonKey;

/**
 * 
 * @type string
 * @protected
 * @const
 * @static
 */
Model.MULTITON_MSG= "Model instance for this Multiton key already constructed!";


