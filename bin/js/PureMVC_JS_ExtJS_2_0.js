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
    return this.model.removeProxy(proxyName);
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

/**
 * @lends Puremvc.patterns.Notification.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Notification = Ext.extend(Object, {
  /**
   * @class <P>A base <code>Notification</code> implementation.</P>
   * <P>
   * PureMVC does not rely upon underlying event models such
   * as the one provided with Flash, and ActionScript 3 does
   * not have an inherent event model.</P>
   *
   * <P>
   * The Observer pattern as implemented within PureMVC exists
   * to support event-driven communication between the
   * application and the actors of the MVC triad (Model, View
   * and Controller.</P>
   *
   * <P>
   * Notifications are not meant to be a replacement for Events
   * in Flex/Flash/AIR/Javascript. Generally, <code>Mediator</code>
   * implementors place event listeners on their view components, which they
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
   * @param {String} name the name of the notification.
   * @param {Object} [body] (optional) body data to send with the notification.
   * @param {String} [type] (optional) type identifier of the notification.
   *
   * @see Puremvc.patterns.Observer
   * 
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(name /* String */, body /* Object */, type /* String */) {
    Puremvc.patterns.Notification.superclass.constructor.call(this);
    this.name = name;
    this.body = body;
    this.type = type;
  },

  /**
   * Get the name of the <code>Notification</code> instance.
   *
   * @return the name of the <code>Notification</code> instance.
   * @type String
   */
  getName: function() {
    return this.name;
  },

  /**
   * Set the body of the <code>Notification</code> instance.
   *
   * @param {Object} body the body of the notification.
   */
  setBody: function(body /* Object */) {
    this.body = body;
  },

  /**
   * Get the body of the <code>Notification</code> instance.
   *
   * @return the body object.
   * @type Object
   */
  getBody: function() {
    return this.body;
  },

  /**
   * Set the type of the <code>Notification</code> instance.
   *
   * @param {String} type the type identifier for the notification.
   */
  setType: function(type /* String */) {
    this.type = type;
  },

  /**
   * Get the type of the <code>Notification</code> instance.
   *
   * @return the type identifier for the notification.
   * @type String
   */
  getType: function() {
    return this.type;
  },

  /**
   * Get a textual representation of the <code>Notification</code> instance.
   *
   * @return the textual representation of the <code>Notification</code> instance.
   * @type String
   */
  toString: function() {
    var msg = "Notification Name: " + this.getName();
    msg += "\nBody:" + ((this.body == null) ? "null": this.body.toString());
    msg += "\nType:" + ((this.type == null) ? "null": this.type);
    return msg;
  }
});

/**
 * @lends Puremvc.patterns.Notifier.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Notifier = Ext.extend(Object, {
  /**
   * @class <P>The Base <code>Notifier</code> implementation.</P>
   * <P>
   * <code>MacroCommand</code>, <code>Command</code>, <code>Mediator</code> and
   * <code>Proxy</code> all have a need to send <code>Notifications</code>.</P>
   * <P>
   * The <code>Notifier</code> base class provides a common method called
   * <code>sendNotification</code> that relieves implementation code of
   * the necessity to actually construct <code>Notification</code>s.</P>
   *
   * <P>
   * The <code>Notifier</code> class, which all of the above mentioned classes
   * extend, provides an initialized reference to the <code>Facade</code>
   * singleton, which is required by the convenience method <code>sendNotification</cpde>
   * for sending <code>Notifications</code>, but it also eases implementation as these
   * classes have frequent <code>Facade</code> interactions and usually require
   * access to the facade anyway.</P>
   *
   * @see Puremvc.patterns.Facade
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
    Puremvc.patterns.Notifier.superclass.constructor.call(this);
    this.facade = Puremvc.patterns.Facade.getInstance();
  },

  /**
   * Create and send a <code>Notification</code>.
   *
   * <P>
   * Keeps us from having to construct new Notification
   * instances in our implementation code.</P>
   * 
   * @param {String} notificationName the name of the notiification to send.
   * @param {Object} [body] the (optional) body of the notification.
   * @param {String} [type] the (optional) type of the notification.
   */
  sendNotification: function(notificationName /* String */, body /* Object */, type /* String */) {
    this.facade.sendNotification(notificationName, body, type);
  }
});

