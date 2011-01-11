/**
 * @lends Puremvc.patterns.Facade.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Facade = Ext.extend(Object, {

  /**
   * The <code>View</code> singleton.
   *
   * @type Puremvc.core.View
   * @private
   */
  view: null,

  /**
   * The <code>Model</code> singleton.
   *
   * @type Puremvc.core.View
   * @private
   */
  model: null,

  /**
   * The <code>Controller</code> singleton.
   *
   * @type Puremvc.core.View
   * @private
   */
  controller: null,

  /**
   * @class <P>A base singleton <code>Facade</code> implementation.</P>
   * <P>
   * In PureMVC, the <code>Facade</code> class assumes these
   * responsibilities:
   * <UL>
   * <LI>Initializing the <code>Model</code>, <code>View</code>
   * and <code>Controller</code> singletons.</LI>
   * <LI>Providing all the applicable methods of the <code>Model</code>,
   * <code>View</code>, & <code>Controller</code> singletons.</LI>
   * <LI>Providing a single point of contact to the application for
   * registering <code>Command</code>s and notifying <code>Observer</code>s.</LI>
   * </UL>
   * </P>
   * <P>
   * This <code>Facade</code> implementation is a singleton
   * and cannot be instantiated directly, but instead calls the static singleton
   * factory method <code>Facade.getInstance()</code>.</P>
   *
   * @see Puremvc.core.Model
   * @see Puremvc.core.View
   * @see Puremvc.core.Controller
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.Mediator
   * @see Puremvc.patterns.Proxy
   * @see Puremvc.patterns.SimpleCommand
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.Facade.superclass.constructor.call(this);
    this.initializeFacade();
  },

  /**
   * @private
   * Called automatically by the constructor.
   * Initialize the Singleton <code>Facade</code> instance.
   *
   * <P>
   * Override in your subclass to do any subclass specific initializations. Be
   * sure to extend the <code>Facade</code> with the methods and properties on your implementation
   * and call <code>Facade.initializeFacade()</code>.</P>
   */
  initializeFacade: function() {
    this.initializeModel();
    this.initializeController();
    this.initializeView();
  },

  /**
   * @private
   * Initialize the <code>Model</code>.
   *
   * <P>
   * Called by the <code>initializeFacade</code> method.
   * Override this method in your subclass of <code>Facade</code>
   * if one or both of the following are true:
   * <UL>
   * <LI>You wish to initialize a different <code>IModel</code>.</LI>
   * <LI>You have <code>Proxy</code>s to register with the <code>Model</code> that do not
   * retrieve a reference to the <code>Facade</code> at construction time.</LI>
   * </UL>
   * <P>
   * Note: This method is <i>rarely</i> overridden; in practice you are more
   * likely to use a <code>Command</code> to create and register <code>Proxy</code>s
   * with the <code>Model</code>, since <code>Proxy</code>s with mutable data will likely
   * need to send <code>Notification</code>s and thus will likely want to fetch a reference to
   * the <code>Facade</code> during their construction.
   * </P>
   */
  initializeModel: function() {
    this.model = Puremvc.core.Model.getInstance();
  },

  /**
   * @private
   * Initialize the <code>Controller</code>.
   *
   * <P>
   * Called by the <code>initializeFacade</code> method.
   * Override this method in JSON Object <code>Facade</code>
   * definition if one or both of the following are true:
   * <UL>
   * <LI>You wish to initialize a different <code>Controller</code>.</LI>
   * <LI>You have <code>Command</code>s to register with the <code>Controller</code> at startup.</code>.</LI>
   * </UL>
   * </P>
   */
  initializeController: function() {
    this.controller = Puremvc.core.Controller.getInstance();
  },

  /**
   * @private
   * Initialize the <code>View</code>.
   *
   * <P>
   * Called by the <code>initializeFacade</code> method.
   * Override this method in your subclass of <code>Facade</code>
   * if one or both of the following are true:
   * <UL>
   * <LI>You wish to initialize a different <code>IView</code>.</LI>
   * <LI>You have <code>Observer</code>s to register with the <code>View</code></LI>
   * </UL>
   * <P>
   * Note: This method is <i>rarely</i> overridden; in practice you are more
   * likely to use a <code>Command</code> to create and register <code>Mediator</code>s
   * with the <code>View</code>, since <code>IMediator</code> instances will need to send
   * <code>INotification</code>s and thus will likely want to fetch a reference
   * to the <code>Facade</code> during their construction.
   * </P>
   */
  initializeView: function() {
    this.view = Puremvc.core.View.getInstance();
  },

  /**
   * Register a <code>Command</code> with the <code>Controller</code> by <code>Notification</code> name.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to associate the <code>Command</code> with.
   * @param {Class} commandClassRef a reference to the Class of the <code>Command</code>.
   */
  registerCommand: function(notificationName /* String */, commandClassRef /* Class */) {
    this.controller.registerCommand(notificationName, commandClassRef);
  },

  /**
   * Remove a previously registered <code>Command</code> to <code>Notification</code> mapping from the <code>Controller</code>.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to remove the <code>Command</code> mapping for.
   */
  removeCommand: function(notificationName /* String */) {
    this.controller.removeCommand(notificationName);
  },

  /**
   * Check if a <code>Command</code> is registered for a given <code>Notification</code>.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to verify for the existence of a <code>Command</code> mapping for.
   *
   * @return true if a <code>Command</code> is currently registered for the given <i>notificationName</i>, otherwise false.
   *
   * @type Boolean
   */
  hasCommand: function(notificationName /* String */) {
    return this.controller.hasCommand(notificationName);
  },

  /**
   * Register a <code>Proxy</code> with the <code>Model</code> by name.
   *
   * @param proxy {Puremvc.patterns.Proxy} the <code>Proxy</code> instance to be registered with the <code>Model</code>.
   */
  registerProxy: function(proxy /* Proxy */) {
    this.model.registerProxy(proxy);
  },

  /**
   * Retrieve a <code>Proxy</code> from the <code>Model</code> by name.
   *
   * @param {String} proxyName the name of the <code>Proxy</code> to be retrieved.
   *
   * @return the <code>Proxy</code> instance previously registered with the given <i>proxyName</i>.
   * @type Puremvc.patterns.Proxy
   */
  retrieveProxy: function(proxyName /* String */) {
    return this.model.retrieveProxy(proxyName);
  },

  /**
   * Remove an <code>Proxy</code> from the <code>Model</code> by name.
   *
   * @param {String} proxyName the <code>Proxy</code> to remove from the <code>Model</code>.
   *
   * @return the <code>Proxy</code> that was removed from the <code>Model</code>.
   * @type Puremvc.patterns.Proxy
   */
  removeProxy: function(proxyName /* String */) {
    this.model.removeProxy(proxyName);
  },

  /**
   * Check if a <code>Proxy</code> is registered.
   *
   * @param {String} proxyName the <code>Proxy</code> to verify the existence of a registration with the <code>Model</code>.
   *
   * @return true if a <code>Proxy</code> is currently registered with the given <i>proxyName</i>, otherwise false.
   * @type Boolean
   */
  hasProxy: function(proxyName /* String */) {
    return this.model.hasProxy(proxyName);
  },

  /**
   * Register a <code>Mediator</code> with the <code>View</code>.
   *
   * @param {Puremvc.patterns.Mediator} mediator a reference to the <code>Mediator</code>.
   */
  registerMediator: function(mediator /* Mediator */) {
    this.view.registerMediator(mediator);
  },

  /**
   * Retrieve an <code>IMediator</code> from the <code>View</code>.
   *
   * @param {String} mediatorName the name of the registered <code>Mediator</code> to retrieve.
   *
   * @return the <code>Mediator</code> previously registered with the given <i>mediatorName</i>.
   * @type Puremvc.patterns.Mediator
   */
  retrieveMediator: function(mediatorName /* String */) {
    return this.view.retrieveMediator(mediatorName);
  },

  /**
   * Remove an <code>Mediator</code> from the <code>View</code>.
   *
   * @param {String} mediatorName the name of the <code>Mediator</code> to be removed.
   *
   * @return the <code>Mediator</code> that was removed from the <code>View</code>.
   * @type Puremvc.patterns.Mediator
   */
  removeMediator: function(mediatorName /* String */) {
    return this.view.removeMediator(mediatorName);
  },

  /**
   * Check if a <code>Mediator</code> is registered or not.
   *
   * @param {String} mediatorName the name of the <code>Mediator</code> to verify the existence of a registration for.
   *
   * @return true if a <code>Mediator</code> is registered with the given <i>mediatorName</i>, otherwise false.
   * @type Boolean
   */
  hasMediator: function(mediatorName /* String */) {
    return this.view.hasMediator(mediatorName);
  },

  /**
   * Create and send a <code>Notification</code>.
   *
   * <P>
   * Keeps us from having to construct new notification
   * instances in our implementation code.
   *
   * @param {String} notificationName the name of the notification to send.
   * @param {Object} [body] the body of the notification.
   * @param {String} [type] the type of the notification.
   */
  sendNotification: function(notificationName /* String */, body /* Object */, type /* String */) {
    this.notifyObservers(new Puremvc.patterns.Notification(notificationName, body, type));
  },

  /**
   * Notify <code>Observer</code>s.
   * <P>
   * This method is left public mostly for backward
   * compatibility, and to allow you to send custom
   * notification classes using the <code>Facade</code>.</P>
   *<P>
   * Usually you should just call <i>sendNotification</i>
   * and pass the parameters, never having to
   * construct the <code>Notification</code> yourself.</P>
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to have the <code>View</code> notify <code>Observers</code> of.
   */
  notifyObservers: function(notification /* Notification */) {
    this.view.notifyObservers(notification);
  }
});

Ext.apply(Puremvc.patterns.Facade,
/** @lends Puremvc.patterns.Facade# */
{
  /**
   * @memberof Puremvc.patterns.Facade
   * @private
   */
  _instance: null
});

Ext.apply(Puremvc.patterns.Facade,
/** @lends Puremvc.patterns.Facade# */
{
  /**
   * Retrieve the singleton instance of the <code>Facade</code>.
   * @memberof Puremvc.patterns.Facade
   */
  getInstance: function() {
    if (Puremvc.patterns.Facade._instance === null) {
      Puremvc.patterns.Facade._instance = new Puremvc.patterns.Facade();
    }
    return Puremvc.patterns.Facade._instance;
  }
});
