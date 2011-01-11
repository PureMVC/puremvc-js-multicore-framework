/**
 * @fileoverview This file contains the required classes for the
 * {@link http://trac.puremvc.org/PureMVC_JS/ PureMVC Javascript Port}
 * @author Justin Wilaby jwilaby@gmail.com
 * @version 1.0
 */

/**
 * @misc
 * In PureMVC, the <code>Model</code> class provides
 * access to model objects (Proxies) by named lookup.
 * 
 * @class A Singleton <code>Model</code> implementation in the form
 * of a JSON object.
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
 * with the <code>Model</code>. Typically, you use an
 * <code>SimpleCommand</code> to create and register <code>Proxy</code>
 * instances once the <code>Facade</code> has initialized the Core
 * actors.</p>
 *
 * @see Proxy
 * @author Justin Wilaby
 */
var Model = function(){

    /**
     * @ignore
     * Constructor for MooTools Class creation
     */
    this.initialize = function()
    {
	this.initializeModel();
    };
    /**
     * HashTable of <code>Proxy</code> instances
     * registered with the <code>Model</code>
     * @type Object
     */
    this.proxyMap = {};

    /**
     * Register an <code>Proxy</code> with the <code>Model</code>.
     *
     * @param {Proxy} proxy a <code>Proxy</code> to be held by the <code>Model</code>.
     */
    this.registerProxy = function(proxy /* Proxy */)
    {
	this.proxyMap[proxy.getProxyName()] = proxy;
	proxy.onRegister();
    };

    /**
     * Retrieve an <code>IProxy</code> from the <code>Model</code>.
     *
     * @param {String} proxyName The name of the <code>Proxy</code> to retrieve.
     * @returns {Proxy} The the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
     */
    this.retrieveProxy = function(proxyName /* String */)
    {
	return this.proxyMap[proxyName];
    };

    /**
     * Check if a Proxy is registered
     *
     * @param {String} proxyName
     * @returns {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
     */
    this.hasProxy = function(proxyName /* String */)
    {
	return this.proxyMap[proxyName] != null;
    };

    /**
     * Remove an <code>Proxy</code> from the <code>Model</code>.
     *
     * @param {String} proxyName The name of the <code>Proxy</code> instance to be removed.
     * @returns {Proxy} the <code>Proxy</code> that was removed from the <code>Model</code>
     */
    this.removeProxy = function(proxyName /* String */)
    {
	var proxy = this.proxyMap[proxyName];
	if (proxy)
	{
	    delete this.proxyMap[proxyName];
	    proxy.onRemove();
	}
	return proxy;
    };

    /**
     * @ignore
     * Omitted 
     */
    this.initializeModel = function()
    {

    };
};
/**
 * Singleton implementation for the <code>Model</code>
 * @return {Model} the Singleton instance of the <code>Model</code>
 */
Model.getInstance = function()
{
    if (Model.instance == undefined)
    {
	var classFactory = new Class(new Model());
	Model.instance = new classFactory();
    }
    return Model.instance;
};
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------

