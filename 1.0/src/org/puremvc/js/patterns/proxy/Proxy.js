/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>IProxy</code> implementation.
*
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
*
* @see org.puremvc.js.core.model.Model Model
*/
function class_org_puremvc_js_patterns_proxy_Proxy()
{
	Objs.register("org.puremvc.js.patterns.proxy.Proxy",Proxy);

	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");

	/**
	 * Constructor
	 *
	 * @param proxyName   The dynamic name of the <code>Proxy</code>.
	 * @param data        The data the <code>Proxy</code> is proxying.
	 */
	function Proxy( proxyName/*String*/, data/*Object*/ )
	{
		Notifier.apply(this,arguments);

		if(Objs.extending) return;

		this._proxyName = (proxyName != null) ? proxyName : Proxy.NAME;

		if(data != null)
			this.setData(data);
	}

	/**
	 * <code>Facade</code> extends <code>Notifier</code>
	 */
	Objs.extend(Proxy,Notifier);

	/**
	 * <code>Facade</code> implements <code>IProxy</code>
	 */
	Objs.implement(Proxy,IProxy);

	/**
	 * <code>Facade</code> implements <code>INotifier</code>
	 */
	Objs.implement(Proxy,INotifier);

	var o = Proxy.prototype;

	/**
	 * The name of the <code>Proxy</code>.
	 */
	Proxy.NAME/*String*/ = 'Proxy';

	/**
	 * The proxy name
	 */
	o._proxyName/*String*/ = null;

	/**
	 * The data object
	 */
	o._data/*Object*/ = null ;

	/**
	 * Get the proxy name
	 */
	o.getProxyName = function()/*String*/
	{
		return this._proxyName;
	}

	/**
	 * Set the data object
	 */
	o.setData = function( data/*Object*/ )
	{
		this._data = data;
	}

	/**
	 * Get the data object
	 */
	o.getData = function()/*Object*/
	{
		return this._data;
	}

	/**
	 * Called by the Model when the Proxy is registered
	 */
	o.onRegister = function()
	{

	}

	/**
	 * Called by the Model when the Proxy is removed
	 */
	o.onRemove = function()
	{

	}
}