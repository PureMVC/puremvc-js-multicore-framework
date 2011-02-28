/**
 * @lends Puremvc.core.Model.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.Model = Ext.extend(Object, {

  /**
   * @private
   *
   * HashTable of <code>Proxy</code> instances
   * registered with the <code>Model</code>
   * @type Object
   */
  proxyMap: {},

  /**
   * @class <P>In PureMVC, the <code>Model</code> class provides
   * access to model objects (Proxies) by named lookup.</P>
   * <P>
   * A singleton <code>Model</code> implementation in the form
   * of a JSON object.</P>
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
   * with the <code>Model</code>. Typically, you use a
   * <code>SimpleCommand</code> to create and register <code>Proxy</code>
   * instances once the <code>Facade</code> has initialized the core
   * actors.</p>
   *
   * @see Puremvc.patterns.Proxy
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.Model._instance != null) {
      throw Error(Puremvc.core.Model._SINGLETON_MSG);
    }
    this.initializeModel();
    Puremvc.core.Model._instance = this;
  },

  /**
   * Register a <code>Proxy</code> with the <code>Model</code>.
   *
   * @param {Puremvc.patterns.Proxy} proxy a <code>Proxy</code> to be held by the <code>Model</code>.
   */
  registerProxy: function(proxy /* Proxy */) {
    this.proxyMap[proxy.getProxyName()] = proxy;
    proxy.onRegister();
  },

  /**
   * Retrieve an <code>IProxy</code> from the <code>Model</code>.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> to retrieve.
   *
   * @returns the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
   * @type Puremvc.patterns.Proxy
   */
  retrieveProxy: function(proxyName /* String */) {
    var retVal = this.proxyMap[proxyName] || null;
    return retVal;
  },

  /**
   * Check if a <code>Proxy</code> is registered.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> to verify the existence of its registration.
   *
   * @returns true if a Proxy is currently registered with the given <code>proxyName</code>, otherwise false.
   * @type Boolean
   */
  hasProxy: function(proxyName /* String */) {
    return this.proxyMap[proxyName] != null;
  },

  /**
   * Remove a <code>Proxy</code> from the <code>Model</code>.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> instance to be removed.
   *
   * @returns the <code>Proxy</code> that was removed from the <code>Model</code>.
   * @type Puremvc.patterns.Proxy
   */
  removeProxy: function(proxyName /* String */) {
    var proxy = this.proxyMap[proxyName] || null;
    if (proxy) {
      delete this.proxyMap[proxyName];
      proxy.onRemove();
    }
    return proxy;
  },

  /**
   * @ignore
   */
  initializeModel: function() {

  }
});

Ext.apply(Puremvc.core.Model, 
/** @lends Puremvc.core.Model# */
{
  /**
   * @constant
   * @memberof Puremvc.core.Model
   * @private
   */
  _SINGLETON_MSG: "Model Singleton already constructed!",

  /**
   * @memberof Puremvc.core.Model
   * @private
   */
  _instance: new Puremvc.core.Model(),

  /**
   * Retrieve the singleton instance of the <code>Model</code>.
   * @memberof Puremvc.core.Model
   */
  getInstance: function() {
    return Puremvc.core.Model._instance;
  }
});