/**
 * @lends Puremvc.patterns.Observer.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Observer = Ext.extend(Object, {
  /**
   * @class <p>A base <code>Observer</code> implementation.</P>
   * <P>
   * An <code>Observer</code> is an object that encapsulates information
   * about an interested object with a method that should
   * be called when a particular <code>Notification</code> is broadcast.</P>
   *
   * <P>
   * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
   * <UL>
   * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
   * <LI>Encapsulate the notification context (this) of the interested object.</LI>
   * <LI>Provide methods for setting the notification method and context.</LI>
   * <LI>Provide a method for notifying the interested object.</LI>
   * </UL>
   *
   * @see Puremvc.core.View
   * @see Puremvc.patterns.Notification
   *
   * @param {Function} notifyMethod the notification method of the interested object.
   * @param {Object} notifyContext the notification context of the interested object.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(notifyMethod /* Function */, notifyContext /* Object */) {
    Puremvc.patterns.Observer.superclass.constructor.call(this);
    this.notify = notifyMethod;
    this.context = notifyContext;
  },

  /**
   * Set the notification method.
   *
   * <P>
   * The notification method should take one parameter of type <code>Notification</code>.</P>
   *
   * @param {Function} notifyMethod the notification (callback) method of the interested object.
   */
  setNotifyMethod: function(notifyMethod /* Function */) {
    this.notify = notifyMethod;
  },

  /**
   * Set the notification context.
   *
   * @param {Object} notifyContext the notification context (this) of the interested object.
   */
  setNotifyContext: function(notifyContext /* Object */) {
    this.context = notifyContext;
  },

  /**
   * Get the notification method.
   *
   * @return the notification (callback) method of the interested object.
   * @type Function
   */
  getNotifyMethod: function() {
    return this.notify;
  },

  /**
   * Get the notification context.
   *
   * @return the notification context (<code>this</code>) of the interested object.
   * @type Object
   */
  getNotifyContext: function() {
    return this.context;
  },

  /**
   * @private
   * Notify the interested object.
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to pass to the interested object's notification method.
   */
  notifyObserver: function(notification /* Notification */) {
    this.notify.apply(this.context, [notification]);
  },

  /**
   * @private
   * Compare an object to the notification context.
   *
   * @param {Object} object the object to compare.
   *
   * @return true if the object and the notification context are the same, otherwise false.
   * @type Boolean
   */
  compareNotifyContext: function(object /* Object */) {
    return object === this.context;
  }
});