/**
* @misc
* The View class in PureMVC.
* 
* @class A Singleton <code>View</code> implementation.
* In PureMVC, the <code>View</code> class assumes these responsibilities:
* <UL>
* <LI>Maintain a cache of <code>Mediator</code> instances.</LI>
* <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.</LI>
* <LI>Notifiying <code>Mediators</code> when they are registered or removed.</LI>
* <LI>Managing the observer lists for each <code>Notification</code> in the application.</LI>
* <LI>Providing a method for attaching <code>Observers</code> to an <code>INotification</code>'s observer list.</LI>
* <LI>Providing a method for broadcasting an <code>Notification</code>.</LI>
* <LI>Notifying the <code>Observers</code> of a given <code>Notification</code> when it broadcast.</LI>
* </UL>
*
* @see Mediator
* @see Observer
* @see Notification
* @author Justin Wilaby
*/
var View = function(){

    /**
     * Mapping of <code>Mediator</code> names to
     * <code>Mediator</code> instances
     * @type Object
     */
    this.mediatorMap = {};
    /**
     * Mapping of <code>Notification</code> names to
     * <code>Observers</code> lists
     * @type Object
     */
    this.observerMap = {};

    /**
    * Register an <code>Observer</code> to be notified
    * of <code>Notifications</code> with a given name.
    *
    * @param {String} notificationName The name of the <code>Notifications</code> to notify this <code>Observer</code> of
    * @param {Observer} observer The <code>Observer</code> to register.
    */
    this.registerObserver = function(notificationName /* String */, observer /* Observer */)
    {
	var observers = this.observerMap[notificationName];
	if (observers)
	    observers.push(observer);
	else
	    this.observerMap[notificationName] = [observer];
    };

    /**
    * Notify the <code>Observers</code> for a particular <code>Notification</code>.
    *
    * <P>
    * All previously attached <code>Observers</code> for this <code>Notification</code>'s
    * list are notified and are passed a reference to the <code>Notification</code> in
    * the order in which they were registered.</P>
    *
    * @param {Notification} notification The <code>Notification</code> to notify <code>Observers</code> of.
    */
    this.notifyObservers = function(notification /* Notification*/)
    {
	var name = notification.getName();
	if (this.observerMap[name] == null)
	    return;
	// Copy the array
	var observers = this.observerMap[name].concat();
	var len = observers.length;
	for (var i = 0; i < len; i++)
	{
	    var observer = observers[i];
	    observer.notifyObserver(notification);
	}
    };

    /**
    * Remove the observer for a given notifyContext from an observer list for a given Notification name.
    * <P>
    * @param {String} notificationName which observer list to remove from
    * @param {Object} notifyContext remove the observer with this object as its notifyContext
    */
    this.removeObserver = function(notificationName /* String */, notifyContext /* Object */)
    {
	var observers = this.observerMap[notificationName];
	var i = observers.length;
	while(i--)
	{
	    var observer = observers[i];
	    if (observer.compareNotifyContext(notifyContext))
	    {
		observers.splice(i, 1);
		break;
	    }
	}
	// Remove empty observer lists.
	if (!observers.length)
	    delete this.observerMap[notificationName];
    };

    /**
    * Register an <code>IMediator</code> instance with the <code>View</code>.
    *
    * <P>
    * Registers the <code>IMediator</code> so that it can be retrieved by name,
    * and further interrogates the <code>IMediator</code> for its
    * <code>INotification</code> interests.</P>
    * <P>
    * If the <code>IMediator</code> returns any <code>INotification</code>
    * names to be notified about, an <code>Observer</code> is created encapsulating
    * the <code>IMediator</code> instance's <code>handleNotification</code> method
    * and registering it as an <code>Observer</code> for all <code>INotifications</code> the
    * <code>IMediator</code> is interested in.</p>
    *
    * @param {Mediator} mediator a reference to the <code>Mediator</code> instance
    */
    this.registerMediator = function(mediator /* Mediator */)
    {
	var name = mediator.getMediatorName();
	if (this.mediatorMap[name])
	    return;
	this.mediatorMap[name] = mediator;
	var interests = mediator.listNotificationInterests();
	var len = interests.length;
	if (len)
	{
	    var observer = new Observer(mediator.handleNotification, mediator);
	    for (var i = 0; i < len; i++)
		this.registerObserver(interests[i], observer);
	}
	mediator.onRegister();
    };

    /**
    * Retrieve a <code>Mediator</code> from the <code>View</code>.
    *
    * @param {String} mediatorName the name of the <code>IMediator</code> instance to retrieve.
    * @return {Mediator} the <code>Mediator</code> instance previously registered with the given <code>mediatorName</code>.
    */
    this.retrieveMediator = function(mediatorName /* String */)
    {
	return this.mediatorMap[mediatorName];
    };

    /**
    * Remove an <code>Mediator</code> from the <code>View</code>.
    *
    * @param {String} mediatorName name of the <code>IMediator</code> instance to be removed.
    * @return {Mediator} the <code>Mediator</code> that was removed from the <code>View</code>
    */
    this.removeMediator = function(mediatorName /* String */)
    {
	var mediator = this.mediatorMap[mediatorName];
	if (mediator)
	{
	    var interests = mediator.listNotificationInterests();
	    var i = interests.length;
	    while(i--)
		this.removeObserver(interests[i], mediator);

	    delete this.mediatorMap[mediatorName];
	    mediator.onRemove();
	}
	return mediator;
    };

    /**
    * Check if a Mediator is registered or not
    *
    * @param {String} mediatorName
    * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
    */
    this.hasMediator = function(mediatorName /* String */)
    {
	return this.mediatorMap[mediatorName] != null;
    };
};
/**
 * Singleton implementation for the <code>View</code>
 * @return {View} the Singleton instance of the <code>View</code>
 */
