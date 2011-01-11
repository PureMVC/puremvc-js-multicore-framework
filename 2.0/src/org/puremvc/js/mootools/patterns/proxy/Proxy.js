/**
 * @misc
 * @class A base <code>Proxy</code> implementation.
 * <P>
 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the
 * application's data model. </P>
 *
 * <P>
 * A <code>Proxy</code> might simply manage a reference to a local data object,
 * in which case interacting with it might involve setting and
 * getting of its data in synchronous fashion.</P>
 *
 * <P>
 * <code>Proxy</code> classes are also used to encapsulate the application's
 * interaction with remote services to save or retrieve data, in which case,
 * we adopt an asyncronous idiom; setting data (or calling a method) on the
 * <code>Proxy</code> and listening for a <code>Notification</code> to be sent
 * when the <code>Proxy</code> has retrieved the data from the service. </P>
 * @extends Notifier
 * @param {String} proxyName The name of the Proxy
 * @param {Object} data An initial data object to be held by the proxy.
 * @see Model
 * @author Justin Wilaby
 */
var Proxy = function(proxyName /* String */, data /* Object */){
    this.Extends = Notifier;

    /**
     * The unique name for this
     * <code>Proxy</code> instance
     * @type String
     */
    this.proxyName = null;
    /**
     * Storage for the data assigned to this
     * <code>Proxy</code> instance
     * @type Object
     */
    this.data = null;

    /**
     * @ignore
     */
    this.initialize = function(proxyName /* String */, data /* Object */)
    {
	this.parent();
	this.proxyName = proxyName || Proxy.NAME;
	this.data = data;
    }

    /**
     * Gets the proxyName
     *
     * @return {String} The name of the proxy
     */
    this.getProxyName = function()
    {
	return this.proxyName;
    }

    /**
     * Sets the data object
     * @param {Object} data The data to set
     */
    this.setData = function(data /* Object */)
    {
	this.data = data;
    }

    /**
     * Gets the data
     * @return {Object} The data held in the Proxy
     */
    this.getData = function()
    {
	return this.data;
    }

    /**
     * Called by the Model when the <code>Proxy</code> is registered.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRegister = function(){}

     /**
     * Called by the Model when the <code>Proxy</code> is removed.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRemove = function(){}
}
Proxy = new Class(new Proxy());
/**
 * The default name of the <code>Proxy</code>
 * @type String
 */
Proxy.NAME = "Proxy";