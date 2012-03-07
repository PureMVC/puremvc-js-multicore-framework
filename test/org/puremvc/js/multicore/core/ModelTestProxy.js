/**
 * @fileOverview
 * @author David Foley
 * @exports ModelTestProxy
 * @requires ProxyAdapter
 * @requires Proxy
 */

/**
 * @constructor
 * @extends {ProxyAdapter}
 */
function ModelTestProxy ()
{
    Proxy.call(this, ModelTestProxy.NAME, '');    
};

// subclass Proxy via ProxyAdapter
ModelTestProxy.prototype= new ProxyAdapter();
ModelTestProxy.prototype.constructor= ModelTestProxy;

/**
 * @type {string}
 * @const
 */
ModelTestProxy.NAME= "ModelTestProxy";

/**
 * @type {string}
 * @const
 */
ModelTestProxy.ON_REGISTER_CALLED= "onRegister Called";

/**
 * @type {string}
 * @const
 */
ModelTestProxy.ON_REMOVE_CALLED= "onRemove Called";

/** @override */
ModelTestProxy.prototype.onRegister= function ()
{
	console.info('setting data', this, ModelTestProxy.ON_REGISTER_CALLED)
    this.setData(ModelTestProxy.ON_REGISTER_CALLED);
};

/** @override */
ModelTestProxy.prototype.onRemove= function ()
{
    this.setData(ModelTestProxy.ON_REMOVE_CALLED);    
};