View.getInstance = function()
{
    if (View.instance == undefined)
    {
	var classFactory = new Class(new View());
	View.instance = new classFactory();
    }
    return View.instance;
};
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------

/**
* @misc
* The Controller class for PureMVC
* @class A Singleton <code>Controller</code> implementation.
* <P>
* In PureMVC, the <code>Controller</code> class follows the
* 'Command and Controller' strategy, and assumes these
* responsibilities:
* <UL>
* <LI> Remembering which <code>SimpleCommand</code>s
* or <code>MacroCommand</code>s
* are intended to handle which <code>Notifications</code>.</LI>
* <LI> Registering itself as an <code>Observer</code> with
* the <code>View</code> for each <code>Notification</code>
* that it has a <code>SimpleCommand</code>
* or <code>MacroCommand</code>  mapping for.</LI>
* <LI> Creating a new instance of the proper <code>SimpleCommand</code>
* or <code>MacroCommand</code>
* to handle a given <code>Notification</code> when notified by the <code>View</code>.</LI>
* <LI> Calling the <code>SimpleCommand</code>'s
* or <code>MacroCommand</code>'s  <code>execute</code>
* method, passing in the <code>Notification</code>.</LI>
* </UL>
*
* <P>
* Your application must register <code>ICommands</code> with the
* Controller.
* <P>
* The simplest way is to subclass </code>Facade</code>,
* and use its <code>initializeController</code> method to add your
* registrations.
*
* @see View
* @see Observer
* @see Notification
* @see SimpleCommand
* @see MacroCommand
* @author Justin Wilaby
*/
var Controller = function(){

    /**
     * The <code>View</code> singleton
     * @type View
     */
    this.view = null;

    /**
     * Mapping of <code>Notification<code> names to
     * <code>Command</code> Mootools <code>Class</code> references
     * @type Object
     */
    this.commandMap = {};

    /**
     * @ignore
     * MooTools Class constructor function.
     */
    this.initialize = function()
    {
	 this.initializeController();
    };

    /**
     * Called automatically by the constructor.
     * Retains a reference to the <code>View</code> singleton
     */
    this.initializeController = function()
    {
	this.view = View.getInstance();
    };
    /**
    * If an <code>SimpleCommand</code> or <code>MacroCommand</code>
    * has previously been registered to handle a the given
    * <code>Notification</code>, then it is executed.
    *
    * @param {Notification} note a <code>Notification</code>
    */
    this.executeCommand = function(note /* Notification */)
    {
	var commandClassRef = this.commandMap[note.getName()];
	if (!commandClassRef)
	    return;
	var command = new commandClassRef();
	command.execute(note);
    };

    /**
    * Register a particular <code>SimpleCommand</code> or
    * <code>MacroCommand</code> class as the handler
    * for a particular <code>Notification</code>.
    *
    * <P>
    * If an <code>Command</code> has already been registered to
    * handle <code>Notification</code>s with this name, it is no longer
    * used, the new <code>Command</code> is used instead.</P>
    *
    * The Observer for the new Command is only created if this the
    * first time an Command has been regisered for this Notification name.
    *
    * @param notificationName the name of the <code>Notification</code>
    * @param commandClassRef the <code>Class</code> of the <code>Command</code>
    */
    this.registerCommand = function(notificationName /* String */, commandClassRef /* Class */)
    {
	if (!this.commandMap[notificationName])
	    this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
	this.commandMap[notificationName] = commandClassRef;
    };

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {String} notificationName
     * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
     */
    this.hasCommand = function(notificationName /* String */)
    {
	return this.commandMap[notificationName] != null;
    };

    /**
     * Remove a previously registered <code>SimpleCommand</code>
     * or <code>MacroCommand</code> to <code>Notification</code> mapping.
     *
     * @param {String} notificationName the name of the <code>Notification</code> to remove the
     * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for
     */
    this.removeCommand = function(notificationName /* String */)
    {
	if (!this.hasCommand(notificationName))
	    return;
	this.view.removeObserver(notificationName, this);
	delete this.commandMap[notificationName];
    };
};
/**
 * Singleton implementation for the <code>Controller</code>
 * @return {Controller} the Singleton instance of the <code>Controller</code>
 */
