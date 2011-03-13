/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A base singleton <code>Facade</code> implementation.
 * 
 * <P>In PureMVC, the <code>Facade</code> class assumes these responsibilities:
 * 
 * <UL>
 * 
 * <LI>Initializing the <code>Model</code>, <code>View</code>
 * and <code>Controller</code> singletons.
 * <LI>Providing all the applicable methods of the <code>Model</code>,
 * <code>View</code>, & <code>Controller</code> singletons.
 * <LI>Providing a single point of contact to the application for
 * registering <code>Command</code>s and notifying <code>Observer</code>s.
 * 
 * <P>This <code>Facade</code> implementation is a singleton
 * and cannot be instantiated directly, but instead calls the static singleton
 * factory method <code>Facade.getInstance()</code>.
 * 
 * @see org.puremvc.js.prototypejs.core.Controller Controller
 * @see org.puremvc.js.prototypejs.core.Model Model
 * @see org.puremvc.js.prototypejs.core.View View
 * @see org.puremvc.js.prototypejs.patterns.observer.Notification Notification
 * @see org.puremvc.js.prototypejs.patterns.mediator.Mediator Mediator
 * @see org.puremvc.js.prototypejs.patterns.proxy.Proxy Proxy
 * @see org.puremvc.js.prototypejs.patterns.command.SimpleCommand SimpleCommand
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommand MacroCommand
 *
 * @constructor
 */
var Facade = Class.create
(
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
		 * Initialize the <code>View</code>.
		 *
		 * <P>
		 * Called by the <code>initializeFacade</code> method.
		 * Override this method in your subclass of <code>Facade</code>
		 * if one or both of the following are true:
		 * 
		 * <UL>
		 * <LI>You wish to initialize a different <code>View</code>.</LI>
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
		 * 		A reference to the constructor of the <code>Command</code>.
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
		removeCommand: function(name )
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
 * @constant
 * @type {String}
 * @private
 */
Facade.SINGLETON_MSG = "Facade Singleton already constructed!";

/**
 * @type {Facade}
 * @private
 */
Facade.instance = null;

/**
 * Retrieve the singleton instance of the <code>Facade</code>.
 * 
 * @return {Model}
 * 		The singleton instance of the <code>Facade</code>.
 */
Facade.getInstance = function()
{
	if( !Facade.instance )
		Facade.instance = new Facade();

	return Facade.instance;
}