/**
 * @lends Puremvc.core.Model.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.Model = Ext.extend(Object, {

  /**
   * @private
   *
   * HashTable of <code>Proxy</code> instances
   * registered with the <code>Model</code>
   * @type Object
   */
  proxyMap: {},

  /**
   * @class <P>In PureMVC, the <code>Model</code> class provides
   * access to model objects (Proxies) by named lookup.</P>
   * <P>
   * A singleton <code>Model</code> implementation in the form
   * of a JSON object.</P>
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
   * with the <code>Model</code>. Typically, you use a
   * <code>SimpleCommand</code> to create and register <code>Proxy</code>
   * instances once the <code>Facade</code> has initialized the core
   * actors.</p>
   *
   * @see Puremvc.patterns.Proxy
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.Model._instance != null) {
      throw Error(Puremvc.core.Model._SINGLETON_MSG);
    }
    this.initializeModel();
    Puremvc.core.Model._instance = this;
  },

  /**
   * Register a <code>Proxy</code> with the <code>Model</code>.
   *
   * @param {Puremvc.patterns.Proxy} proxy a <code>Proxy</code> to be held by the <code>Model</code>.
   */
  registerProxy: function(proxy /* Proxy */) {
    this.proxyMap[proxy.getProxyName()] = proxy;
    proxy.onRegister();
  },

  /**
   * Retrieve an <code>IProxy</code> from the <code>Model</code>.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> to retrieve.
   *
   * @returns the <code>Proxy</code> instance previously registered with the given <code>proxyName</code>.
   * @type Puremvc.patterns.Proxy
   */
  retrieveProxy: function(proxyName /* String */) {
    var retVal = this.proxyMap[proxyName] || null;
    return retVal;
  },

  /**
   * Check if a <code>Proxy</code> is registered.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> to verify the existence of its registration.
   *
   * @returns true if a Proxy is currently registered with the given <code>proxyName</code>, otherwise false.
   * @type Boolean
   */
  hasProxy: function(proxyName /* String */) {
    return this.proxyMap[proxyName] != null;
  },

  /**
   * Remove a <code>Proxy</code> from the <code>Model</code>.
   *
   * @param {String} proxyName The name of the <code>Proxy</code> instance to be removed.
   *
   * @returns the <code>Proxy</code> that was removed from the <code>Model</code>.
   * @type Puremvc.patterns.Proxy
   */
  removeProxy: function(proxyName /* String */) {
    var proxy = this.proxyMap[proxyName] || null;
    if (proxy) {
      delete this.proxyMap[proxyName];
      proxy.onRemove();
    }
    return proxy;
  },

  /**
   * @ignore
   */
  initializeModel: function() {

  }
});

Ext.apply(Puremvc.core.Model, 
/** @lends Puremvc.core.Model# */
{
  /**
   * @constant
   * @memberof Puremvc.core.Model
   * @private
   */
  _SINGLETON_MSG: "Model Singleton already constructed!",

  /**
   * @memberof Puremvc.core.Model
   * @private
   */
  _instance: new Puremvc.core.Model(),

  /**
   * Retrieve the singleton instance of the <code>Model</code>.
   * @memberof Puremvc.core.Model
   */
  getInstance: function() {
    return Puremvc.core.Model._instance;
  }
});

