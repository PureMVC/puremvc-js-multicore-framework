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
    }
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
    }

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
    }

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
    }

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
    }

    /**
     * Register a <code>Command</code> with the <code>Controller</code> by Notification name.
     *
     * @param {string} notificationName the name of the <code>Notification</code> to associate the <code>Command</code> with
     * @param {Class} commandClassRef a reference to the Class of the <code>Command</code>
     */
    this.registerCommand = function(notificationName /* String */, commandClassRef /* Class */)
    {
	this.controller.registerCommand(notificationName, commandClassRef);
    }

    /**
     * Remove a previously registered <code>Command</code> to <code>Notification</code> mapping from the Controller.
     *
     * @param {String} notificationName the name of the <code>Notification</code> to remove the <code>Command</code> mapping for
     */
    this.removeCommand = function(notificationName /* String */)
    {
	this.controller.removeCommand(notificationName);
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {String} notificationName
     * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
     */
    this.hasCommand = function(notificationName /* String */)
    {
	return this.controller.hasCommand(notificationName);
    }

    /**
     * Register an <code>Proxy</code> with the <code>Model</code> by name.
     *
     * @param proxy the <code>Proxy</code> instance to be registered with the <code>Model</code>.
     */
    this.registerProxy = function(proxy /* Proxy */)
    {
	this.model.registerProxy(proxy);
    }

    /**
     * Retrieve an <code>Proxy</code> from the <code>Model</code> by name.
     *
     * @param {String} proxyName the name of the proxy to be retrieved.
     * @return {Proxy} the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
     */
    this.retrieveProxy = function(proxyName /* String */)
    {
	return this.model.retrieveProxy(proxyName);
    }

    /**
     * Remove an <code>Proxy</code> from the <code>Model</code> by name.
     *
     * @param {String} proxyName the <code>Proxy</code> to remove from the <code>Model</code>.
     * @return {Proxy} the <code>Proxy</code> that was removed from the <code>Model</code>
     */
    this.removeProxy = function(proxyName /* String */)
    {
	this.model.removeProxy(proxyName);
    }

    /**
     * Check if a Proxy is registered
     *
     * @param {String} proxyName
     * @return {Boolean} whether a Proxy is currently registered with the given <code>proxyName</code>.
     */
    this.hasProxy = function(proxyName /* String */)
    {
	return this.model.hasProxy(proxyName);
    }

    /**
     * Register a <code>Mediator</code> with the <code>View</code>.
     *
     * @param {Mediator} mediator a reference to the <code>Mediator</code>
     */
    this.registerMediator = function(mediator /* Mediator */)
    {
	this.view.registerMediator(mediator);
    }

    /**
     * Retrieve an <code>IMediator</code> from the <code>View</code>.
     *
     * @param {String} mediatorName
     * @return {Mediator} the <code>Mediator</code> previously registered with the given <code>mediatorName</code>.
     */
    this.retrieveMediator = function(mediatorName /* String */ )
    {
	return this.view.retrieveMediator(mediatorName);
    }

    /**
     * Remove an <code>Mediator</code> from the <code>View</code>.
     *
     * @param {String} mediatorName name of the <code>Mediator</code> to be removed.
     * @return the <code>Mediator</code> that was removed from the <code>View</code>
     */
    this.removeMediator = function(mediatorName /* String */ )
    {
	return this.view.removeMediator(mediatorName);
    }

    /**
     * Check if a Mediator is registered or not
     *
     * @param {String} mediatorName
     * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
     */
    this.hasMediator = function(mediatorName /* String */)
    {
	return this.view.hasMediator(mediatorName);
    }

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
     * @param {Notification} notification the <code>Notification</code> to have the <code>View</code> notify <code>Observers</code> of.
     */
    this.notifyObservers = function(notification /* Notification */)
    {
	this.view.notifyObservers(notification);
    }
}
Facade.getInstance = function()
{
    if (Facade.instance == undefined)
    {
	var classFactory = new Class(new Facade());
	Facade.instance = new classFactory();
    }
    return Facade.instance;
}