Controller.getInstance = function()
{
    if (Controller.instance == undefined)
    {
	var classFactory = new Class(new Controller());
	Controller.instance = new classFactory();
    }
    return Controller.instance;
};
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------

/**
 * @misc
 * @class The Base <code>Notifier</code> implementation.
 * <P>
 * <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
 * all have a need to send <code>Notifications</code>. <P>
 * <P>
 * The <code>Notifier</code> base class provides a common method called
 * <code>sendNotification</code> that relieves implementation code of
 * the necessity to actually construct <code>Notifications</code>.</P>
 *
 * <P>
 * The <code>Notifier</code> class, which all of the above mentioned classes
 * extend, provides an initialized reference to the <code>Facade</code>
 * Singleton, which is required for the convienience method
 * for sending <code>Notifications</code>, but also eases implementation as these
 * classes have frequent <code>Facade</code> interactions and usually require
 * access to the facade anyway.</P>
 *
 * @see Facade
 * @see Mediator
 * @see Proxy
 * @see SimpleCommand
 * @see MacroCommand
 * @author Justin Wilaby
 */
var Notifier = function(){

    /**
    * The <code>Facade</code> Singleton
    * @type Facade
    */
    this.facade = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.facade = Facade.getInstance();
    };

    /**
     * Create and send a <code>Notification</code>.
     *
     * <P>
     * Keeps us from having to construct new Notification
     * instances in our implementation code.
     * @param {String} notificationName the name of the notiification to send
     * @param {Object} [body] the body of the notification
     * @param {String} [type] the type of the notification
     */
    this.sendNotification = function(notificationName /* String */, body /* Object */, type /* String */)
    {
	this.facade.sendNotification(notificationName, body, type);
    };
};
Notifier = new Class(new Notifier());
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base <code>Mediator</code> implementation.
 * <P>
 * Typically, a <code>Mediator</code> will be written to serve
 * one specific control or group controls and so,
 * will not have a need to be dynamically named.</P>
 * Typically, a <code>Mediator</code> will be written to serve
 * one specific control or group controls and so,
 * will not have a need to be dynamically named.</P>
 * @extends Notifier
 * @param {String} mediatorName the name of the Mediator.
 * @param {Object} viewComponent The <code>Mediator</code>'s view component.
 * @author Justin Wilaby
 */
var Mediator = function(mediatorName /* String */, viewComponent /* Object */){
    this.Extends = Notifier;

    /**
     * The name of the <code>Mediator</code> subclass
     * @type String
     */
    this.mediatorName = null;
    /**
     * The vewComponet instance to mediate
     * @type Object
     */
    this.viewComponent = null;
    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(mediatorName /* String */, viewComponent /* Object */)
    {
	this.parent();
	this.mediatorName = mediatorName || Mediator.NAME;
	this.viewComponent = viewComponent;
    };
    
    /**
     * List the <code>Notification</code> names this
     * <code>Mediator</code> is interested in being notified of.
     *
     * @return {Notification[]} the list of <code>Notification</code> names
     */
    this.listNotificationInterests = function()
    {
	return [];
    };

    /**
     * Get the name of the <code>Mediator</code>.
     * 
     * @return {String} The Mediator name.
     */
    this.getMediatorName = function()
    {
	return this.mediatorName;
    };

    /**
     * Get the <code>Mediator</code>'s view component.
     *
     * @return {Object} the view component
     */
    this.getViewComponent = function()
    {
	return this.viewComponent;
    };

    /**
     * Set the <code>Mediator</code>'s view component.
     *
     * @param {Object} viewComponent The view component.
     */
    this.setViewComponent = function(viewComponent /* Object */)
    {
	this.viewComponent = viewComponent;
    };

    /**
     * Handle <code>INotification</code>s.
     *
     * <P>
     * Typically this will be handled in a switch statement,
     * with one 'case' entry per <code>Notification</code>
     * the <code>Mediator</code> is interested in.
     * @param {Notification} notification The notification instance to be handled.
     */
    this.handleNotification = function(notification /* Notification */){};

    /**
     * Called by the View when the Mediator is registered.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRegister = function(){};

    /**
     * Called by the View when the Mediator is removed.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRemove = function(){};
};
Mediator = new Class(new Mediator());
/**
 * Default name of the <code>Mediator</code>
 * @type String
 */
Mediator.NAME = "Mediator";
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
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
    };

    /**
     * Gets the proxyName
     *
     * @return {String} The name of the proxy
     */
    this.getProxyName = function()
    {
	return this.proxyName;
    };

    /**
     * Sets the data object
     * @param {Object} data The data to set
     */
    this.setData = function(data /* Object */)
    {
	this.data = data;
    };

    /**
     * Gets the data
     * @return {Object} The data held in the Proxy
     */
    this.getData = function()
    {
	return this.data;
    };

    /**
     * Called by the Model when the <code>Proxy</code> is registered.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRegister = function(){};

     /**
     * Called by the Model when the <code>Proxy</code> is removed.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRemove = function(){};
}
Proxy = new Class(new Proxy());
/**
 * The default name of the <code>Proxy</code>
 * @type String
 */