/**
 * @lends Puremvc.core.View.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.View = Ext.extend(Object, {
  /**
   * @private
   *
   * Mapping of <code>Mediator</code> names to <code>Mediator</code>
   * instances.
   *
   * @type Object
   */
  mediatorMap: {},

  /**
   * @private
   * 
   * Mapping of <code>Notification</code> names to
   * <code>Observers</code> lists.
   *
   * @type Object
   */
  observerMap: {},

  /**
   * @class <P>The <code>View</code> class in PureMVC.<p>
   *  A singleton <code>View</code> implementation. In PureMVC, the
   *  <code>View</code> class assumes these responsibilities:
   *  <UL>
   *  <LI>Maintain a cache of <code>Mediator</code> instances.</LI>
   *  <LI>Provide methods for registering, retrieving, and removing
   *  <code>IMediator</code>s.</LI>
   *  <LI>Notifiying <code>Mediator</code>s when they are registered or
   *  removed.</LI>
   *  <LI>Managing the <code>Observer</code> lists for each <code>Notification</code>
   *  in the application.</LI>
   *  <LI>Providing a method for attaching <code>Observer</code>s to an
   *  <code>INotification</code>'s <code>Observer</code> list.</LI>
   *  <LI>Providing a method for broadcasting a <code>Notification</code>.</LI>
   *  <LI>Notifying the <code>Observer</code>s of a given
   *  <code>Notification</code> when it broadcasts.</LI>
   *  </UL>
   *
   * @see Puremvc.patterns.Mediator
   * @see Puremvc.patterns.Observer
   * @see Puremvc.patterns.Notification
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.View._instance != null) {
      throw Error(Puremvc.core.View._SINGLETON_MSG);
    }
    this.initializeView();
    Puremvc.core.View._instance = this;
  },
  
  /**
   * Initialize the singleton <code>View</code> instance.
   *
   * <P>
   * Called automatically by the constructor. This
   * is the opportunity to initialize the singleton
   * instance in a subclass without overriding the
   * constructor.</P>
   */
  initializeView: function() {},

  /**
   * Register an <code>Observer</code> to be notified of
   * <code>Notifications</code> with a given name.
   *
   * @param {String} notificationName The name of the <code>Notification</code>s to
   * notify this <code>Observer</code> of.
   * @param {Puremvc.patterns.Observer} observer The <code>Observer</code> to register.
   */
  registerObserver: function(notificationName /* String */, observer /* Observer */) {
    var observers = this.observerMap[notificationName];
    if (observers) {
      observers.push(observer);
    }
    else {
      this.observerMap[notificationName] = [observer];
    }
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
   * </P>
   *
   * @param {Puremvc.patterns.Notification}
   *          notification The <code>Notification</code> to notify
   *          <code>Observer</code>s of.
   */
  notifyObservers: function(notification /* Notification */) {
    var name = notification.getName();
    if (this.observerMap[name] != null) {
      // Copy the array.
      var observers = this.observerMap[name].concat();
      var len = observers.length;
      for (var i = 0; i < len; i++) {
        var observer = observers[i];
        observer.notifyObserver(notification);
      }
    }
  },

  /**
   * Remove the <code>Observer</code> for a given <i>notifyContext</i> from an <code>Observer</code>
   * list for a given <code>Notification</code> name.
   *
   * @param {String}
   *          notificationName which <code>Observer</code> list to remove from.
   * @param {Object}
   *          notifyContext remove the <code>Observer</code> with this object as its
   *          <i>notifyContext</i>.
   */
  removeObserver: function(notificationName /* String */, notifyContext /* Object */) {
    var observers = this.observerMap[notificationName];
    var i = observers.length;
    while (i--) {
      var observer = observers[i];
      if (observer.compareNotifyContext(notifyContext)) {
        observers.splice(i, 1);
        break;
      }
    }
    // Remove empty observer lists.
    if (!observers.length) {
      delete this.observerMap[notificationName];
    }
  },

  /**
   * Register an <code>IMediator</code> instance with the <code>View</code>.
   *
   * <P>
   * Registers the <code>IMediator</code> so that it can be retrieved by name,
   * and further interrogates the <code>IMediator</code> for its
   * <code>INotification</code> interests.
   * </P>
   * <P>
   * If the <code>IMediator</code> returns any <code>INotification</code>
   * names to be notified about, an <code>Observer</code> is created to
   * encapsulate the <code>IMediator</code> instance's
   * <code>handleNotification</code> method and register it as an
   * <code>Observer</code> for all <code>INotification</code>s the
   * <code>IMediator</code> is interested in.
   * </p>
   *
   * @param {Puremvc.patterns.Mediator}
   *          mediator a reference to the <code>Mediator</code> instance.
   */
  registerMediator: function(mediator /* Mediator */) {
    var name = mediator.getMediatorName();
    if (!this.mediatorMap[name]) {
      this.mediatorMap[name] = mediator;
      var interests = mediator.listNotificationInterests();
      var len = interests.length;
      if (len) {
        var observer = new Puremvc.patterns.Observer(mediator.handleNotification, mediator);
        for (var i = 0; i < len; i++) {
          this.registerObserver(interests[i], observer);
        }
      }
      mediator.onRegister();
    }
  },

  /**
   * Retrieve a <code>Mediator</code> from the <code>View</code>.
   *
   * @param {String}
   *          mediatorName the name of the <code>IMediator</code> instance to
   *          retrieve.
   * @return the <code>Mediator</code> instance previously
   *         registered with the given <i>mediatorName</i>.
   * @type Puremvc.patterns.Mediator
   */
  retrieveMediator: function(mediatorName /* String */) {
    var retVal =  this.mediatorMap[mediatorName] || null;
    return retVal;
  },

  /**
   * Remove a <code>Mediator</code> from the <code>View</code>.
   *
   * @param {String}
   *          mediatorName name of the <code>IMediator</code> instance to be
   *          removed.
   * @return the <code>Mediator</code> that was removed from the <code>View</code>.
   * @type Puremvc.patterns.Mediator
   */
  removeMediator: function(mediatorName /* String */) {
    var mediator = this.mediatorMap[mediatorName] || null;
    if (mediator) {
      var interests = mediator.listNotificationInterests();
      var i = interests.length;
      while (i--) {
        this.removeObserver(interests[i], mediator);
      }

      delete this.mediatorMap[mediatorName];
      mediator.onRemove();
    }
    return mediator;
  },

  /**
   * Check if a <code>Mediator</code> is registered or not.
   *
   * @param {String}
   *          mediatorName name of the <code>IMediator</code> instance to verify
   * the existence of its registration.
   * @return true if a <code>Mediator</code> is registered with the given
   *         <i>mediatorName</i>, false otherwise.
   * @type Boolean
   */
  hasMediator: function(mediatorName /* String */) {
    return this.mediatorMap[mediatorName] != null;
  }
});

