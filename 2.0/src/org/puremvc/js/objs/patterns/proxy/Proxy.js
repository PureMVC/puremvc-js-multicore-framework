/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Proxy</code> class.
	 * 
	 * <P>
	 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the
	 * application's data model.
	 *
	 * <P>
	 * A <code>Proxy</code> might simply manage a reference to a local data object,
	 * in which case interacting with it might involve setting and
	 * getting of its data in synchronous fashion.
	 *
	 * <P>
	 * <code>Proxy</code> classes are also used to encapsulate the application's
	 * interaction with remote services to store or retrieve data, in which case,
	 * we adopt an asynchronous idiom; setting data (or calling a method) on the
	 * <code>Proxy</code> and listening for a <code>Notification</code> to be sent
	 * when the <code>Proxy</code> has retrieved the data from the service.
	 *
	 * @see puremvc.Model Model
	 *
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var Proxy = Objs
	( 
		"puremvc.Proxy",
		"puremvc.Notifier",
		{
			/**
			 * The data object controlled by the <code>Proxy</code>.
			 *
			 * @type {Object}
			 * @private
			 */
			data: null,
			
			/**
			 * The name of the <code>Proxy</code>.
			 * 
			 * @type {String}
			 * @private
			 */
			proxyName: null,
			
			/**
			 * @override
			 *
			 * Initialize a <code>Proxy</code> instance.
			 *
			 * @param {String} proxyName
			 * 		The name of the <code>Proxy</code>.
			 *
			 * @param {Object} data
			 * 		An initial data object to be held by the <code>Proxy</code>.
			 */
			initialize: function( proxyName, data )
			{
				Proxy.$super.initialize.call(this);
			
				this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
				this.data = data;
			},
			
			/**
			 * Gets the proxyName.
			 *
			 * @return {String}
			 * 		The name of the proxy.
			 */
			getProxyName: function()
			{
				return this.proxyName;
			},
			
			/**
			 * Sets the data object.
			 *
			 * @param {Object} data
			 * 		The data to set.
			 */
			setData: function( data )
			{
				this.data = data;
			},
			
			/**
			 * Gets the data.
			 *
			 * @return {Object}
			 * 		The data held in the <code>Proxy.
			 */
			getData: function()
			{
				return this.data;
			},
			
			/**
			 * Called by the Model when the <code>Proxy</code> is registered.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRegister: function(){},
			
			/**
			 * Called by the Model when the <code>Proxy</code> is removed.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRemove: function(){}
		}
	);

	/**
	 * The default name of the <code>Proxy</code>
	 * 
	 * @type {String}
	 * @constant
	 */
	Proxy.NAME = "Proxy";
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Proxy = Objs("puremvc.Proxy");