Proxy.NAME = "Proxy";
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base Singleton <code>Facade</code> implementation.
 * <P>
 * In PureMVC, the <code>Facade</code> class assumes these
 * responsibilities:
 * <UL>
 * <LI>Initializing the <code>Model</code>, <code>View</code>
 * and <code>Controller</code> Singletons.</LI>
 * <LI>Providing all the applicable methods of the <code>Model,
 * View, & Controller</code> singletons.</LI>
 * <LI>Providing a single point of contact to the application for
 * registering <code>Commands</code> and notifying <code>Observers</code></LI>
 * </UL>
 * <P>
 * <P>
 * This <code>Facade</code> implementation is a Singleton,
 * and cannot be instantiated directly, but instead call the static Singleton
 * Factory method <code>Facade.getInstance()</code>
 * 
 * @see Model
 * @see View
 * @see Controller
 * @see Notification
 * @see Mediator
 * @see Proxy
 * @see SimpleCommand
 * @see MacroCommand
 * @author Justin Wilaby
 */
var Facade = function(){

    /**
     * The <code>View</code> Singleton
     * @type View
     */
    this.view = null;
    /**
     * The <code>Model</code> Singleton
     * @type View
     */
    this.model = null;
    /**
     * The <code>Controller</code> Singleton
     * @type View
     */
    this.controller = null;
    /**
     * @ignore
     * MooTools Class constructor
     */
    this.initialize = function()
    {
	this.initializeFacade();
    };
    /**
     * @private
     * Called automatically by the constructor.
     * Initialize the Singleton <code>Facade</code> instance.
     *
     * <P>
     * Override in your subclass to do any subclass specific initializations. Be
     * sure to $extend the Facade with the methods and properties on your implementation
     * and  call <code>Facade.initializeFacade()</code></P>
     */
    this.initializeFacade = function()
    {
	this.initializeModel();
	this.initializeController();
	this.initializeView();
    };
    
    /**
     * @private
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
     * <P>
     * Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a <code>Command</code> to create and register <code>Proxy</code>s
     * with the <code>Model</code>, since <code>Proxy</code>s with mutable data will likely
     * need to send <code>Notification</code>s and thus will likely want to fetch a reference to
     * the <code>Facade</code> during their construction.
     * </P>
     */
    this.initializeModel = function()
    {
	this.model = Model.getInstance();
    };

    /**
     * @private
     * Initialize the <code>Controller</code>.
     *
     * <P>
     * Called by the <code>initializeFacade</code> method.
     * Override this method in JSON Object <code>Facade</code>
     * definition if one or both of the following are true:
     * <UL>
     * <LI> You wish to initialize a different <code>Controller</code>.</LI>
     * <LI> You have <code>Commands</code> to register with the <code>Controller</code> at startup.</code>. </LI>
     * </UL>
     * </P>
     */
    this.initializeController = function()
    {
	this.controller = Controller.getInstance();
    };

    /**
     * @private
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
     * <P>
     * Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a <code>Command</code> to create and register <code>Mediator</code>s
     * with the <code>View</code>, since <code>IMediator</code> instances will need to send
     * <code>INotification</code>s and thus will likely want to fetch a reference
     * to the <code>Facade</code> during their construction.
     * </P>
     */
    this.initializeView = function()
    {
	this.view = View.getInstance();
    };

    /**
     * Register a <code>Command</code> with the <code>Controller</code> by Notification name.
     *
     * @param {string} notificationName the name of the <code>Notification</code> to associate the <code>Command</code> with
     * @param {Class} commandClassRef a reference to the Class of the <code>Command</code>
     */
    this.registerCommand = function(notificationName /* String */, commandClassRef /* Class */)
    {
	this.controller.registerCommand(notificationName, commandClassRef);
    };

    /**
     * Remove a previously registered <code>Command</code> to <code>Notification</code> mapping from the Controller.
     *
     * @param {String} notificationName the name of the <code>Notification</code> to remove the <code>Command</code> mapping for
     */
    this.removeCommand = function(notificationName /* String */)
    {
	this.controller.removeCommand(notificationName);
    };

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {String} notificationName
     * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
     */
    this.hasCommand = function(notificationName /* String */)
    {
	return this.controller.hasCommand(notificationName);
    };

    /**
     * Register an <code>Proxy</code> with the <code>Model</code> by name.
     *
     * @param proxy the <code>Proxy</code> instance to be registered with the <code>Model</code>.
     */
    this.registerProxy = function(proxy /* Proxy */)
    {
	this.model.registerProxy(proxy);
    };

    /**
     * Retrieve an <code>Proxy</code> from the <code>Model</code> by name.
     *
     * @param {String} proxyName the name of the proxy to be retrieved.
     * @return {Proxy} the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
     */
    this.retrieveProxy = function(proxyName /* String */)
    {
	return this.model.retrieveProxy(proxyName);
    };

    /**
     * Remove an <code>Proxy</code> from the <code>Model</code> by name.
     *
     * @param {String} proxyName the <code>Proxy</code> to remove from the <code>Model</code>.
     * @return {Proxy} the <code>Proxy</code> that was removed from the <code>Model</code>
     */
    this.removeProxy = function(proxyName /* String */)
    {
	this.model.removeProxy(proxyName);
    };

    /**
     * Check if a Proxy is registered
     *
     * @param {String} proxyName
     * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
     */
    this.hasProxy = function(proxyName /* String */)
    {
	return this.model.hasProxy(proxyName);
    };

    /**
     * Register a <code>Mediator</code> with the <code>View</code>.
     *
     * @param {Mediator} mediator a reference to the <code>Mediator</code>
     */
    this.registerMediator = function(mediator /* Mediator */)
    {
	this.view.registerMediator(mediator);
    };

    /**
     * Retrieve an <code>IMediator</code> from the <code>View</code>.
     *
     * @param {String} mediatorName
     * @return {Mediator} the <code>Mediator</code> previously registered with the given <code>mediatorName</code>.
     */
    this.retrieveMediator = function(mediatorName /* String */ )
    {
	return this.view.retrieveMediator(mediatorName);
    };

    /**
     * Remove an <code>Mediator</code> from the <code>View</code>.
     *
     * @param {String} mediatorName name of the <code>Mediator</code> to be removed.
     * @return the <code>Mediator</code> that was removed from the <code>View</code>
     */
    this.removeMediator = function(mediatorName /* String */ )
    {
	return this.view.removeMediator(mediatorName);
    };

    /**
     * Check if a Mediator is registered or not
     *
     * @param {String} mediatorName
     * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
     */
    this.hasMediator = function(mediatorName /* String */)
    {
	return this.view.hasMediator(mediatorName);
    };

    /**
     * Create and send a <code>Notification</code>.
     *
     * <P>
     * Keeps us from having to construct new notification
     * instances in our implementation code.
     * @param {String} notificationName the name of the notiification to send
     * @param {Object} [body] the body of the notification
     * @param {String} [type] the type of the notification
     */
    this.sendNotification = function(notificationName /* String */, body /* Object */, type /* String */)
    {
	this.notifyObservers(new Notification(notificationName, body, type));
    };

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
     * @param {Notification} notification the <code>Notification</code> to have the <code>View</code> notify <code>Observers</code> of.
     */
    this.notifyObservers = function(notification /* Notification */)
    {
	this.view.notifyObservers(notification);
    };
};
Facade.getInstance = function()
{
    if (Facade.instance == undefined)
    {
	var classFactory = new Class(new Facade());
	Facade.instance = new classFactory();
    }
    return Facade.instance;
};
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base <code>Notification</code> implementation.
 * <P>
 * PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.</P>
 *
 * <P>
 * The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.</P>
 *
 * <P>
 * Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, <code>Mediator</code> implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of <code>Notification</code>s to
 * trigger <code>Command</code>s or to communicate with other <code>Mediators</code>.
 * <code>IProxy</code> and <code>Command</code>
 * instances communicate with each other and <code>Mediator</code>s
 * by broadcasting <code>Notification</code>s.</P>
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
 * @param {String} name the name of the notification
 * @param {Object} body data to send with the notification
 * @param {String} type type identifier of the notification
 * @see Observer
 * @author Justin Wilaby
 * 
 */