Ext.apply(Puremvc.core.View,
/** @lends Puremvc.core.View# */
{
  /**
   * @constant
   * @memberof Puremvc.core.View
   * @private
   */
  _SINGLETON_MSG: "View Singleton already constructed!",

  /**
   * @memberof Puremvc.core.View
   * @private
   */
  _instance: new Puremvc.core.View(),

  /**
   * Retrieve the singleton instance of the <code>View</code>.
   * @memberof Puremvc.core.View
   */
  getInstance: function() {
    return Puremvc.core.View._instance;
  }
});

/**
 * @lends Puremvc.core.Controller.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.Controller = Ext.extend(Object, {
  /**
   * The <code>View</code> singleton.
   * @type Puremvc.core.View
   * @private
   */
  view: null,

  /**
   * Mapping of <code>Notification<code> names to
   * <code>Command</code> class references.
   * @type Object
   */
  commandMap: {},

  /**
   * @class <P>The <code>Controller</code> class for PureMVC.</P>
   * <P>A singleton <code>Controller</code> implementation.</P>
   * <P>
   * In PureMVC, the <code>Controller</code> class follows the
   * 'Command and Controller' strategy, and assumes these
   * responsibilities:
   * <UL>
   * <LI>Remembering which <code>SimpleCommand</code>s
   * or <code>MacroCommand</code>s
   * are intended to handle which <code>Notification</code>s.</LI>
   * <LI>Registering itself as an <code>Observer</code> with
   * the <code>View</code> for each <code>Notification</code>
   * that it has a <code>SimpleCommand</code>
   * or <code>MacroCommand</code> mapping for.</LI>
   * <LI>Creating a new instance of the proper <code>SimpleCommand</code>
   * or <code>MacroCommand</code>
   * to handle a given <code>Notification</code> when notified by the <code>View</code>.</LI>
   * <LI>Calling the <code>SimpleCommand</code>'s
   * or <code>MacroCommand</code>'s  <code>execute</code>
   * method, passing in the <code>Notification</code>.</LI>
   * </UL>
   *
   * <P>
   * Your application must register <code>ICommand</code>s with the
   * <code>Controller</code>.</P>
   * <P>
   * The simplest way is to subclass </code>Facade</code>,
   * and use its <code>initializeController</code> method to add your
   * registrations.</P>
   *
   * @see Puremvc.core.View
   * @see Puremvc.patterns.Observer
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.SimpleCommand
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.Controller._instance != null) {
      throw Error(Puremvc.core.Controller._SINGLETON_MSG);
    }
    this.initializeController();
    Puremvc.core.Controller._instance = this;
  },
  
  /**
   * Called automatically by the constructor.
   * Retains a reference to the <code>View</code> singleton.
   */
  initializeController: function() {
    this.view = Puremvc.core.View.getInstance();
  },

  /**
   * If a <code>SimpleCommand</code> or <code>MacroCommand</code>
   * has previously been registered to handle the given
   * <code>Notification</code>, then it is executed.
   *
   * @param {Puremvc.patterns.Notification} note a <code>Notification</code>.
   */
  executeCommand: function(note /* Notification */) {
    var commandClassRef = this.commandMap[note.getName()];
    if (commandClassRef) {
      var command = new commandClassRef();
      command.execute(note);
    }
  },

  /**
   * Register a particular <code>SimpleCommand</code> or
   * <code>MacroCommand</code> class as the handler
   * for a particular <code>Notification</code>.
   *
   * <P>
   * If a <code>Command</code> has already been registered to
   * handle <code>Notification</code>s with this name, it is no longer
   * used, the new <code>Command</code> is used instead.</P>
   *
   * The <code>Observer</code> for the new <code>Command</command> is only created if this is the
   * first time a <code>Command</code> has been regisered for this <code>Notification</code> name.
   *
   * @param {String} notificationName the name of the <code>Notification</code>.
   * @param {Class} commandClassRef the <code>Class</code> of the <code>Command</code>.
   */
  registerCommand: function(notificationName /* String */, commandClassRef /* Class */) {
    if (!this.commandMap[notificationName]) {
      this.view.registerObserver(notificationName, new Puremvc.patterns.Observer(this.executeCommand, this));
    }
    this.commandMap[notificationName] = commandClassRef;
  },

  /**
   * Check if a <code>Command</code> is registered for a given <code>Notification</code>.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to verify the existence of its registration.
   * 
   * @return true if a <code>Command</code> is currently registered for the given <i>notificationName</i>, otherwise false.
   * @type Boolean
   */
  hasCommand: function(notificationName /* String */) {
    return this.commandMap[notificationName] != null;
  },

  /**
   * Remove a previously registered <code>SimpleCommand</code>
   * or <code>MacroCommand</code> to <code>Notification</code> mapping.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to remove the
   * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for.
   */
  removeCommand: function(notificationName /* String */) {
    if (this.hasCommand(notificationName)) {
      this.view.removeObserver(notificationName, this);
      delete this.commandMap[notificationName];
    }
  }
});

