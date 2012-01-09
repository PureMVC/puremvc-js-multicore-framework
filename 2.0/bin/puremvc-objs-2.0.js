/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Observer</code> class.
	 *
	 * <P>
	 * An <code>Observer</code> is an object that encapsulates information
	 * about an interested object with a method that should
	 * be called when a particular <code>Notification</code> is broadcast.
	 *
	 * <P>
	 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.
	 * <LI>Encapsulate the notification context (this) of the interested object.
	 * <LI>Provide methods for setting the notification method and context.
	 * <LI>Provide a method for notifying the interested object.
	 *
	 * @see puremvc.View View
	 * @see puremvc.Notification Notification
	 * 
	 * @constructor
	 */
	Objs
	(
		"puremvc.Observer",
		{
			/**
			 * The notification method of the interested object.
			 * 
			 * @type {Function}
			 * @private
			 */
			notify: null,
			
			/**
			 * The notification context of the interested object.
			 * 
			 * @type {Object}
			 * @private
			 */
			context: null,
			
			/**
			 * Initialize an <code>Observer</code> instance.
			 *
			 * @param {Function} notifyMethod
			 * 		The notification method of the interested object.
			 * 
			 * @param {Object} notifyContext
			 * 		The notification context of the interested object.
			 */
			initialize: function( notifyMethod, notifyContext )
			{
				this.setNotifyMethod( notifyMethod );
				this.setNotifyContext( notifyContext );
			},
			
			/**
			 * Get the notification method.
			 *
			 * @return {Function}
			 * 		The notification (callback) method of the interested object.
			 */
			getNotifyMethod: function()
			{
				return this.notify;
			},
			
			/**
			 * Set the notification method.
			 *
			 * <P>The notification method should take one parameter of type
			 * <code>Notification</code>.
			 *
			 * @param {Function} notifyMethod
			 * 		The notification (callback) method of the interested object.
			 */
			setNotifyMethod: function( notifyMethod )
			{
				this.notify = notifyMethod;
			},
			
			/**
			 * Get the notification context.
			 *
			 * @return {Object}
			 * 		The notification context (<code>this</code>) of the interested
			 * 		object.
			 */
			getNotifyContext: function()
			{
				return this.context;
			},
			
			/**
			 * Set the notification context.
			 *
			 * @param {Object} notifyContext
			 * 		The notification context (this) of the interested object.
			 */
			setNotifyContext: function( notifyContext )
			{
				this.context = notifyContext;
			},
			
			/**
			 * Notify the interested object.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> to pass to the interested object's
			 * 		notification method.
			 */
			notifyObserver: function( note )
			{
				this.getNotifyMethod().call( this.getNotifyContext(), note );
			},
			
			/**
			 * Compare an object to the notification context.
			 *
			 * @param {Object} object
			 * 		The object to compare.
			 *
			 * @return {Boolean}
			 * 		The object and the notification context are the same.
			 */
			compareNotifyContext: function( object )
			{
				return object === this.getNotifyContext();
			}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Observer = Objs("puremvc.Observer");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Notification</code> class.
	 *
	 * <P>
	 * PureMVC does not rely upon underlying event models such
	 * as the one provided with Flash, and ActionScript 3 does
	 * not have an inherent event model.
	 *
	 * <P>
	 * The Observer pattern as implemented within PureMVC exists
	 * to support event-driven communication between the
	 * application and the actors of the MVC triad (Model, View
	 * and Controller.
	 *
	 * <P>
	 * Notifications are not meant to be a replacement for Events
	 * in Flex/Flash/Air/Javascript. Generally, <code>Mediator</code>
	 * implementors place event listeners on their view components, which they
	 * then handle in the usual way. This may lead to the broadcast of
	 * <code>Notification</code>s to trigger <code>Command</code>s or to
	 * communicate with other <code>Mediators</code>.
	 * <code>Proxy</code> and <code>Command</code> instances communicate with each
	 * other and <code>Mediator</code>s by broadcasting <code>Notification</code>s.
	 *
	 * <P>
	 * A key difference between Flash <code>Event</code>s and PureMVC
	 * <code>Notification</code>s is that <code>Event</code>s follow the
	 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
	 * until some parent component handles the <code>Event</code>, while
	 * PureMVC <code>Notification</code>s follow a 'Publish/Subscribe'
	 * pattern. PureMVC classes need not be related to each other in a
	 * parent/child relationship in order to communicate with one another
	 * using <code>Notification</code>s.
	 *
	 * @see puremvc.Observer Observer
	 * 
	 * @constructor
	 */
	Objs
	(
		"puremvc.Notification",
		{
			/**
			 * The name of the notification.
			 * 
			 * @type {String}
			 * @private 
			 */
			name: null,
			
			/**
			 * The body data to send with the notification.
			 * 
			 * @type {Object}
			 * @private
			 */
			body: null,
			
			/**
			 * The type identifier of the notification.
			 * 
			 * @type {String}
			 * @private
			 */
			type: null,
			
			/**
			 * Initialize a <code>Notification</code> instance.
			 *
			 * @param {String} name
			 * 		The name of the notification.
			 *
			 * @param {Object} body
			 * 		(optional) Body data to send with the notification.
			 * 
			 * @param {String} type (optional)
			 * 		Type identifier of the notification.
			 */
			initialize: function( name, body, type )
			{			
				this.name = name;
				this.body = body;
				this.type = type;
			},
			
			/**
			 * Get the name of the <code>Notification</code> instance.
			 *
			 * @return {String}
			 * 		The name of the <code>Notification</code> instance.
			 */
			getName: function()
			{
				return this.name;
			},
			
			/**
			 * Set the body of the <code>Notification</code> instance.
			 *
			 * @param {Object} body
			 * 		The body of the notification.
			 */
			setBody: function( body )
			{
				this.body = body;
			},
			
			/**
			 * Get the body of the <code>Notification</code> instance.
			 *
			 * @return {Object}
			 * 		The body for the notification.
			 */
			getBody: function()
			{
				return this.body;
			},
			
			/**
			 * Set the type of the <code>Notification</code> instance.
			 *
			 * @param {String} type
			 * 		The type identifier for the notification.
			 */
			setType: function( type )
			{
				this.type = type;
			},
			
			/**
			 * Get the type of the <code>Notification</code> instance.
			 *
			 * @return {String}
			 * 		The type identifier for the notification.
			 */
			getType: function()
			{
				return this.type;
			},
			
			/**
			 * Get a textual representation of the <code>Notification</code>
			 * instance.
			 *
			 * @return {String}
			 * 		The textual representation of the <code>Notification</code>
			 * 		instance.
			 */
			toString: function()
			{
				var msg/*String*/ = "Notification Name: " + this.getName();
				msg += "\nBody:" + (( this.getBody() == null ) ? "null" : this.getBody().toString());
				msg += "\nType:" + (( this.getType() == null ) ? "null" : this.getType());
			
				return msg;
			}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Notification = Objs("puremvc.Notification");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");

	/**
	 * @classDescription
	 * The <code>View</code> class in PureMVC.
	 * 
	 * <P>
	 * A singleton <code>View</code> implementation. In PureMVC, the
	 * <code>View</code> class assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Maintain a cache of <code>Mediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing
	 * <code>IMediator</code>s.
	 * <LI>Notifiying <code>Mediator</code>s when they are registered or removed.
	 * <LI>Managing the <code>Observer</code> lists for each
	 * <code>Notification</code> in the application.
	 * <LI>Providing a method for attaching <code>Observer</code>s to an
	 * <code>INotification</code>'s <code>Observer</code> list.
	 * <LI>Providing a method for broadcasting a <code>Notification</code>.
	 * <LI>Notifying the <code>Observer</code>s of a given
	 * <code>Notification</code> when it broadcasts.
	 *
	 * @see puremvc.Mediator Mediator
	 * @see puremvc.Observer Observer
	 * @see puremvc.Notification Notification
	 * 
	 * @constructor
	 */
	var View = Objs
	(
		"puremvc.View",
		{
			/**
			 * @private
			 *
			 * Mapping of <code>Mediator</code> names to <code>Mediator</code>
			 * instances.
			 *
			 * @type {Object}
			 */
			mediatorMap: null,
			
			/**
			 * @private
			 * 
			 * Mapping of <code>Notification</code> names to
			 * <code>Observers</code> lists.
			 *
			 * @type {Object}
			 */
			observerMap: null,
			
			/**
			 * Initialize a <code>View</code> instance.
			 * 
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already
			 * 		been constructed.
			 */
			initialize: function()
			{
				if( View.instance )
					throw Error( View.SINGLETON_MSG );
			
				this.mediatorMap = {};
				this.observerMap = {};
				this.initializeView();
			},
			
			/**
			 * Initialize the singleton <code>View</code> instance.
			 *
			 * <P>
			 * Called automatically by the constructor. This
			 * is the opportunity to initialize the singleton
			 * instance in a subclass without overriding the
			 * constructor.
			 */
			initializeView: function() {},
			
			/**
			 * Register an <code>Observer</code> to be notified of
			 * <code>Notifications</code> with a given name.
			 *
			 * @param {String} name
			 * The name of the <code>Notification</code>s to notify this
			 * <code>Observer</code> of.
			 * 
			 * @param {Observer} observer
			 * 		The <code>Observer</code> to register.
			 */
			registerObserver: function( name, observer )
			{
				var observers/*Array*/ = this.observerMap[name];
				if( observers )
					observers.push(observer);
				else
					this.observerMap[name] = [observer];
			},
			
			/**
			 * Notify the <code>Observer</code>s for a particular
			 * <code>Notification</code>.
			 *
			 * <P>
			 * All previously attached <code>Observer</code>s for this
			 * <code>Notification</code>'s list are notified and are passed a reference
			 * to the <code>Notification</code> in the order in which they were
			 * registered.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> to notify <code>Observer</code>s
			 * 		of.
			 */
			notifyObservers: function( note )
			{
				var name/*String*/ = note.getName();
			
				var observersRef/*Array*/ = this.observerMap[name];
				if( observersRef )
				{
					// Copy the array.
					var observers/*Array*/ = observersRef.slice(0);
					var len/*Number*/ = observers.length;
					for( var i/*Number*/=0; i<len; i++ )
					{
						var observer/*Observer*/ = observers[i];
						observer.notifyObserver(note);
					}
				}
			},
			
			/**
			 * Remove the <code>Observer</code> for a given <i>notifyContext</i>
			 * from an <code>Observer</code> list for a given
			 * <code>Notification</code> name.
			 *
			 * @param {String} name
			 * 		Which <code>Observer</code> list to remove from.
			 *
			 * @param {Object} notifyContext
			 * 		Remove the <code>Observer</code> with this object as its
			 *		<i>notifyContext</i>.
			 */
			removeObserver: function( name, notifyContext )
			{
				var observers/*Array*/ = this.observerMap[name];
				var i/*Number*/ = observers.length;
			
				while( i-- )
				{
					var observer/*Observer*/ = observers[i];
					if( observer.compareNotifyContext(notifyContext) )
					{
						observers.splice( i, 1 );
						break;
					}
				}
			
				// Remove empty observer lists.
				if( observers.length == 0 )
					delete this.observerMap[name];
			},
			
			/**
			 * Register an <code>IMediator</code> instance with the <code>View</code>.
			 *
			 * <P>
			 * Registers the <code>IMediator</code> so that it can be retrieved by name,
			 * and further interrogates the <code>IMediator</code> for its
			 * <code>INotification</code> interests.
			 *
			 * <P>
			 * If the <code>IMediator</code> returns any <code>INotification</code>
			 * names to be notified about, an <code>Observer</code> is created to
			 * encapsulate the <code>IMediator</code> instance's
			 * <code>handleNotification</code> method and register it as an
			 * <code>Observer</code> for all <code>INotification</code>s the
			 * <code>IMediator</code> is interested in.
			 *
			 * @param {Mediator} mediator
			 * 		A reference to the <code>Mediator</code> instance.
			 */
			registerMediator: function( mediator )
			{
				var name/*String*/ = mediator.getMediatorName();
				
				// Do not allow re-registration (you must removeMediator first)
				if( this.mediatorMap[name] )
					return;
			
				// Register the Mediator for retrieval by name
				this.mediatorMap[name] = mediator;
				
				// Register Mediator as an observer for each of its notification interests
				var interests/*Array*/ = mediator.listNotificationInterests();
				var len/*Number*/ = interests.length;
				if( len )
				{
			    	// Register Mediator as Observer for its list of Notification interests
					var observer/*Observer*/ = new Observer( mediator.handleNotification, mediator );
					for( var i/*Number*/=0; i<len; i++ )
						this.registerObserver( interests[i], observer );
				}
			
				mediator.onRegister();
			},
			
			/**
			 * Retrieve a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		The name of the <code>IMediator</code> instance to retrieve.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> instance previously registered with
			 *		the given <i>mediatorName</i> or an explicit <code>null</code>
			 *		if it doesn't exists.
			 */
			retrieveMediator: function( mediatorName )
			{
				//Return a strict null when the mediator doesn't exist
				return this.mediatorMap[mediatorName] || null;
			},
			
			/**
			 * Check if a <code>Mediator</code> is registered or not.
			 *
			 * @param {String} mediatorName
			 *		Name of the <code>Mediator</code> instance to verify the
			 *		existence of its registration.
			 *
			 * @return {Boolean}
			 *		A <code>Mediator</code> is registered with the given
			 *		<i>mediatorName</i>.
			 */
			hasMediator: function( mediatorName )
			{
				return this.mediatorMap[mediatorName] ? true : false;
			},
			
			/**
			 * Remove a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		Name of the <code>IMediator</code> instance to be removed.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> that was removed from the
			 		<code>View</code> or a strict <code>null</null> if the
			 		<code>Mediator</code> didn't exist.
			 */
			removeMediator: function( mediatorName )
			{
				var mediator/*Mediator*/ = this.mediatorMap[mediatorName];
				if( !mediator )
					return null;
			
				var interests/*Array*/ = mediator.listNotificationInterests();
				var i/*Number*/ = interests.length;
				while (i--) 
					this.removeObserver( interests[i], mediator );
				
				delete this.mediatorMap[mediatorName];
				mediator.onRemove();
				return mediator;	
			}
		}
	);
	
	/**
	 * @constant
	 * @type {String}
	 * @private
	 */
	View.SINGLETON_MSG = "View Singleton already constructed!";
	
	/**
	 * @type {View}
	 * @private
	 */
	View.instance = null;
	
	/**
	 * Retrieve the singleton instance of the <code>View</code>.
	 * 
	 * @return {View}
	 * 		The singleton instance of the <code>View</code>.
	 */
	View.getInstance = function()
	{
		if( !View.instance )
			View.instance = new View();
	
		return View.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	View = Objs("puremvc.View");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The <code>Model</code> class for PureMVC.
	 *
	 * <P>
	 * In PureMVC, the <code>Model</code> class provides
	 * access to model objects (Proxies) by named lookup.
	 *
	 * <P>
	 * A singleton <code>Model</code> implementation.
	 *
	 * <P>
	 * The <code>Model</code> assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Maintain a cache of <code>Proxy</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing
	 * <code>Proxy</code> instances.
	 *
	 * <P>Your application must register <code>Proxy</code> instances with the
	 * <code>Model</code>. Typically, you use a <code>Command</code> to
	 * create and register <code>Proxy</code> instances once the
	 * <code>Facade</code> has initd the core actors.
	 * 
	 * @see puremvc.Proxy Proxy
	 * 
	 * @constructor
	 */
	var Model = Objs
	(
		"puremvc.Model",
		{
			/**
			 * HashTable of <code>Proxy</code> instances
			 * registered with the <code>Model</code>
			 * 
			 * @type {Object}
			 * @private
			 */
			proxyMap: null,
			
			/**
			 * Initialize a <code>Model</code> instance.
			 * 
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already
			 * 		been constructed.
			 */
			initialize: function()
			{
				if( Model.instance )
					throw Error( Model.SINGLETON_MSG );
					
				this.proxyMap = {};
				this.initializeModel();
			},
			
			/**
			 * Initialize the singleton <code>Model</code> instance.
			 *
			 * <P>
			 * Called automatically by the constructor. This
			 * is the opportunity to initialize the singleton
			 * instance in a subclass without overriding the
			 * constructor.
			 */
			initializeModel: function()
			{
			
			},
			/**
			 * Register a <code>Proxy</code> with the <code>Model</code>.
			 *
			 * @param {Proxy} proxy
			 *		A <code>Proxy</code> to be held by the <code>Model</code>.
			 */
			registerProxy: function( proxy )
			{
				this.proxyMap[proxy.getProxyName()] = proxy;
				proxy.onRegister();
			},
			
			/**
			 * Retrieve an <code>IProxy</code> from the <code>Model</code>.
			 *
			 * @param {String} proxyName
			 *		The name of the <code>Proxy</code> to retrieve.
			 *
			 * @return {Proxy}
			 *		The <code>Proxy</code> instance previously registered with the
			 *		given <code>proxyName</code> or an explicit <code>null</code>
			 *		if it doesn't exists.
			 */
			retrieveProxy: function( proxyName )
			{
				//Return a strict null when the proxy doesn't exist
				return this.proxyMap[proxyName] || null;
			},
			
			/**
			 * Check if a <code>Proxy</code> is registered.
			 *
			 * @param {String} proxyName
			 *		The name of the <code>Proxy</code> to verify the existence of
			 		its registration.
			 *
			 * @return {Boolean}
			 *		A Proxy is currently registered with the given
			 		<code>proxyName</code>.
			 */
			hasProxy: function( proxyName )
			{
				return this.proxyMap[proxyName] ? true : false;
			},
			
			/**
			 * Remove a <code>Proxy</code> from the <code>Model</code>.
			 *
			 * @param {String} proxyName
			 *		The name of the <code>Proxy</code> instance to be removed.
			 *
			 * @return {Proxy}
			 *		The <code>Proxy</code> that was removed from the
			 *		<code>Model</code> or an explicit <code>null</null> if the
			 *		<code>Proxy</code> didn't exist.
			 */
			removeProxy: function( proxyName )
			{
				var proxy/*Proxy*/ = this.proxyMap[proxyName];
				if( !proxy )
					return null;
					
				delete this.proxyMap[proxyName];
				proxy.onRemove();
				return proxy;
			}
		}
	);
	
	/**
	 * @constant
	 * @type {String}
	 * @private
	 */
	Model.SINGLETON_MSG = "Model Singleton already constructed!";
	
	/**
	 * @type {Model}
	 * @private
	 */
	Model.instance = new Model();
	
	/**
	 * Retrieve the singleton instance of the <code>Model</code>.
	 *
	 * @return {Model}
	 * 		The singleton instance of the <code>Model</code>.
	 */
	Model.getInstance = function()
	{
		if( !Model.instance )
			Model.instance = new Model();
	
		return Model.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Model = Objs("puremvc.Model");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");
	var View = Objs("puremvc.View");
	
	/**
	 * @classDescription
	 * The <code>Controller</code> class for PureMVC.
	 *
	 * <P>
	 * A singleton <code>Controller</code> implementation.
	 *
	 * <P>
	 * In PureMVC, the <code>Controller</code> class follows the
	 * 'Command and Controller' strategy, and assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Remembering which <code>SimpleCommand</code>s or
	 * <code>MacroCommand</code>s are intended to handle which
	 * <code>Notification</code>s.
	 * <LI>Registering itself as an <code>Observer</code> with the
	 * <code>View</code> for each <code>Notification</code> that it has a
	 * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for.
	 * <LI>Creating a new instance of the proper <code>SimpleCommand</code>
	 * or <code>MacroCommand</code> to handle a given <code>Notification</code>
	 * when notified by the <code>View</code>.
	 * <LI>Calling the <code>SimpleCommand</code>'s
	 * or <code>MacroCommand</code>'s  <code>execute</code>
	 * method, passing in the <code>Notification</code>.
	 *
	 * <P>
	 * Your application must register <code>ICommand</code>s with the
	 * <code>Controller</code>.
	 *
	 * <P>
	 * The simplest way is to subclass </code>Facade</code>,
	 * and use its <code>initializeController</code> method to add your
	 * registrations.
	 * 
	 * @see puremvc.patterns.View View
	 * @see puremvc.Observer Observer
	 * @see puremvc.Notification Notification
	 * @see puremvc.SimpleCommand SimpleCommand
	 * @see puremvc.MacroCommand MacroCommand
	 * 
	 * @constructor
	 */
	var Controller = Objs
	(
		"puremvc.Controller",
		{
			/**
			 * The <code>View</code> singleton.
			 *
			 * @type {View}
			 * @private
			 */
			view: null,
			
			/**
			 * Mapping of <code>Notification<code> names to
			 * <code>Command</code> class references.
			 *
			 * @type {Object}
			 * @private
			 */
			commandMap: null,
			
			/**
			 * Initialize a <code>Controller</code> instance.
			 * 
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already
			 * 		been constructed.
			 */
			initialize: function()
			{
				if( Controller.instance )
					throw Error( Controller.SINGLETON_MSG );
			
				this.commandMap = {};
				this.initializeController();
			},
			
			/**
			 * Retains a reference to the <code>View</code> singleton.
		 	 * 
			 * <P>
			 * Called automatically by the constructor.
			 *
			 * <P>
			 * Note that if you are using a subclass of <code>View</code> in your
			 * application, you should <i>also</i> subclass <code>Controller</code>
			 * and override the <code>initializeController</code> method in the
			 * following way:
			 * 
			 * <pre>
			 *	// Ensure that the Controller is talking to my View implementation.
			 *	initializeController: function() 
			 *	{
			 *		this.view = MyView.getInstance();
			 *	}
			 * </pre>
			 *
			 * @private
			 */
			initializeController: function()
			{
				this.view = View.getInstance();
			},
			
			/**
			 * If a <code>Command</code> has previously been registered to handle the
			 * given <code>Notification</code>, then it is executed.
			 *
			 * @param {Notification} note
			 * 		A <code>Notification</code>.
			 */
			executeCommand: function( note )
			{
				var commandClassRef/*Function*/ = this.commandMap[note.getName()];
				if( commandClassRef )
				{
					var command/*Command*/ = new commandClassRef();
					command.execute(note);
				}
			},
			
			/**
			 * Register a particular <code>Command</code> class as the handler for a
			 * particular <code>Notification</code>.
			 *
			 * <P>
			 * If a <code>Command</code> has already been registered to handle
			 * <code>Notification</code>s with this name, it is no longer used, the new
			 * <code>Command</code> is used instead.
			 *
			 * The <code>Observer</code> for the new <code>Command</code> is only
			 * created if this is the first time a <code>Command</code> has been
			 * registered for this <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code>.
			 *
			 * @param {Function} commandClassRef
			 * 		The <code>Class</code> of the <code>Command</code>.
			 */
			registerCommand: function( notificationName, commandClassRef )
			{
				if( !this.commandMap[notificationName] )
					this.view.registerObserver( notificationName, new Observer( this.executeCommand, this ) );
			
				this.commandMap[notificationName] = commandClassRef;
			},
			
			/**
			 * Check if a <code>Command</code> is registered for a given
			 * <code>Notification</code>.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to verify the
			 * 		existence of its registration.
			 * 
			 * @return {Boolean}
			 * 		A <code>Command</code> is currently registered for the given
			 * 		<code>notificationName</code>.
			 */
			hasCommand: function( notificationName )
			{
				return this.commandMap[notificationName] ? true : false;
			},
			
			/**
			 * Remove a previously registered <code>SimpleCommand</code>
			 * or <code>MacroCommand</code> to <code>Notification</code> mapping.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to remove the
			 * 		<code>SimpleCommand</code> or <code>MacroCommand</code>	mapping
			 * 		for.
			 */
			removeCommand: function( notificationName )
			{
				if( this.hasCommand(notificationName) )
				{
					this.view.removeObserver(notificationName, this);
					delete this.commandMap[notificationName];
				}
			}
		}
	);
	
	/**
	 * @constant
	 * @type {String}
	 * @private
	 */
	Controller.SINGLETON_MSG = "Controller Singleton already constructed!";
	
	/**
	 * @type {Controller}
	 * @private
	 */
	Controller.instance = null;
	
	/**
	 * Retrieve the singleton instance of the <code>Controller</code>.
	 *
	 * @return {Controller}
	 * 		The singleton instance of the <code>Controller</code>
	 */
	Controller.getInstance = function()
	{
		if( !Controller.instance )
			Controller.instance = new Controller();
	
		return Controller.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Controller = Objs("puremvc.Controller");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Model = Objs("puremvc.Model");
	var View = Objs("puremvc.View");
	var Controller = Objs("puremvc.Controller");
	var Notification = Objs("puremvc.Notification");
	
	/**
	 * @classDescription
	 * A base singleton <code>Facade</code> implementation.
	 * 
	 * <P>
	 * In PureMVC, the <code>Facade</code> class assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Initializing the <code>Model</code>, <code>View</code>
	 * and <code>Controller</code> singletons.
	 * 
	 * <LI>Providing all the applicable methods of the <code>Model</code>,
	 * <code>View</code>, & <code>Controller</code> singletons.
	 * 
	 * <LI>Providing a single point of contact to the application for
	 * registering <code>Command</code>s and notifying <code>Observer</code>s.
	 * 
	 * <P>
	 * This <code>Facade</code> implementation is a singleton and cannot be
	 * instantiated directly, but instead calls the static singleton factory
	 * method <code>Facade.getInstance()</code>.
	 * 
	 * @see puremvc.Controller Controller
	 * @see puremvc.Model Model
	 * @see puremvc.View View
	 * @see puremvc.Notification Notification
	 * @see puremvc.Mediator Mediator
	 * @see puremvc.Proxy Proxy
	 * @see puremvc.SimpleCommand SimpleCommand
	 * @see puremvc.MacroCommand MacroCommand
	 *
	 * @constructor
	 */
	var Facade = Objs
	(
		"puremvc.Facade",
		{
			/**
			 * The <code>View</code> singleton.
			 *
			 * @type {View}
			 * @private
			 */
			view: null,
			
			/**
			 * The <code>Model</code> singleton.
			 *
			 * @type {Model}
			 * @private
			 */
			model: null,
			
			/**
			 * The <code>Controller</code> singleton.
			 *
			 * @type {Controller}
			 * @private
			 */
			controller: null,
			
			/**
			 * Initialize a <code>Facade</code> instance.
			 */
			initialize: function()
			{
				if( Facade.instance )
					throw Error( Facade.SINGLETON_MSG );
			
				this.initializeFacade();
			},
			
			/**
			 * @private
			 * Called automatically by the constructor.
			 * Initialize the Singleton <code>Facade</code> instance.
			 *
			 * <P>
			 * Override in your subclass to do any subclass specific
			 * initializations. Be sure to extend the <code>Facade</code> with the
			 * methods and properties on your implementation and call
			 * <code>Facade.initializeFacade()</code>.
			 */
			initializeFacade: function()
			{
				this.initializeModel();
				this.initializeController();
				this.initializeView();
			},
			
			/**
			 * @private
			 * Initialize the <code>Model</code>.
			 *
			 * <P>
			 * Called by the <code>initializeFacade</code> method. Override this
			 * method in your subclass of <code>Facade</code> if one or both of the
			 * following are true:
			 * 
			 * <UL>
			 * <LI>You wish to initialize a different <code>Model</code>.
			 * <LI>You have <code>Proxy</code>s to register with the
			 * <code>Model</code> that do not retrieve a reference to the
			 * <code>Facade</code> at construction time.
			 *
			 * <P>
			 * Note: This method is <i>rarely</i> overridden; in practice you are
			 * more likely to use a <code>Command</code> to create and register
			 * <code>Proxy</code>s with the <code>Model</code>, since
			 * <code>Proxy</code>s with mutable data will likely need to send 
			 * <code>Notification</code>s and thus will likely want to fetch a
			 * reference to the <code>Facade</code> during their construction.
			 */
			initializeModel: function()
			{
				if( !this.model )
					this.model = Model.getInstance();
			},
			
			/**
			 * @private
			 * Initialize the <code>Controller</code>.
			 *
			 * <P>
			 * Called by the <code>initializeFacade</code> method.
			 * Override this method in JSON Object <code>Facade</code>
			 * definition if one or both of the following are true:
			 * 
			 * <UL>
			 * <LI>You wish to initialize a different <code>Controller</code>.
			 * <LI>You have <code>Command</code>s to register with the
			 * <code>Controller</code> at startup.</code>.
			 */
			initializeController: function()
			{
				if( !this.controller )
					this.controller = Controller.getInstance();
			},
			
			/**
			 * @private
			 *
			 * Initialize the <code>View</code>.
			 *
			 * <P>
			 * Called by the <code>initializeFacade</code> method.
			 * Override this method in your subclass of <code>Facade</code>
			 * if one or both of the following are true:
			 * 
			 * <UL>
			 * <LI>You wish to initialize a different <code>IView</code>.</LI>
			 * <LI>You have <code>Observer</code>s to register with the
			 * <code>View</code></LI>
			 * </UL>
			 * 
			 * <P>
			 * Note: This method is <i>rarely</i> overridden; in practice you are
			 * more likely to use a <code>Command</code> to create and register
			 * <code>Mediator</code>s with the <code>View</code>, since
			 * <code>Mediator</code> instances will need to send
			 * <code>Notification</code>s and thus will likely want to fetch a
			 * reference to the <code>Facade</code> during their construction.
			 */
			initializeView: function()
			{
				if( !this.view )
					this.view = View.getInstance();
			},
			
			/**
			 * Register a <code>Command</code> with the <code>Controller</code> by
			 * <code>Notification</code> name.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code> to associate the
			 * 		<code>Command</code> with.
			 *
			 * @param {Function} commandClassRef
			 * 		A reference to the Class of the <code>Command</code>.
			 */
			registerCommand: function( name, commandClassRef )
			{
				this.controller.registerCommand( name, commandClassRef );
			},
			
			/**
			 * Remove a previously registered <code>Command</code> to
			 * <code>Notification</code> mapping from the <code>Controller</code>.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code> to remove the
			 * 		<code>Command</code> mapping for.
			 */
			removeCommand: function( name )
			{
				this.controller.removeCommand(name);
			},
			
			/**
			 * Check if a <code>Command</code> is registered for a given
			 * <code>Notification</code>.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code> to verify for the
			 * 		existence of a <code>Command</code> mapping for.
			 *
			 * @return {Boolean}
			 * 		A <code>Command</code> is currently registered for the given
			 * 		<i>name</i>.
			 */
			hasCommand: function( name )
			{
				return this.controller.hasCommand(name);
			},
			
			/**
			 * Register a <code>Proxy</code> with the <code>Model</code> by name.
			 *
			 * @param proxy {Proxy}
			 * 		The <code>Proxy</code> instance to be registered with the
			 * 		<code>Model</code>.
			 */
			registerProxy: function( proxy )
			{
				this.model.registerProxy(proxy);
			},
			
			/**
			 * Retrieve a <code>Proxy</code> from the <code>Model</code> by name.
			 *
			 * @param {String} proxyName
			 * 		The name of the <code>Proxy</code> to be retrieved.
			 *
			 * @return {Proxy}
			 * 		The <code>Proxy</code> instance previously registered with the
			 * 		given <i>proxyName</i>.
			 */
			retrieveProxy: function( proxyName )
			{
				return this.model.retrieveProxy(proxyName);
			},
			
			/**
			 * Remove an <code>Proxy</code> from the <code>Model</code> by name.
			 *
			 * @param {String} proxyName
			 * 		The <code>Proxy</code> to remove from the <code>Model</code>.
			 *
			 * @return {Proxy}
			 * 		The <code>Proxy</code> that was removed from the
			 * 		<code>Model</code>.
			 */
			removeProxy: function( proxyName )
			{
				return this.model.removeProxy(proxyName);
			},
			
			/**
			 * Check if a <code>Proxy</code> is registered.
			 *
			 * @param {String} proxyName
			 * 		The <code>Proxy</code> to verify the existence of a 
			 * 		registration with the <code>Model</code>.
			 *
			 * @return {Boolean}
			 * 		A <code>Proxy</code> is currently registered with the given
			 * 		<i>proxyName</i>.
			 */
			hasProxy: function( proxyName )
			{
				return this.model.hasProxy(proxyName);
			},
			
			/**
			 * Register a <code>Mediator</code> with the <code>View</code>.
			 *
			 * @param {Mediator} mediator
			 * 		A reference to the <code>Mediator</code>.
			 */
			registerMediator: function( mediator )
			{
				this.view.registerMediator(mediator);
			},
			
			/**
			 * Retrieve an <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 * 		The name of the registered <code>Mediator</code> to retrieve.
			 *
			 * @return {Mediator}
			 * 		The <code>Mediator</code> previously registered with the given
			 * 		<i>mediatorName</i>.
			 */
			retrieveMediator: function( mediatorName )
			{
				return this.view.retrieveMediator(mediatorName);
			},
			
			/**
			 * Remove an <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code> to be removed.
			 *
			 * @return {Mediator}
			 * 		The <code>Mediator</code> that was removed from the 
			 * 		<code>View</code>.
			 */
			removeMediator: function( mediatorName )
			{
				return this.view.removeMediator(mediatorName);
			},
			
			/**
			 * Check if a <code>Mediator</code> is registered or not.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code> to verify the existence
			 * 		of a registration for.
			 *
			 * @return {Boolean}
			 * 		A <code>Mediator</code> is registered with the given
			 * 		<i>mediatorName</i>.
			 */
			hasMediator: function( mediatorName )
			{
				return this.view.hasMediator(mediatorName);
			},
			
			/**
			 * Create and send a <code>Notification</code>.
			 *
			 * <P>Keeps us from having to construct new notification instances in
			 * our implementation code.
			 *
			 * @param {String} name
			 * 		The name of the notification to send.
			 *
			 * @param {Object} body
			 * 		The body of the notification to send.
			 *
			 * @param {String} type
			 * 		The type of the notification to send.
			 */
			sendNotification: function( name, body, type )
			{
				this.notifyObservers( new Notification( name, body, type ) );
			},
			
			/**
			 * Notify <code>Observer</code>s.
			 *
			 * <P>
			 * This method is left <strong>public</strong> mostly for backward
			 * compatibility, and to allow you to send custom notification classes
			 * using the <code>Facade</code>.
			 *
			 *<P>
			 * Usually you should just call <i>sendNotification</i> and pass the
			 * parameters, never having to construct the <code>Notification</code>
			 * yourself.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> to have the <code>View</code>
			 * 		notify <code>Observers</code> of.
			 */
			notifyObservers: function( note )
			{
				this.view.notifyObservers(note);
			}
		}
	);
	
	/**
	 * @private
	 * 
	 * @constant
	 * @type {String}
	 */
	Facade.SINGLETON_MSG = "Facade Singleton already constructed!";
	
	/**
	 * @private
	 * 
	 * @type {Facade}
	 */
	Facade.instance = null;
	
	/**
	 * Retrieve the singleton instance of the <code>Facade</code>.
	 * 
	 * @return {Facade}
	 * 		The singleton instance of the <code>Facade</code>.
	 */
	Facade.getInstance = function()
	{
		if( !Facade.instance )
			Facade.instance = new Facade();
	
		return Facade.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Facade = Objs("puremvc.Facade");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Facade = Objs("puremvc.Facade");
	
	/**
	 * @classDescription
	 * The Base <code>Notifier</code> class.
	 *
	 * <P>
	 * <code>MacroCommand</code>, <code>Command</code>,
	 * <code>Mediator</code> and <code>Proxy</code> all have a need to send
	 * <code>Notifications</code>.
	 * 
	 * <P>
	 * The <code>Notifier</code> base class provides a common method
	 * called <code>sendNotification</code> that relieves implementation
	 * code of the necessity to actually construct
	 * <code>Notification</code>s.
	 *
	 * <P>
	 * The <code>Notifier</code> class, which all of the above mentioned
	 * classes extend, provides an initialized reference to the
	 * <code>Facade</code> singleton, which is required by the convenience
	 * method <code>sendNotification</code>	for sending
	 * <code>Notifications</code>, but it also eases implementation as
	 * these classes have frequent <code>Facade</code> interactions and
	 * uusually require access to the facade anyway.
	 * 
	 * @see puremvc.Facade Facade
	 * 
	 * @constructor
	 */
	Objs
	(
		"puremvc.Notifier",
		{
			/**
			 * Facade of the <code>Notifier</code> object.
			 * 
			 * @type {Facade}
			 * @private
			 */
			facade: null,
			
			/**
			 * Initialize a <code>Notifier</code> instance.
			 */
			initialize: function()
			{
				this.facade = Facade.getInstance();
			},
			
			/**
			 * Create and send a <code>Notification</code>.
			 *
			 * <P>
			 * Keeps us from having to construct new <code>Notification</code>
			 * instances in our implementation code.
			 * 
			 * @param {String} name
			 * 		The name of the notification to send.
			 * 
			 * @param {Object} body
			 * 		The (optional) body of the notification.
			 *
			 * @param {String} type
			 * 		The (optional) type of the notification.
			 */
			sendNotification: function( name, body, type )
			{
				this.facade.sendNotification( name, body, type );
			}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Notifier = Objs("puremvc.Notifier");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * A base <code>Command</code> implementation.
	 * 
	 * <P>
	 * Your subclass should override the <code>execute</code> method where
	 * your business logic will handle the <code>Notification</code>.
	 *
	 * <P>
	 * As in JavaScript there isn't interfaces, <code>SimpleCommand</code> and
	 * <code>MacroCommand</code> cannot offer the guarantee to have the right
	 * signature. We could have inherited from a common <code>Command</code> class,
	 * but to avoid an unwanted complexity and to respect PureMVC implementation,
	 * this is to the developer to take care to inherit from
	 * <code>SimpleCommand</code> in its command and <code>MacroCommand</code>
	 * depending on his need.
	 * 
	 * @extends puremvc.Notifier Notifier
	 *
	 * @constructor
	 */
	Objs
	(
		"puremvc.SimpleCommand",
		"puremvc.Notifier",
		{
			/**
			 * Fulfill the use-case initiated by the given <code>Notification</code>.
			 *
			 * <P>
			 * In the Command Pattern, an application use-case typically begins with
			 * some user action, which results in a <code>Notification</code> being
			 * broadcast, which is handled by business logic in the
			 * <code>execute</code> method of an <code>Command</code>.
			 *
			 * @param {Notification} note 
			 * 		The <code>Notification</code> to handle.
			 */
			execute: function( note ){}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	SimpleCommand = Objs("puremvc.SimpleCommand");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription 
	 * A base <code>Command</code> implementation that executes other
	 * <code>Command</code>s.
	 *
	 * <P>
	 * A <code>MacroCommand</code> maintains an list of
	 * <code>Command</code> class references called <i>SubCommands</i>.
	 *
	 * <P>
	 * When <code>execute</code> is called, the <code>MacroCommand</code>
	 * instantiates and calls <code>execute</code> on each of its <i>SubCommands</i> turn.
	 * Each <i>SubCommand</i> will be passed a reference to the original
	 * <code>Notification</code> that was passed to the <code>MacroCommand</code>'s
	 * <code>execute</code> method.
	 *
	 * <P>
	 * Unlike <code>SimpleCommand</code>, your subclass should not override
	 * <code>execute</code>, but instead, should override the
	 * <code>initializeMacroCommand</code> method, calling
	 * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
	 * 
	 * <P>
	 * As in JavaScript there isn't interfaces, <code>SimpleCommand</code> and
	 * <code>MacroCommand</code> cannot offer the guarantee to have the right
	 * signature. We could have inherited from a common <code>Command</code> class,
	 * but to avoid an unwanted complexity and to respect PureMVC implementation,
	 * this is to the developer to take care to inherit from
	 * <code>SimpleCommand</code> in its command and <code>MacroCommand</code>
	 * depending on his need.
	 * 
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var MacroCommand = Objs
	(
		"puremvc.MacroCommand",
		"puremvc.Notifier",
		{
			/**
			 * An array of <code>SimpleCommands</code>
			 * or subclasses of.
			 * 
			 * @type {Array}
			 * @private
			 */
			subCommands: null,
			
			/**
			 * @override
			 *
			 * Initialize a <code>MacroCommand</code> instance.
			 */
			initialize: function()
			{
				MacroCommand.$super.initialize.call(this);
			
				this.subCommands = [];
				this.initializeMacroCommand();
			},
			
			/**
			 * Initialize the <code>MacroCommand</code>.
			 *
			 * <P>
			 * In your subclass, override this method to
			 * initialize the <code>MacroCommand</code>'s <i>subCommands</i>
			 * list with <code>Command</code> class references like
			 * this:
			 *
			 * <pre>
			 *    // Initialize MyMacroCommand
			 *    initializeMacroCommand: function()
			 *    {
			 *    	this.addSubCommand(FirstCommand);
			 *      this.addSubCommand(SecondCommand);
			 *      this.addSubCommand(ThirdCommand);
			 *    }
			 * </pre>
			 *
			 * <P>
			 * Note that <i>subCommands</i> may be any <code>Command</code>
			 * implementor.
			 *
			 * <P>
			 * In the JavaScript version it means that it only needs to
			 * implement an execute method and inherits from Notifier.
			 */
			initializeMacroCommand: function()
			{
			},
			
			/**
			 * Add an entry to <i>subCommands</i> list.
			 *
			 * <P>
			 * The <i>subCommands</i> will be called in First In/First Out (FIFO)
			 * order.
			 *
			 * @param {Function} commandClassRef
			 * 		A reference to the constructor of the <code>Command</code>.
			 */
			addSubCommand: function( commandClassRef )
			{
				this.subCommands.push( commandClassRef );
			},
			
			/**
			 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
			 *
			 * <P>
			 * The <i>subCommands</i> will be called in First In/First Out (FIFO)
			 * order.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> object to be passed to each entry
			 * 		of <i>subCommands</i> list.
			 */
			execute: function( note )
			{
				var len/*Number*/ = this.subCommands.length;
				for( var i/*Number*/=0; i<len; i++ )
				{
					var commandClassRef/*Function*/ = this.subCommands[i];
					var commandInstance/*Command*/ = new commandClassRef();
					commandInstance.execute( note );
				}
			}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	MacroCommand = Objs("puremvc.MacroCommand");
/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * <P>A base <code>Mediator</code> implementation.
	 * 
	 * <P>
	 * Typically, a <code>Mediator</code> will be written to serve one specific
	 * control or group controls and so, will not have a need to be dynamically
	 * named.
	 * 
	 * @see puremvc.Notification Notification
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var Mediator = Objs
	(
		"puremvc.Mediator",
		"puremvc.Notifier",
		{
			/**
			 * The name of the <code>Mediator</code>.
			 * 
			 * @type {String}
			 * @private
			 */
			mediatorName: null,
			
			/**
			 * The <code>Mediator</code>'s view component.
			 * 
			 * @type {Object}
			 * @private
			 */
			viewComponent: null,
			
			/**
			 * @override
			 *
			 * Initialize a <code>Mediator</code> instance.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code>.
			 *
			 * @param {Object} viewComponent
			 * 		The <code>Mediator</code>'s view component.
			 *
			 */
			initialize: function( mediatorName, viewComponent )
			{
				Mediator.$super.initialize.call(this);
			
				this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
				this.viewComponent = viewComponent;
			},
			
			/**
			 * List the <code>Notification</code> names this
			 * <code>Mediator</code> is interested in being notified of.
			 *
			 * @return {Array}
			 * 		The list of notifications names in which is interested the
			 * 		<code>Mediator</code>.
			 */
			listNotificationInterests: function()
			{
				return [];
			},
			
			/**
			 * Get the name of the <code>Mediator</code>.
			 *
			 * @return {String}
			 * 		The <code>Mediator</code> name.
			 */
			getMediatorName: function()
			{
				return this.mediatorName;
			},
			
			/**
			 * Get the <code>Mediator</code>'s view component.
			 *
			 * @return {Object}
			 * 		The view component.
			 */
			getViewComponent: function()
			{
				return this.viewComponent;
			},
			
			/**
			 * Set the <code>Mediator</code>'s view component.
			 *
			 * @param {Object} viewComponent
			 * 		The view component.
			 */
			setViewComponent: function( viewComponent )
			{
				this.viewComponent = viewComponent;
			},
			
			/**
			 * Handle <code>Notification</code>s.
			 *
			 * <P>
			 * Typically this will be handled in a switch statement,
			 * with one 'case' entry per <code>Notification</code>
			 * the <code>Mediator</code> is interested in.
			 *
			 * @param {Notification} note
			 * 		The notification instance to be handled.
			 */
			handleNotification: function( note ){},
			
			/**
			 * Called by the View when the Mediator is registered.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRegister: function(){},
			
			/**
			 * Called by the View when the Mediator is removed.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRemove: function(){}
		}
	);
	
	/**
	 * Default name of the <code>Mediator</code>.
	 * 
	 * @type {String}
	 * @constant
	 */
	Mediator.NAME = "Mediator";
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Mediator = Objs("puremvc.Mediator");
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