var Notification = function(name /* String */, body /* Object */, type /* String */){

    /**
     * The <code>Notification</code> name
     * @type String
     */
    this.name = null;
    /**
     * The <code>Notification</code> body
     * @type Object
     */
    this.body = null;
    /**
     * The <code>Notification</code> type
     * @type String
     */
    this.type = null;
    
    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(name /* String */, body /* Object */, type /* String */)
    {
	this.name = name;
	this.body = body;
	this.type = type;
    };

    /**
     * Get the name of the <code>Notification</code> instance.
     *
     * @return {String} the name of the <code>Notification</code> instance.
     */
    this.getName = function()
    {
	return this.name;
    };

    /**
     * Set the body of the <code>Notification</code> instance.
     *
     * @param {Object} body the body of the notification.
     */
    this.setBody = function(body /* Object */)
    {
	this.body = body;
    };

    /**
     * Get the body of the <code>Notification</code> instance.
     *
     * @return {Object} the body object.
     */
    this.getBody = function()
    {
	return this.body;
    };

    /**
     * Set the type of the <code>Notification</code> instance.
     *
     * @param {String} type the type identifier for the notification
     */
    this.setType = function(type /* String */)
    {
	this.type = type;
    };

    /**
     * Get the type of the <code>Notification</code> instance.
     *
     * @return {String} the type
     */
    this.getType = function()
    {
	return this.type;
    };

    /**
     * Get the string representation of the <code>Notification</code> instance.
     *
     * @return the string representation of the <code>Notification</code> instance.
     */
    this.toString = function()
    {
	var msg = "Notification Name: "+this.getName();
	msg += "\nBody:"+(( this.body == null )?"null":this.body.toString());
	msg += "\nType:"+(( this.type == null )?"null":this.type);
	return msg;
    };
};
Notification = new Class(new Notification());
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base <code>Observer</code> implementation.
 * <P>
 * An <code>Observer</code> is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular <code>Notification</code> is broadcast. </P>
 *
 * <P>
 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL>
 * @param {Function} notifyMethod the notification method of the interested object
 * @param {Object} notifyContext the notification context of the interested object
 * @see View
 * @see Notification
 */