Ext.apply(Puremvc.core.Controller,
/** @lends Puremvc.core.Controller# */
{
  /**
   * @constant
   * @memberof Puremvc.core.Controller
   * @private
   */
  _SINGLETON_MSG: "Controller Singleton already constructed!",

  /**
   * @memberof Puremvc.core.Controller
   * @private
   */
  _instance: new Puremvc.core.Controller(),

  /**
   * Retrieve the singleton instance of the <code>Controller</code>.
   * @memberof Puremvc.core.Controller
   */
  getInstance: function() {
    return Puremvc.core.Controller._instance;
  }
});

/**
 * @lends Puremvc.patterns.SimpleCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.SimpleCommand = Ext.extend(Puremvc.patterns.Notifier, {
  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Command</code> implementation.</P>
   * <P>
   * Your subclass should override the <code>execute</code>
   * method where your business logic will handle the <code>Notification</code>.</P>
   *
   * @see Puremvc.core.Controller
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   * 
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.SimpleCommand.superclass.constructor.call(this);
  },

  /**
   * Fulfill the use-case initiated by the given <code>Notification</code>.
   *
   * <P>
   * In the Command Pattern, an application use-case typically
   * begins with some user action, which results in a <code>Notification</code> being broadcast, which
   * is handled by business logic in the <code>execute</code> method of an
   * <code>ICommand</code>.</P>
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to handle.
   */
  execute: function(notification /* Notification */) {
  }
});

