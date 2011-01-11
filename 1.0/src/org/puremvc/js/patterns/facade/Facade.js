/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base Singleton <code>IFacade</code> implementation.
*
* <P>
* In PureMVC, the <code>Facade</code> class assumes these
* responsibilities:
* <UL>
* <LI>Initializing the <code>Model</code>, <code>View</code>
* and <code>Controller</code> Singletons.</LI>
* <LI>Providing all the methods defined by the <code>IModel,
* IView, & IController</code> interfaces.</LI>
* <LI>Providing the ability to override the specific <code>Model</code>,
* <code>View</code> and <code>Controller</code> Singletons created.</LI>
* <LI>Providing a single point of contact to the application for
* registering <code>Commands</code> and notifying <code>Observers</code></LI>
* </UL>
* <P>
* Example usage:
* <listing>
*   var View = Objs.load("org.puremvc.js.patterns.facade.&lowast;
*
*   var View = Objs.load("com.me.myapp.model.~~
*   var View = Objs.load("com.me.myapp.view.~~
*   var View = Objs.load("com.me.myapp.controller.~~
*
*   public class MyFacade extends Facade
*   {
*       // Notification constants. The Facade is the ideal
*       // location for these constants, since any part
*       // of the application participating in PureMVC
*       // Observer Notification will know the Facade.
*       public static const GO_COMMAND:String = "go";
*
*       // Override Singleton Factory method
o.getInstance():MyFacade {
*           if(instance == null) instance = new MyFacade();
*           return instance as MyFacade;
*       }
*
*       // optional initialization hook for Facade
o.initializeFacade = function():void
{
*           super.initializeFacade();
*           // do any special subclass initialization here
*       }
*
*       // optional initialization hook for Controller
o.initializeController = function():void
{
*           // call super to use the PureMVC Controller Singleton.
*           super.initializeController();
*
*           // Otherwise, if you're implmenting your own
*           // IController, then instead do:
*           // if( controller != null ) return;
*           // controller = MyAppController.getInstance();
*
*           // do any special subclass initialization here
*           // such as registering Commands
*           registerCommand( GO_COMMAND, com.me.myapp.controller.GoCommand )
*       }
*
*       // optional initialization hook for Model
o.initializeModel = function():void
{
*           // call super to use the PureMVC Model Singleton.
*           super.initializeModel();
*
*           // Otherwise, if you're implmenting your own
*           // IModel, then instead do:
*           // if( model != null ) return;
*           // model = MyAppModel.getInstance();
*
*           // do any special subclass initialization here
*           // such as creating and registering Model proxys
*           // that don't require a facade reference at
*           // construction time, such as fixed type lists
*           // that never need to send Notifications.
*           regsiterProxy( new USStateNamesProxy() );
*
*           // CAREFUL:Can't reference Facade instance in constructor
*           // of new Proxys from here, since this step is part of
*           // Facade construction!  Usually, Proxys needing to send
*           // notifications are registered elsewhere in the app
*           // for this reason.
*       }
*
*       // optional initialization hook for View
o.initializeView = function):void
{
*           // call super to use the PureMVC View Singleton.
*           super.initializeView();
*
*           // Otherwise, if you're implmenting your own
*           // IView, then instead do:
*           // if( this._view != null ) return;
*           // this._view = MyAppView.getInstance();
*
*           // do any special subclass initialization here
*           // such as creating and registering Mediators
*           // that do not need a Facade reference at construction
*           // time.
*           registerMediator( new LoginMediator() );
*
*           // CAREFUL:Can't reference Facade instance in constructor
*           // of new Mediators from here, since this is a step
*           // in Facade construction! Usually, all Mediators need
*           // receive notifications, and are registered elsewhere in
*           // the app for this reason.
*       }
*   }
* </listing>
*
* @see org.puremvc.js.core.model.Model Model
* @see org.puremvc.js.core.view.View View
* @see org.puremvc.js.core.controller.Controller Controller
* @see org.puremvc.js.patterns.observer.Notification Notification
* @see org.puremvc.js.patterns.mediator.Mediator Mediator
* @see org.puremvc.js.patterns.proxy.Proxy Proxy
* @see org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
* @see org.puremvc.js.patterns.command.MacroCommand MacroCommand
*/
function class_org_puremvc_js_patterns_facade_Facade()
{
	Objs.register("org.puremvc.js.patterns.facade.Facade",Facade);

	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var IController = Objs.load("org.puremvc.js.interfaces.IController");
	var IModel = Objs.load("org.puremvc.js.interfaces.IModel");
	var IView = Objs.load("org.puremvc.js.interfaces.IView");

	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var Model = Objs.load("org.puremvc.js.core.Model");
	var View = Objs.load("org.puremvc.js.core.View");
	var Controller = Objs.load("org.puremvc.js.core.Controller");

	/**
	 * Constructor.
	 *
	 * <P>
	 * This <code>IFacade</code> implementation is a Singleton,
	 * so you should not call the constructor
	 * directly, but instead call the static Singleton
	 * Factory method <code>Facade.getInstance()</code>
	 *
	 * @throws Error Error if Singleton instance has already been constructed
	 *
	 */
	function Facade()
	{
		if(Objs.extending) return;

		if(Facade._instance != null)
			throw Error(Facade._SINGLETON_MSG);

		//Facade._instance = this;
		this._initializeFacade();
	}

	/**
	 * <code>Facade</code> implements <code>IFacade</code>
	 */
	Objs.implement(Facade,IFacade);

	var o = Facade.prototype;

	/**
	 * Private references to Model, View and Controller
	 */
	o._controller/*IController*/ = null;
	o._model/*IModel*/ = null;
	o._view/*IView*/ = null;

	/**
	 * The Singleton Facade instance.
	 */
	Facade._instance/*IFacade*/ = null;

	/* Message Constants */
	Facade._SINGLETON_MSG/*String*/ = "Facade Singleton already constructed!";

	/**
	 * Initialize the Singleton <code>Facade</code> instance.
	 *
	 * <P>
	 * Called automatically by the constructor. Override in your
	 * subclass to do any subclass specific initializations. Be
	 * sure to call <code>super.initializeFacade()</code>, though.</P>
	 */
	o._initializeFacade = function()
	{
		this._initializeModel();
		this._initializeController();
		this._initializeView();
	}

	/**
	 * Facade Singleton Factory method
	 *
	 * @return the Singleton instance of the Facade
	 */
	Facade.getInstance = function()/*IFacade*/
	{
		if(Facade._instance == null)
			Facade._instance = new Facade();

		return Facade._instance;
	}

	/**
	 * Initialize the <code>Controller</code>.
	 *
	 * <P>
	 * Called by the <code>initializeFacade</code> method.
	 * Override this method in your subclass of <code>Facade</code>
	 * if one or both of the following are true:
	 * <UL>
	 * <LI> You wish to initialize a different <code>IController</code>.</LI>
	 * <LI> You have <code>Commands</code> to register with the <code>Controller</code> at startup.</code>. </LI>
	 * </UL>
	 * If you don't want to initialize a different <code>IController</code>,
	 * call <code>super.initializeController()</code> at the beginning of your
	 * method, then register <code>Command</code>s.
	 * </P>
	 */
	o._initializeController = function()
	{
		if( this._controller != null )
			return;

		this._controller = Controller.getInstance();
	}

	/**
	 * Initialize the <code>Model</code>.
	 *
	 * <P>
	 * Called by the <code>initializeFacade</code> method.
	 * Override this method in your subclass of <code>Facade</code>
	 * if one or both of the following are true:
	 * <UL>
	 * <LI> You wish to initialize a different <code>IModel</code>.</LI>
	 * <LI> You have <code>Proxy</code>s to register with the Model that do not
	 * retrieve a reference to the Facade at construction time.</code></LI>
	 * </UL>
	 * If you don't want to initialize a different <code>IModel</code>,
	 * call <code>super.initializeModel()</code> at the beginning of your
	 * method, then register <code>Proxy</code>s.
	 * <P>
	 * Note:This method is <i>rarely</i> overridden; in practice you are more
	 * likely to use a <code>Command</code> to create and register <code>Proxy</code>s
	 * with the <code>Model</code>, since <code>Proxy</code>s with mutable data will likely
	 * need to send <code>INotification</code>s and thus will likely want to fetch a reference to
	 * the <code>Facade</code> during their construction.
	 * </P>
	 */
	o._initializeModel = function()
	{
		if( this._model != null )
			return;

		this._model = Model.getInstance();
	}


	/**
	 * Initialize the <code>View</code>.
	 *
	 * <P>
	 * Called by the <code>initializeFacade</code> method.
	 * Override this method in your subclass of <code>Facade</code>
	 * if one or both of the following are true:
	 * <UL>
	 * <LI> You wish to initialize a different <code>IView</code>.</LI>
	 * <LI> You have <code>Observers</code> to register with the <code>View</code></LI>
	 * </UL>
	 * If you don't want to initialize a different <code>IView</code>,
	 * call <code>super.initializeView()</code> at the beginning of your
	 * method, then register <code>IMediator</code> instances.
	 * <P>
	 * Note:This method is <i>rarely</i> overridden; in practice you are more
	 * likely to use a <code>Command</code> to create and register <code>Mediator</code>s
	 * with the <code>View</code>, since <code>IMediator</code> instances will need to send
	 * <code>INotification</code>s and thus will likely want to fetch a reference
	 * to the <code>Facade</code> during their construction.
	 * </P>
	 */
	o._initializeView = function()
	{
		if( this._view != null )
			return;

		this._view = View.getInstance();
	}

	/**
	 * Register an <code>ICommand</code> with the <code>Controller</code> by Notification name.
	 *
	 * @param notificationName the name of the <code>INotification</code> to associate the <code>ICommand</code> with
	 * @param commandClassRef a reference to the constructor of the Class of the <code>ICommand</code>
	 */
	o.registerCommand = function( notificationName/*String*/, commandClassRef/*Function*/ )
	{
		this._controller.registerCommand( notificationName, commandClassRef );
	}

	/**
	 * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping from the Controller.
	 *
	 * @param notificationName the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
	 */
	o.removeCommand = function( notificationName/*String*/ )
	{
		this._controller.removeCommand( notificationName );
	}

	/**
	 * Check if a Command is registered for a given Notification
	 *
	 * @param notificationName
	 * @return whether a Command is currently registered for the given <code>notificationName</code>.
	 */
	o.hasCommand = function( notificationName/*String*/ )/*Boolean*/
	{
		return this._controller.hasCommand(notificationName);
	}

	/**
	 * Register an <code>IProxy</code> with the <code>Model</code> by name.
	 *
	 * @param proxy the <code>IProxy</code> instance to be registered with the <code>Model</code>.
	 */
	o.registerProxy = function( proxy/*IProxy*/ )
	{
		this._model.registerProxy( proxy );
	}

	/**
	 * Retrieve an <code>IProxy</code> from the <code>Model</code> by name.
	 *
	 * @param proxyName the name of the proxy to be retrieved.
	 * @return the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
	 */
	o.retrieveProxy = function( proxyName/*String*/ )/*IProxy*/
	{
		return this._model.retrieveProxy( proxyName );
	}

	/**
	 * Remove an <code>IProxy</code> from the <code>Model</code> by name.
	 *
	 * @param proxyName the <code>IProxy</code> to remove from the <code>Model</code>.
	 * @return the <code>IProxy</code> that was removed from the <code>Model</code>
	 */
	o.removeProxy = function( proxyName/*String*/ )/*IProxy*/
	{
		var proxy/*IProxy*/;
		if( this._model != null )
			proxy = this._model.removeProxy( proxyName );

		return proxy
	}

	/**
	 * Check if a Proxy is registered
	 *
	 * @param proxyName
	 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
	 */
	o.hasProxy = function( proxyName/*String*/ )/*Boolean*/
	{
		return this._model.hasProxy( proxyName );
	}

	/**
	 * Register a <code>IMediator</code> with the <code>View</code>.
	 *
	 * @param mediator a reference to the <code>IMediator</code>
	 */
	o.registerMediator = function( mediator/*IMediator*/ )
	{
		if( this._view != null )
			this._view.registerMediator( mediator );
	}

	/**
	 * Retrieve an <code>IMediator</code> from the <code>View</code>.
	 *
	 * @param mediatorName
	 * @return the <code>IMediator</code> previously registered with the given <code>mediatorName</code>.
	 */
	o.retrieveMediator = function( mediatorName/*String*/ )/*IMediator*/
	{
		return this._view.retrieveMediator( mediatorName );
	}

	/**
	 * Remove an <code>IMediator</code> from the <code>View</code>.
	 *
	 * @param mediatorName name of the <code>IMediator</code> to be removed.
	 * @return the <code>IMediator</code> that was removed from the <code>View</code>
	 */
	o.removeMediator = function( mediatorName/*String*/ )/*IMediator*/
	{
		var mediator/*IMediator*/;
		if( this._view != null )
			mediator = this._view.removeMediator( mediatorName );

		return mediator;
	}

	/**
	 * Check if a Mediator is registered or not
	 *
	 * @param mediatorName
	 * @return whether a Mediator is registered with the given <code>mediatorName</code>.
	 */
	o.hasMediator = function( mediatorName/*String*/ )/*Boolean*/
	{
		return this._view.hasMediator( mediatorName );
	}

	/**
	 * Create and send an <code>INotification</code>.
	 *
	 * <P>
	 * Keeps us from having to construct new notification
	 * instances in our implementation code.
	 * @param notificationName the name of the notiification to send
	 * @param body the body of the notification (optional)
	 * @param type the type of the notification (optional)
	 */
	o.sendNotification = function( notificationName/*String*/, body/*Object*/, type/*String*/ )
	{
		this.notifyObservers( new Notification( notificationName, body, type ) );
	}

	/**
	 * Notify <code>Observer</code>s.
	 * <P>
	 * This method is left public mostly for backward
	 * compatibility, and to allow you to send custom
	 * notification classes using the facade.</P>
	 *<P>
	 * Usually you should just call sendNotification
	 * and pass the parameters, never having to
	 * construct the notification yourself.</P>
	 *
	 * @param notification the <code>INotification</code> to have the <code>View</code> notify <code>Observers</code> of.
	 */
	o.notifyObservers = function( notification/*INotification*/ )
	{
		if(this._view != null)
			this._view.notifyObservers( notification );
	}
}