var Observer = function(notifyMethod /* Function */, notifyContext /* Object */){

    /**
     * The method to call when notifying <code>Observer</code>s
     * @type Function
     */
    this.notify = null;
    /**
     * The context (this) of interested objects
     * @type Object
     */
    this.context = null;

    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(notifyMethod /* Function */, notifyContext /* Object */)
    {
	this.notify = notifyMethod;
	this.context = notifyContext;
    };

    /**
     * Set the notification method.
     *
     * <P>
     * The notification method should take one parameter of type <code>Notification</code>.</P>
     *
     * @param {Function} notifyMethod the notification (callback) method of the interested object.
     */
    this.setNotifyMethod = function(notifyMethod /* Function */)
    {
	this.notify = notifyMethod;
    };

    /**
     * Set the notification context.
     *
     * @param {Object} notifyContext the notification context (this) of the interested object.
     */
    this.setNotifyContext = function(notifyContext /* Object */ )
    {
	this.context = notifyContext;
    };

    /**
     * Get the notification method.
     *
     * @return {Function} the notification (callback) method of the interested object.
     */
    this.getNotifyMethod = function()
    {
	return this.notify;
    };

    /**
     * Get the notification context.
     *
     * @return {Object} the notification context (<code>this</code>) of the interested object.
     */
    this.getNotifyContext = function()
    {
	return this.context;
    };

    /**
     * @private
     * Notify the interested object.
     *
     * @param {Notification} notification the <code>Notification</code> to pass to the interested object's notification method.
     */
    this.notifyObserver = function(notification /* Notification */)
    {
	this.notify.apply(this.context, [notification]);
    };

    /**
     * @private
     * Compare an object to the notification context.
     *
     * @param {Object} object the object to compare
     * @return {Boolean} Indicates if the object and the notification context are the same
     */
    this.compareNotifyContext = function(object /* Object */)
    {
	return object === this.context;
    };
};
Observer = new Class(new Observer());
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base <code>Command</code> implementation that executes other <code>Command</code>s.
 * <P>
 * A <code>MacroCommand</code> maintains an list of
 * <code>ICommand</code> Class references called <i>SubCommands</i>.</P>
 *
 * <P>
 * When <code>execute</code> is called, the <code>MacroCommand</code>
 * instantiates and calls <code>execute</code> on each of its <i>SubCommands</i> turn.
 * Each <i>SubCommand</i> will be passed a reference to the original
 * <code>INotification</code> that was passed to the <code>MacroCommand</code>'s
 * <code>execute</code> method.</P>
 *
 * <P>
 * Unlike <code>SimpleCommand</code>, your subclass
 * should not override <code>execute</code>, but instead, should
 * override the <code>initializeMacroCommand</code> method,
 * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
 * to be executed.</P>
 *
 * <P>
 * @extends Notifier
 * @see Controller
 * @see Notification
 * @see SimpleCommand
 */