/**
 * @lends Puremvc.patterns.MacroCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.MacroCommand = Ext.extend(Puremvc.patterns.Notifier, {
  /**
   * An array of <code>SimpleCommands</code>
   * or subclasses of.
   * @type Array
   * @private
   */
  subCommands: null,

  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Command</code> implementation that executes other <code>Command</code>s.</P>
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
   * @see Puremvc.core.Controller
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.SimpleCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   * 
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.MacroCommand.superclass.constructor.call(this);
    this.subCommands = new Array();
    this.initializeMacroCommand();
  },

  /**
   * Initialize the <code>MacroCommand</code>.
   *
   * <P>
   * In your subclass, override this method to
   * initialize the <code>MacroCommand</code>'s <i>subCommands</i>
   * list with <code>ICommand</code> class references like
   * this:</P>
   *
   * <listing>
   *    // Initialize MyMacroCommand
   *    initializeMacroCommand: function()
   *    {
   *      this.addSubCommand(FirstCommand);
   *      this.addSubCommand(SecondCommand);
   *      this.addSubCommand(ThirdCommand);
   *    }
   * </listing>
   *
   * <P>
   * Note that <i>subCommands</i> may be any <code>Command</code> implementor;
   * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
   */
  initializeMacroCommand: function() {
  },

  /**
   * Add an entry to <i>subCommands</i> list.
   *
   * <P>
   * The <i>subCommands</i> will be called in First In/First Out (FIFO)
   * order.</P>
   *
   * @param {Class} commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
   */
  addSubCommand: function(commandClassRef /* Class */) {
    this.subCommands.push(commandClassRef);
  },

  /**
   * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
   *
   * <P>
   * The <i>subCommands</i> will be called in First In/First Out (FIFO)
   * order.
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> object to be passed to each entry of <i>subCommands</i> list.
   */
  execute: function(notification /* Notification */) {
    var len = this.subCommands.length;
    for (var i = 0; i < len; i++) {
      var commandClassRef = this.subCommands[i];
      var commandInstance = new commandClassRef();
      commandInstance.execute(notification);
    }
  }
});

/**
 * @lends Puremvc.patterns.Mediator.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Mediator = Ext.extend(Puremvc.patterns.Notifier, {

  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Mediator</code> implementation.</P>
   * <P>
   * Typically, a <code>Mediator</code> will be written to serve
   * one specific control or group controls and so,
   * will not have a need to be dynamically named.</P>
   *
   * @param {String} mediatorName the name of the <code>Mediator</code>.
   * @param {Object} viewComponent The <code>Mediator</code>'s view component.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(mediatorName /* String */, viewComponent /* Object */) {
    Puremvc.patterns.Mediator.superclass.constructor.call(this);
    this.mediatorName = (mediatorName != null) ? mediatorName: Puremvc.patterns.Mediator.NAME;
    this.viewComponent = viewComponent;
  },

  /**
   * List the <code>Notification</code> names this
   * <code>Mediator</code> is interested in being notified of.
   *
   * @return the list of <code>Notification</code> names.
   * @type Puremvc.patterns.Notification[]
   */
  listNotificationInterests: function() {
    return [];
  },

  /**
   * Get the name of the <code>Mediator</code>.
   *
   * @return the <code>Mediator</code> name.
   * @type String
   */
  getMediatorName: function() {
    return this.mediatorName;
  },

  /**
   * Get the <code>Mediator</code>'s view component.
   *
   * @return the view component.
   * @type Object
   */
  getViewComponent: function() {
    return this.viewComponent;
  },

  /**
   * Set the <code>Mediator</code>'s view component.
   *
   * @param {Object} viewComponent The view component.
   */
  setViewComponent: function(viewComponent /* Object */) {
    this.viewComponent = viewComponent;
  },

  /**
   * Handle <code>INotification</code>s.
   *
   * <P>
   * Typically this will be handled in a switch statement,
   * with one 'case' entry per <code>Notification</code>
   * the <code>Mediator</code> is interested in.
   *
   * @param {Puremvc.patterns.Notification} notification The notification instance to be handled.
   */
  handleNotification: function(notification /* Notification */) {
  },

  /**
   * Called by the View when the Mediator is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
  },

  /**
   * Called by the View when the Mediator is removed.
   * This method is usually overridden as needed by the subclass.
   */
  onRemove: function() {
  }
});

Ext.apply(Puremvc.patterns.Mediator,
/** @lends Puremvc.patterns.Mediator# */
{
  /**
   * Default name of the <code>Mediator</code>.
   * 
   * @type String
   * @constant
   * @memberof Puremvc.patterns.Mediator
   */
  NAME: "Mediator"
});

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

