/**
 * @lends Puremvc.patterns.Proxy.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Proxy = Ext.extend(Puremvc.patterns.Notifier, {
/**
 * @extends Puremvc.patterns.Notifier
 * @class <P> A base <code>Proxy</code> implementation.</P>
 * <P>
 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the
 * application's data model.</P>
 *
 * <P>
 * A <code>Proxy</code> might simply manage a reference to a local data object,
 * in which case interacting with it might involve setting and
 * getting of its data in synchronous fashion.</P>
 *
 * <P>
 * <code>Proxy</code> classes are also used to encapsulate the application's
 * interaction with remote services to store or retrieve data, in which case,
 * we adopt an asynchronous idiom; setting data (or calling a method) on the
 * <code>Proxy</code> and listening for a <code>Notification</code> to be sent
 * when the <code>Proxy</code> has retrieved the data from the service.</P>
 *
 * @param {String} proxyName The name of the <code>Proxy</code>.
 * @param {Object} data An initial data object to be held by the <code>Proxy</code>.
 *
 * @see Puremvc.core.Model
 *
 * @author Justin Wilaby
 * @author Tony DeFusco
 *
 * @constructs
 */
  constructor: function(proxyName /* String */, data /* Object */) {
    Puremvc.patterns.Proxy.superclass.constructor.call(this);
    this.proxyName = (proxyName != null) ? proxyName : Puremvc.patterns.Proxy.NAME;
    if (data != null) {
      this.data = data;
    }
  },

  /**
   * Gets the proxyName.
   *
   * @return the name of the proxy.
   * @type String
   */
  getProxyName: function() {
    return this.proxyName;
  },

  /**
   * Sets the data object.
   *
   * @param {Object} data The data to set.
   */
  setData: function(data /* Object */) {
    this.data = data;
  },

  /**
   * Gets the data.
   *
   * @return the data held in the <code>Proxy.
   * @type Object
   */
  getData: function() {
    return this.data;
  },

  /**
   * Called by the Model when the <code>Proxy</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
  },

  /**
   * Called by the Model when the <code>Proxy</code> is removed.
   * This method is usually overridden as needed by the subclass.
   */
  onRemove: function() {
  }
});

Ext.apply(Puremvc.patterns.Proxy,
/** @lends Puremvc.patterns.Proxy# */
{
  /**
   * The default name of the <code>Proxy</code>
   * 
   * @type String
   * @constant
   * @memberof Puremvc.patterns.Proxy
   */
  NAME: "Proxy"
});