var MacroCommand = function(){
    this.Extends = Notifier;

    /**
     * An array of <code>SimpleCommands</code>
     * or subclasses of
     * @type Array
     */
    this.subCommands = [];
    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.initializeMacroCommand();
    };

    /**
     * Initialize the <code>MacroCommand</code>.
     *
     * <P>
     * In your subclass, override this method to
     * initialize the <code>MacroCommand</code>'s <i>SubCommand</i>
     * list with <code>ICommand</code> class references like
     * this:</P>
     *
     * <listing>
     *		// Initialize MyMacroCommand
     *		initializeMacroCommand : function()
     *		{
     *			this.addSubCommand(FirstCommand);
     *			this.addSubCommand(SecondCommand);
     *			this.addSubCommand(ThirdCommand);
     *		}
     * </listing>
     *
     * <P>
     * Note that <i>SubCommand</i>s may be any <code>Command</code> implementor,
     * <code>MacroCommand</code>s or <code>SimpleCommands</code> are both acceptable.
     */
    this.initializeMacroCommand = function(){};

    /**
     * Add a <i>SubCommand</i>.
     *
     * <P>
     * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.</P>
     *
     * @param {Class} commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
     */
    this.addSubCommand = function(commandClassRef /* Class */)
    {
	this.subCommands.push(commandClassRef);
    };

    /**
     * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
     *
     * <P>
     * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.
     *
     * @param {Notification} notification the <code>Notification</code> object to be passsed to each <i>SubCommand</i>.
     */
    this.execute = function(notification /* Notification */)
    {
	var len = this.subCommands.length;
	for (var i = 0; i < len; i++)
	{
	    var commandClassRef = this.subCommands[i];
	    var commandInstance = new commandClassRef();
	    commandInstance.execute(notification);
	}
    };
};
MacroCommand = new Class(new MacroCommand());
//--------------------------------------------------------------------------
//
//
//
//
//--------------------------------------------------------------------------
/**
 * @misc
 * @class A base <code>Command</code> implementation.
 * <P>
 * Your subclass should override the <code>execute</code>
 * method where your business logic will handle the <code>Notification</code>. </P>
 * @extends Notifier
 * @see Controller
 * @see Notification
 * @see MacroCommand
 */
var SimpleCommand = function(){
    this.Extends = Notifier;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.parent();
    };
    
    /**
     * Fulfill the use-case initiated by the given <code>Notification</code>.
     *
     * <P>
     * In the Command Pattern, an application use-case typically
     * begins with some user action, which results in a <code>Notification</code> being broadcast, which
     * is handled by business logic in the <code>execute</code> method of an
     * <code>ICommand</code>.</P>
     *
     * @param {Notification} notification the <code>Notification</code> to handle.
     */
    this.execute = function(notification /* Notification */){};
};
SimpleCommand = new Class(new SimpleCommand());