'use strict';

/*
 *  Observer.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

/**
 * A base `Observer` implementation.
 *
 * <P>An `Observer` is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular `Notification` is broadcast.</P>
 *
 * <P>In PureMVC, the `Observer` class assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL>
 *
 * @class Observer
 */
class Observer {

    /**
     * Constructor.
     *
     * <P>The notification method on the interested object should take
     * one parameter of type `Notification`</P>
     *
     * @param {function(Notification):void} notifyMethod
     * @param {Object} notifyContext
     */
    constructor(notifyMethod, notifyContext) {
        this._notifyMethod = notifyMethod;
        this._notifyContext = notifyContext;
    }

    /**
     * Notify the interested object.
     *
     * @param {Notification} notification
     */
    notifyObserver(notification) {
        this._notifyMethod.call(this._notifyContext, notification);
    }

    /**
     * Compare an object to the notification context.
     *
     * @param {Object} notifyContext
     * @returns {boolean}
     */
    compareNotifyContext(notifyContext) {
        return this._notifyContext === notifyContext;
    }

    /**
     * Get the notification method.
     *
     * @returns {function(Notification):void}
     */
    get notifyMethod() {
        return this._notifyMethod
    }

    /**
     * Set the notification method.
     *
     * <P>The notification method should take one parameter of type `Notification`.</P>
     *
     * @param {function(Notification): void} notifyMethod - The function to be called when a notification is received.
     */
    set notifyMethod(notifyMethod) {
        this._notifyMethod = notifyMethod;
    }

    /**
     * Get the notifyContext
     *
     * @returns {Object}
     */
    get notifyContext() {
        return this._notifyContext;
    }

    /**
     * Set the notification context.
     *
     * @param {Object} notifyContext
     */
    set notifyContext(notifyContext) {
        this._notifyContext = notifyContext;
    }

}

/*
 *  View.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A Multiton `View` implementation.
 *
 * <P>In PureMVC, the `View` class assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of `Mediator` instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing `Mediators`.</LI>
 * <LI>Notifiying `Mediators` when they are registered or removed.</LI>
 * <LI>Managing the observer lists for each `Notification` in the application.</LI>
 * <LI>Providing a method for attaching `Observers` to an `Notification`'s observer list.</LI>
 * <LI>Providing a method for broadcasting an `Notification`.</LI>
 * <LI>Notifying the `Observers` of a given `Notification` when it broadcast.</LI>
 * </UL>
 *
 * @see Mediator Mediator
 * @see Observer Observer
 * @see Notification Notification
 *
 * @class View
 */
class View {

    /**
     * Constructor.
     *
     * <P>This `View` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Multiton
     * Factory method `View.getInstance( multitonKey )`
     *
     * @constructor
     * @param {string} key
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     */
    constructor(key) {
        if (View.instanceMap.get(key) != null) throw new Error(View.MULTITON_MSG);
        /** @protected
         * @type {string} */
        this.multitonKey = key;
        View.instanceMap.set(this.multitonKey, this);
        /** @protected
         * @type {Map<string, Mediator>} */
        this.mediatorMap = new Map();
        /** @protected
         * @type {Map.<string, Array.<Observer>>} */
        this.observerMap = new Map();
        this.initializeView();
    }

    /**
     * <P>Initialize the Multiton View instance.</P>
     *
     * <P>Called automatically by the constructor, this
     * is your opportunity to initialize the Multiton
     * instance in your subclass without overriding the
     * constructor.</P>
     */
    initializeView() {

    }

    /**
     * View Multiton factory method.
     *
     * @static
     * @param {string} key
     * @param {function(string):View} factory
     * @returns {View} the Multiton instance of `View`
     */
    static getInstance(key, factory) {
        if (View.instanceMap == null)
            /** @static
             * @type {Map<string, View>} */
            View.instanceMap = new Map();
        if (View.instanceMap.get(key) == null) View.instanceMap.set(key, factory(key));
        return View.instanceMap.get(key);
    }

    /**
     * <P>Register an `Observer` to be notified
     * of `Notifications` with a given name.</P>
     *
     * @param {string} notificationName the name of the `Notifications` to notify this `Observer` of
     * @param {Observer} observer the `Observer` to register
     */
    registerObserver(notificationName, observer) {
        if (this.observerMap.get(notificationName) != null) {
            let observers = this.observerMap.get(notificationName);
            observers.push(observer);
        } else {
            this.observerMap.set(notificationName, new Array(observer));
        }
    }

    /**
     * <P>Notify the `Observers` for a particular `Notification`.</P>
     *
     * <P>All previously attached `Observers` for this `Notification`'s
     * list are notified and are passed a reference to the `Notification` in
     * the order in which they were registered.</P>
     *
     * @param {Notification} notification the `Notification` to notify `Observers` of.
     */
    notifyObservers(notification) {
        if (this.observerMap.has(notification.name)) {
            // Copy observers from reference array to working array,
            // since the reference array may change during the notification loop
            let observers = this.observerMap.get(notification.name).slice();

            // Notify Observers from the working array
            for(let i = 0; i < observers.length; i++) {
                observers[i].notifyObserver(notification);
            }
        }
    }

    /**
     * <P>Remove the observer for a given notifyContext from an observer list for a given Notification name.</P>
     *
     * @param {string} notificationName which observer list to remove from
     * @param {Object} notifyContext remove the observer with this object as its notifyContext
     */
    removeObserver(notificationName, notifyContext) {
        // the observer list for the notification under inspection
        let observers = this.observerMap.get(notificationName);

        // find the observer for the notifyContext
        for (let i = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext) === true) {
                // there can only be one Observer for a given notifyContext
                // in any given Observer list, so remove it and break
                observers.splice(i, 1);
                break;
            }
        }

        // Also, when a Notification's Observer list length falls to
        // zero, delete the notification key from the observer map
        if (observers.length === 0) {
            this.observerMap.delete(notificationName);
        }
    }

    /**
     * Register an `Mediator` instance with the `View`.
     *
     * <P>Registers the `Mediator` so that it can be retrieved by name,
     * and further interrogates the `Mediator` for its
     * `Notification` interests.</P>
     *
     * <P>If the `Mediator` returns any `Notification`
     * names to be notified about, an `Observer` is created encapsulating
     * the `Mediator` instance's `handleNotification` method
     * and registering it as an `Observer` for all `Notifications` the
     * `Mediator` is interested in.</p>
     *
     * @param {Mediator} mediator a reference to the `Mediator` instance
     */
    registerMediator(mediator) {
        // do not allow re-registration (you must to removeMediator fist)
        if (this.mediatorMap.has(mediator.mediatorName) !== false) return;

        mediator.initializeNotifier(this.multitonKey);

        // Register the Mediator for retrieval by name
        this.mediatorMap.set(mediator.mediatorName, mediator);

        // Get Notification interests, if any.
        let interests = mediator.listNotificationInterests();

        // Register Mediator as an observer for each notification of interests
        if (interests.length > 0) {
            // Create Observer referencing this mediator's handleNotification method
            let observer = new Observer(mediator.handleNotification.bind(mediator), mediator); // check bind

            // Register Mediator as Observer for its list of Notification interests
            for (let i = 0; i < interests.length; i++) {
                this.registerObserver(interests[i], observer);
            }
        }

        // alert the mediator that it has been registered
        mediator.onRegister();
    }

    /**
     * Retrieve an `Mediator` from the `View`.
     *
     * @param {string} mediatorName the name of the `Mediator` instance to retrieve.
     * @returns {Mediator} the `Mediator` instance previously registered with the given `mediatorName`.
     */
    retrieveMediator(mediatorName) {
        return this.mediatorMap.get(mediatorName) || null;
    }

    /**
     * Remove an `Mediator` from the `View`.
     *
     * @param {string} mediatorName name of the `Mediator` instance to be removed.
     * @returns {Mediator} the `Mediator` that was removed from the `View`
     */
    removeMediator(mediatorName) {
        // Retrieve the named mediator
        let mediator = this.mediatorMap.get(mediatorName);

        if (mediator) {
            // for every notification this mediator is interested in...
            let interests = mediator.listNotificationInterests();
            for (let i = 0; i < interests.length; i++) {
                // remove the observer linking the mediator
                // to the notification interest
                this.removeObserver(interests[i], mediator);
            }

            // remove the mediator from the map
            this.mediatorMap.delete(mediatorName);

            // alert the mediator that it has been removed
            mediator.onRemove();
        }

        return mediator;
    }

    /**
     * Check if a Mediator is registered or not
     *
     * @param {string} mediatorName
     * @returns {boolean} whether a Mediator is registered with the given `mediatorName`.
     */
    hasMediator(mediatorName) {
        return this.mediatorMap.has(mediatorName);
    }

    /**
     * Remove an View instance
     *
     * @static
     * @param key multitonKey of View instance to remove
     */
    static removeView(key) {
        this.instanceMap.delete(key);
    }

    /**
     * Message Constants
     *
     * @static
     * @type {string}
     */
    static get MULTITON_MSG() { return "View instance for this Multiton key already constructed!" };

}

/*
 *  Controller.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A Multiton `Controller` implementation.
 *
 * <P>In PureMVC, the `Controller` class follows the
 * 'Command and Controller' strategy, and assumes these
 * responsibilities:</P>
 *
 * <UL>
 * <LI> Remembering which `Command`s
 * are intended to handle which `Notifications`.</LI>
 * <LI> Registering itself as an `Observer` with
 * the `View` for each `Notification`
 * that it has an `Command` mapping for.</LI>
 * <LI> Creating a new instance of the proper `Command`
 * to handle a given `Notification` when notified by the `View`.</LI>
 * <LI> Calling the `Command`'s `execute`
 * method, passing in the `Notification`.</LI>
 * </UL>
 *
 * <P>Your application must register `Commands` with the
 * Controller.</P>
 *
 * <P>The simplest way is to subclass `Facade`,
 * and use its `initializeController` method to add your
 * registrations.</P>
 *
 * @see View View
 * @see Observer Observer
 * @see Notification Notification
 * @see SimpleCommand SimpleCommand
 * @see MacroCommand MacroCommand
 *
 * @class Controller
 */
class Controller {

    /**
     * Constructor.
     *
     * <P>This `Controller` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Factory method,
     * passing the unique key for this instance
     * `Controller.getInstance( multitonKey )`</P>
     *
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     *
     * @constructor
     * @param {string} key
     */
    constructor(key) {
        if (Controller.instanceMap[key] != null) throw new Error(Controller.MULTITON_MSG);
        /** @protected
         * @type {string} */
        this.multitonKey = key;
        Controller.instanceMap.set(this.multitonKey, this);
        /** @protected
         * @type {Map<string, function():SimpleCommand>} */
        this.commandMap = new Map();
        this.initializeController();
    }

    /**
     * Initialize the Multiton `Controller` instance.
     *
     * <P>Called automatically by the constructor.</P>
     *
     * <P>Note that if you are using a subclass of `View`
     * in your application, you should <i>also</i> subclass `Controller`
     * and override the `initializeController` method in the
     * following way:</P>
     *
     * <pre>`
     *		// ensure that the Controller is talking to my View implementation
     *		initializeController( )
     *		{
     *			this.view = MyView.getInstance(this.multitonKey, (key) => new MyView(key));
     *		}
     * `</pre>
     *
     */
    initializeController() {
        /** @protected
         * @type {View} **/
        this.view = View.getInstance(this.multitonKey, (key) => new View(key));
    }

    /**
     * `Controller` Multiton Factory method.
     *
     * @static
     * @param {string} key
     * @param {function(string):Controller} factory
     * @returns {Controller} the Multiton instance of `Controller`
     */
    static getInstance(key, factory) {
        if (Controller.instanceMap == null)
            /** @static
             @type {Map<string, Controller>} */
            Controller.instanceMap = new Map();
        if (Controller.instanceMap.get(key) == null) Controller.instanceMap.set(key, factory(key));
        return Controller.instanceMap.get(key);
    }

    /**
     * <P>If an `Command` has previously been registered
     * to handle the given `Notification`, then it is executed.</P>
     *
     * @param {Notification} notification an `Notification`
     */
    executeCommand(notification) {
        let factory = this.commandMap.get(notification.name);
        if (factory == null) return;

        let commandInstance = factory();
        commandInstance.initializeNotifier(this.multitonKey);
        commandInstance.execute(notification);
    }

    /**
     * <P>Register a particular `Command` class as the handler
     * for a particular `Notification`.</P>
     *
     * <P>If an `Command` has already been registered to
     * handle `Notification`s with this name, it is no longer
     * used, the new `Command` is used instead.</P>
     *
     * <P>The Observer for the new Command is only created if this the
     * first time an Command has been regisered for this Notification name.</P>
     *
     * @param notificationName the name of the `Notification`
     * @param {function():SimpleCommand} factory
     */
    registerCommand(notificationName, factory) {
        if (this.commandMap.get(notificationName) == null) {
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }
        this.commandMap.set(notificationName, factory);
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName
     * @return {boolean} whether a Command is currently registered for the given `notificationName`.
     */
    hasCommand(notificationName) {
        return this.commandMap.has(notificationName);
    }

    /**
     * Remove a previously registered `Command` to `Notification` mapping.
     *
     * @param {string} notificationName the name of the `Notification` to remove the `Command` mapping for
     */
    removeCommand(notificationName) {
        // if the Command is registered...
        if(this.hasCommand(notificationName)) {
            // remove the observer
            this.view.removeObserver(notificationName, this);

            // remove the command
            this.commandMap.delete(notificationName);
        }
    }

    /**
     * Remove an Controller instance
     *
     * @static
     * @param {string} key of Controller instance to remove
     */
    static removeController(key) {
        Controller.instanceMap.delete(key);
    }

    /**
     * Message Constants
     *
     * @static
     * @type {string}
     */
    static get MULTITON_MSG() { return "Controller instance for this Multiton key already constructed!" };
}

/*
 *  Model.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

/**
 * A Multiton `Model` implementation.
 *
 * <P>In PureMVC, the `Model` class provides
 * access to model objects (Proxies) by named lookup.
 *
 * <P>The `Model` assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of `Proxy` instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing
 * `Proxy` instances.</LI>
 * </UL>
 *
 * <P>Your application must register `Proxy` instances
 * with the `Model`. Typically, you use an
 * `Command` to create and register `Proxy`
 * instances once the `Facade` has initialized the Core
 * actors.</p>
 *
 * @see Proxy Proxy
 *
 * @class Model
 */

class Model {

    /**
     * Constructor.
     *
     * <P>This `Model` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Multiton
     * Factory method `Model.getInstance( multitonKey )`
     *
     * @constructor
     * @param {string} key
     *
     * @throws {Error} Error if instance for this Multiton key instance has already been constructed
     */
    constructor(key) {
        if (Model.instanceMap.get(key) != null) throw new Error(Model.MULTITON_MSG);
        /** @protected
         * @type {string} */
        this.multitonKey = key;
        Model.instanceMap.set(this.multitonKey, this);
        /** @protected
         * @type {Map<string, Proxy>} */
        this.proxyMap = new Map();
        this.initializeModel();
    }

    /**
     * Initialize the `Model` instance.
     *
     * <P>Called automatically by the constructor, this
     * is your opportunity to initialize the Multiton
     * instance in your subclass without overriding the
     * constructor.</P>
     *
     */
    initializeModel() {

    }

    /**
     * `Model` Multiton Factory method.
     *
     * @static
     * @param {string} key
     * @param {function(string):Model} factory
     * @returns {Model} the instance for this Multiton key
     */
    static getInstance(key, factory) {
        if (Model.instanceMap == null)
            /** @static
             @type {Map<string, Model>} */
            Model.instanceMap = new Map();
        if (Model.instanceMap.get(key) == null) Model.instanceMap.set(key, factory(key));
        return Model.instanceMap.get(key);
    }

    /**
     * Register an `Proxy` with the `Model`.
     *
     * @param {Proxy} proxy an `Proxy` to be held by the `Model`.
     */
    registerProxy(proxy) {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap.set(proxy.proxyName, proxy);
        proxy.onRegister();
    }

    /**
     * Retrieve an `Proxy` from the `Model`.
     *
     * @param {string} proxyName
     * @returns {Proxy} the `Proxy` instance previously registered with the given `proxyName`.
     */
    retrieveProxy(proxyName) {
        return this.proxyMap.get(proxyName) || null;
    }

    /**
     * Check if a Proxy is registered
     *
     * @param {string} proxyName
     * @returns {boolean} whether a Proxy is currently registered with the given `proxyName`.
     */
    hasProxy(proxyName) {
        return this.proxyMap.has(proxyName);
    }

    /**
     * Remove an `Proxy` from the `Model`.
     *
     * @param {string} proxyName name of the `Proxy` instance to be removed.
     * @returns {Proxy} the `Proxy` that was removed from the `Model`
     */
    removeProxy(proxyName) {
        let proxy = this.proxyMap.get(proxyName);
        if (proxy != null) {
            this.proxyMap.delete(proxyName);
            proxy.onRemove();
        }
        return proxy;
    }

    /**
     * Remove a Model instance
     *
     * @static
     * @param key
     */
    static removeModel(key) {
        Model.instanceMap.delete(key);
    }

    /**
     * @static
     * @type {string}
     */
    static get MULTITON_MSG() { return "Model instance for this Multiton key already constructed!" };
}

/*
 *  Notification.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

/**
 *
 * A base `Notification` implementation.
 *
 * <P>PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.</P>
 *
 * <P>The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.</P>
 *
 * <P>Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, `Mediator` implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of `Notification`s to
 * trigger `Command`s or to communicate with other `Mediators`. `Proxy` and `Command`
 * instances communicate with each other and `Mediator`s
 * by broadcasting `Notification`s.</P>
 *
 * <P>A key difference between Flash `Event`s and PureMVC
 * `Notification`s is that `Event`s follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the `Event`, while
 * PureMVC `Notification`s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using `Notification`s.</P>
 *
 * @class Notification
 */
class Notification {

    /**
     * Constructor.
     *
     * @constructor
     * @param {string} name - The name of the notification.
     * @param {Object|null} [body=null] - The body of the notification, defaults to `null`.
     * @param {string} [type=""] - The type of the notification, defaults to an empty string.
     */
    constructor(name, body = null, type = "") {
        this._name = name;
        this._body = body;
        this._type = type;
    }

    /**
     * Get the name of the `Notification` instance.
     *
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Get the body of the `Notification` instance.
     *
     * @returns {Object}
     */
    get body() {
        return this._body;
    }

    /**
     * Set the body of the `Notification` instance.
     *
     * @param {Object|null} body
     */
    set body(body) {
        this._body = body;
    }

    /**
     * Get the type of the `Notification` instance.
     *
     * @returns {string}
     */
    get type() {
        return this._type;
    }

    /**
     * Set the type of the `Notification` instance.
     *
     * @param {string} type
     */
    set type(type) {
        this._type = type;
    }

    /**
     * Get the string representation of the `Notification` instance.
     *
     * @returns {string}
     */
    toString() {
        let str= "Notification Name: " + this.name;
        str+= "\nBody:" + ((this.body == null ) ? "null" : this.body.toString());
        str+= "\nType:" + ((this.type == null ) ? "null" : this.type);
        return str;
    }

}

/*
 *  Facade.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A base Multiton `Facade` implementation.
 *
 * @see Model Model
 * @see View View
 * @see Controller Controller
 *
 * @class Facade
 */
class Facade {

    /**
     * Constructor.
     *
     * <P>This `Facade` implementation is a Multiton,
     * so you should not call the constructor
     * directly, but instead call the static Factory method,
     * passing the unique key for this instance
     * `Facade.getInstance( multitonKey )`</P>
     *
     * @constructor
     * @param {string} key
     * @throws {Error} Error if instance for this Multiton key has already been constructed
     */
    constructor(key) {
        if (Facade.instanceMap[key] != null) throw new Error(Facade.MULTITON_MSG);
        this.initializeNotifier(key);
        Facade.instanceMap.set(this.multitonKey, this);
        this.initializeFacade();
    }

    /**
     * Initialize the Multiton `Facade` instance.
     *
     * <P>Called automatically by the constructor. Override in your
     * subclass to do any subclass specific initializations. Be
     * sure to call `super.initializeFacade()`, though.</P>
     */
    initializeFacade() {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }

    /**
     * Facade Multiton Factory method
     *
     * @static
     * @param {string} key
     * @param {function(string):Facade} factory
     * @returns {Facade} the Multiton instance of the Facade
     */
    static getInstance(key, factory) {
        if (Facade.instanceMap == null)
            /** @static
             * @type {Map<string, Facade>} */
            Facade.instanceMap = new Map();
        if (Facade.instanceMap.get(key) == null) Facade.instanceMap.set(key, factory(key));
        return Facade.instanceMap.get(key);
    }

    /**
     * Initialize the `Model`.
     *
     * <P>Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:</P>
     *
     * <UL>
     * <LI> You wish to initialize a different `Model`.</LI>
     * <LI> You have `Proxy`s to register with the Model that do not
     * retrieve a reference to the Facade at construction time.`</LI>
     * </UL>
     *
     * If you don't want to initialize a different `Model`,
     * call `super.initializeModel()` at the beginning of your
     * method, then register `Proxy`s.
     *
     * <P>Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a `Command` to create and register `Proxy`s
     * with the `Model`, since `Proxy`s with mutable data will likely
     * need to send `Notification`s and thus will likely want to fetch a reference to
     * the `Facade` during their construction.</P>
     */
    initializeModel() {
        if (this.model != null) return;
        this.model = Model.getInstance(this.multitonKey, key => new Model(key));
    }

    /**
     * Initialize the `Controller`.
     *
     * <P>Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:</P>
     *
     * <UL>
     * <LI> You wish to initialize a different `Controller`.</LI>
     * <LI> You have `Commands` to register with the `Controller` at startup.`. </LI>
     * </UL>
     *
     * <P>If you don't want to initialize a different `Controller`,
     * call `super.initializeController()` at the beginning of your
     * method, then register `Command`s.</P>
     */
    initializeController() {
        if (this.controller != null) return;
        this.controller = Controller.getInstance(this.multitonKey, key => new Controller(key));
    }

    /**
     * Initialize the `View`.
     *
     * <P>Called by the `initializeFacade` method.
     * Override this method in your subclass of `Facade`
     * if one or both of the following are true:</P>
     *
     * <UL>
     * <LI> You wish to initialize a different `View`.</LI>
     * <LI> You have `Observers` to register with the `View`</LI>
     * </UL>
     *
     * <P>If you don't want to initialize a different `View`,
     * call `super.initializeView()` at the beginning of your
     * method, then register `Mediator` instances.</P>
     *
     * <P>Note: This method is <i>rarely</i> overridden; in practice you are more
     * likely to use a `Command` to create and register `Mediator`s
     * with the `View`, since `Mediator` instances will need to send
     * `Notification`s and thus will likely want to fetch a reference
     * to the `Facade` during their construction.</P>
     */
    initializeView() {
        if (this.view != null) return;
        this.view = View.getInstance(this.multitonKey, key => new View(key));
    }

    /**
     * Register an `Command` with the `Controller` by Notification name.
     *
     * @param {string} notificationName the name of the `Notification` to associate the `Command` with
     * @param {function():SimpleCommand} factory a reference to the factory of the `Command`
     */
    registerCommand(notificationName, factory) {
        this.controller.registerCommand(notificationName, factory);
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {string} notificationName
     * @returns {boolean} whether a Command is currently registered for the given `notificationName`.
     */
    hasCommand(notificationName) {
        return this.controller.hasCommand(notificationName);
    }

    /**
     * Remove a previously registered `Command` to `Notification` mapping from the Controller.
     *
     * @param {string} notificationName the name of the `Notification` to remove the `Command` mapping for
     */
    removeCommand(notificationName) {
        this.controller.removeCommand(notificationName);
    }

    /**
     * Register an `Proxy` with the `Model` by name.
     *
     * @param {Proxy} proxy the `Proxy` instance to be registered with the `Model`.
     */
    registerProxy(proxy) {
        this.model.registerProxy(proxy);
    }

    /**
     * Remove an `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName the `Proxy` to remove from the `Model`.
     * @returns {Proxy} the `Proxy` that was removed from the `Model`
     */
    removeProxy(proxyName) {
        return this.model.removeProxy(proxyName);
    }

    /**
     * Check if a Proxy is registered
     *
     * @param {string} proxyName
     * @returns {boolean} whether a Proxy is currently registered with the given `proxyName`.
     */
    hasProxy(proxyName) {
        return this.model.hasProxy(proxyName);
    }

    /**
     * Retrieve an `Proxy` from the `Model` by name.
     *
     * @param {string} proxyName the name of the proxy to be retrieved.
     * @returns {Proxy} the `Proxy` instance previously registered with the given `proxyName`.
     */
    retrieveProxy(proxyName) {
        return this.model.retrieveProxy(proxyName);
    }

    /**
     * Register a `Mediator` with the `View`.
     *
     * @param {Mediator} mediator a reference to the `Mediator`
     */
    registerMediator(mediator) {
        this.view.registerMediator(mediator);
    }

    /**
     * Remove an `Mediator` from the `View`.
     *
     * @param {string} mediatorName name of the `Mediator` to be removed.
     * @returns {Mediator} the `Mediator` that was removed from the `View`
     */
    removeMediator(mediatorName) {
        return this.view.removeMediator(mediatorName);
    }

    /**
     * Check if a Mediator is registered or not
     *
     * @param {string} mediatorName
     * @returns {Mediator} whether a Mediator is registered with the given `mediatorName`.
     */
    hasMediator(mediatorName) {
        return this.view.hasMediator(mediatorName);
    }

    /**
     * Retrieve an `Mediator` from the `View`.
     *
     * @param {string} mediatorName
     * @returns {Mediator} the `Mediator` previously registered with the given `mediatorName`.
     */
    retrieveMediator(mediatorName) {
        return this.view.retrieveMediator(mediatorName);
    }

    /**
     * Create and send an `Notification`.
     *
     * <P>Keeps us from having to construct new notification
     * instances in our implementation code.</P>
     *
     * @param {string} notificationName the name of the notiification to send
     * @param {Object} [body] body the body of the notification (optional)
     * @param {string} [type] type the type of the notification (optional)
     */
    sendNotification(notificationName, body = null, type = "") {
        this.notifyObservers(new Notification(notificationName, body, type));
    }

    /**
     * Notify `Observer`s.
     *
     * <P>This method is left public mostly for backward
     * compatibility, and to allow you to send custom
     * notification classes using the facade.</P>
     *
     * <P>Usually you should just call sendNotification
     * and pass the parameters, never having to
     * construct the notification yourself.</P>
     *
     * @param {Notification} notification the `Notification` to have the `View` notify `Observers` of.
     */
    notifyObservers(notification) {
        this.view.notifyObservers(notification);
    }

    /**
     * Set the Multiton key for this facade instance.
     *
     * <P>Not called directly, but instead from the
     * constructor when getInstance is invoked.
     * It is necessary to be public in order to
     * implement Notifier.</P>
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    }

    /**
     * Check if a Core is registered or not
     *
     * @static
     * @param {string} key the multiton key for the Core in question
     * @returns {boolean} whether a Core is registered with the given `key`.
     */
    static hasCore(key) {
        return this.instanceMap.has(key);
    }

    /**
     * Remove a Core.
     *
     * <P>Remove the Model, View, Controller and Facade
     * instances for the given key.</P>
     *
     * @static
     * @param {string} key multitonKey of the Core to remove
     */
    static removeCore(key) {
        if (Facade.instanceMap.get(key) == null) return;
        Model.removeModel(key);
        View.removeView(key);
        Controller.removeController(key);
        this.instanceMap.delete(key);
    }

    /**
     * Message Constants
     *
     * @static
     * @returns {string}
     */
    static get MULTITON_MSG() {return "Facade instance for this Multiton key already constructed!"};
}

/*
 *  Notifier.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A Base `Notifier` implementation.
 *
 * <P>`MacroCommand, Command, Mediator` and `Proxy`
 * all have a need to send `Notifications`.<P>
 *
 * <P>The `Notifier` interface provides a common method called
 * `sendNotification` that relieves implementation code of
 * the necessity to actually construct `Notifications`.</P>
 *
 * <P>The `Notifier` class, which all of the above mentioned classes
 * extend, provides an initialized reference to the `Facade`
 * Multiton, which is required for the convenience method
 * for sending `Notifications`, but also eases implementation as these
 * classes have frequent `Facade` interactions and usually require
 * access to the facade anyway.</P>
 *
 * <P>NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey.</P>
 *
 * The multitonKey is set:
 *   * on a Command when it is executed by the Controller
 *   * on a Mediator is registered with the View
 *   * on a Proxy is registered with the Model.
 *
 * @see Proxy Proxy
 * @see Facade Facade
 * @see Mediator Mediator
 * @see MacroCommand MacroCommand
 * @see SimpleCommand SimpleCommand
 *
 * @class Notifier
 */
class Notifier {

    constructor() {}

    /**
     * Create and send an `Notification`.
     *
     * <P>Keeps us from having to construct new Notification
     * instances in our implementation code.</P>
     *
     * @param {string} notificationName
     * @param {Object} [body] body
     * @param {string} [type] type
     */
    sendNotification (notificationName, body = null, type = "") {
        if (this.facade != null) {
            this.facade.sendNotification(notificationName, body, type);
        }
    }

    /**
     * Initialize this Notifier instance.
     *
     * <P>This is how a Notifier gets its multitonKey.
     * Calls to sendNotification or to access the
     * facade will fail until after this method
     * has been called.</P>
     *
     * <P>Mediators, Commands or Proxies may override
     * this method in order to send notifications
     * or access the Multiton Facade instance as
     * soon as possible. They CANNOT access the facade
     * in their constructors, since this method will not
     * yet have been called.</P>
     *
     * @param {string} key the multitonKey for this Notifier to use
     */
    initializeNotifier(key) {
        this.multitonKey = key;
    }

    /**
     * Return the Multiton Facade instance
     *
     * @typedef {Facade} Facade
     *
     * @throws {Error}
     */
    get facade() {
        if (this.multitonKey == null) throw new Error(Notifier.MULTITON_MSG);
        return Facade.getInstance(this.multitonKey, key => new Facade(key));
    }

    /**
     * Message Constants
     *
     * @static
     * @returns {string}
     */
    static get MULTITON_MSG() { return "multitonKey for this Notifier not yet initialized!" }
}

/*
 *  SimpleCommand.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A base `Command` implementation.
 *
 * <P>Your subclass should override the `execute`
 * method where your business logic will handle the `Notification`.</P>
 *
 * @see Controller Controller
 * @see Notification Notification
 * @see MacroCommand MacroCommand
 *
 * @class SimpleCommand
 */
class SimpleCommand extends Notifier {

    constructor() {
        super();
    }

    /**
     * Fulfill the use-case initiated by the given `Notification`.
     *
     * <P>In the Command Pattern, an application use-case typically
     * begins with some user action, which results in an `Notification` being broadcast, which
     * is handled by business logic in the `execute` method of an
     * `Command`.</P>
     *
     * @param {Notification} notification
     */
    execute(notification) {

    }

}

/*
 *  MacroCommand.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A base `Command` implementation that executes other `Command`s.
 *
 * <P>A `MacroCommand` maintains a list of
 * `Command` Class references called <i>SubCommands</i>.</P>
 *
 * <P>When `execute` is called, the `MacroCommand`
 * instantiates and calls `execute` on each of its <i>SubCommands</i> turn.
 * Each <i>SubCommand</i> will be passed a reference to the original
 * `Notification` that was passed to the `MacroCommand`'s
 * `execute` method.</P>
 *
 * <P>Unlike `SimpleCommand`, your subclass
 * should not override `execute`, but instead, should
 * override the `initializeMacroCommand` method,
 * calling `addSubCommand` once for each <i>SubCommand</i>
 * to be executed.</P>
 *
 * @see Controller Controller
 * @see Notification Notification
 * @see SimpleCommand SimpleCommand
 *
 * @class MacroCommand
 */
class MacroCommand extends SimpleCommand {

    /**
     * Constructor.
     *
     * <P>You should not need to define a constructor,
     * instead, override the `initializeMacroCommand`
     * method.</P>
     *
     * <P>If your subclass does define a constructor, be
     * sure to call `super()`.</P>
     *
     * @constructor
     */
    constructor() {
        super();
        /** @protected
         * @type {Array.<function():SimpleCommand>} */
        this.subCommands = [];
        this.initializeMacroCommand();
    }

    /**
     * Initialize the `MacroCommand`.
     *
     * <P>In your subclass, override this method to
     * initialize the `MacroCommand`'s <i>SubCommand</i>
     * list with `Command` class references like
     * this:</P>
     *
     * <pre>`
     *		// Initialize MyMacroCommand
     *		initializeMacroCommand() {
     *			this.addSubCommand(() => new app.FirstCommand());
     *			this.addSubCommand(() => new app.SecondCommand());
     *			this.addSubCommand(() => new app.ThirdCommand());
     *		}
     * `</pre>
     *
     * <P>Note that <i>SubCommand</i>s may be any `Command` implementor,
     * `MacroCommand`s or `SimpleCommands` are both acceptable.
     */
    initializeMacroCommand() {

    }

    /**
     * Add a <i>SubCommand</i>.
     *
     * <P>The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.</P>
     *
     * @param {function():SimpleCommand} factory
     */
    addSubCommand(factory) {
        this.subCommands.push(factory);
    }

    /**
     * Execute this `MacroCommand`'s <i>SubCommands</i>.
     *
     * <P>The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.</P>
     *
     * @param {Notification} notification
     */
    execute(notification) {
        while(this.subCommands.length > 0) {
            let factory = this.subCommands.shift();
            let commandInstance = factory();
            commandInstance.initializeNotifier(this.multitonKey);
            commandInstance.execute(notification);
        }
    }

}

/*
 *  Mediator.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A base `Mediator` implementation.
 *
 * @see View View
 *
 * @class Mediator
 */
class Mediator extends Notifier {

    /**
     * Constructor.
     *
     * @constructor
     * @param {string} mediatorName
     * @param {Object} [viewComponent] viewComponent
     */
    constructor(mediatorName, viewComponent = null) {
        super();
        this._mediatorName = mediatorName || Mediator.NAME;
        this._viewComponent = viewComponent;
    }

    /**
     * Called by the View when the Mediator is registered
     */
    onRegister() {

    }

    /**
     * Called by the View when the Mediator is removed
     */
    onRemove() {

    }

    /**
     * List the `Notification` names this
     * `Mediator` is interested in being notified of.
     *
     * @returns {string[]}
     */
    listNotificationInterests() {
        return [];
    }

    /**
     * Handle `Notification`s.
     *
     * <P>
     * Typically this will be handled in a switch statement,
     * with one 'case' entry per `Notification`
     * the `Mediator` is interested in.
     *
     * @param {Notification} notification
     */
    handleNotification(notification) {

    }

    /**
     * the mediator name
     *
     * @returns {string}
     */
    get mediatorName() {
        return this._mediatorName;
    }

    /**
     * Get the `Mediator`'s view component.
     *
     * <P>
     * Additionally, an implicit getter will usually
     * be defined in the subclass that casts the view
     * object to a type, like this:</P>
     *
     * @returns {Object}
     */
    get viewComponent() {
        return this._viewComponent;
    }

    /**
     * Set the `Mediator`'s view component.
     *
     * @param {Object} viewComponent
     */
    set viewComponent(viewComponent) {
        this._viewComponent = viewComponent;
    }

    /**
     * The name of the `Mediator`.
     *
     * <P>Typically, a `Mediator` will be written to serve
     * one specific control or group controls and so,
     * will not have a need to be dynamically named.</P>
     *
     * @static
     * @returns {string}
     */
    static get NAME() { return "Mediator" }
}

/*
 *  Proxy.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


/**
 * A base `Proxy` implementation.
 *
 * <P>In PureMVC, `Proxy` classes are used to manage parts of the
 * application's data model. </P>
 *
 * <P>A `Proxy` might simply manage a reference to a local data object,
 * in which case interacting with it might involve setting and
 * getting of its data in synchronous fashion.</P>
 *
 * <P>`Proxy` classes are also used to encapsulate the application's
 * interaction with remote services to save or retrieve data, in which case,
 * we adopt an asynchronous idiom; setting data (or calling a method) on the
 * `Proxy` and listening for a `Notification` to be sent
 * when the `Proxy` has retrieved the data from the service. </P>
 *
 * @see Model Model
 *
 * @class Proxy
 */
class Proxy extends Notifier {
    /**
     * Constructor
     *
     * @constructor
     * @param {string} proxyName
     * @param {Object} [data]
     */
    constructor(proxyName, data = null) {
        super();
        /** @protected
         * @type {string} */
        this._proxyName = proxyName || Proxy.NAME;
        /** @protected
         * @type {Object} */
        this._data = data;
    }

    /**
     * Called by the Model when the Proxy is registered
     */
    onRegister() {}

    /**
     * Called by the Model when the Proxy is removed
     */
    onRemove() {}

    /**
     * Get the proxy name
     *
     * @returns {string}
     */
    get proxyName() {
        return this._proxyName;
    }

    /**
     * Get the data object
     *
     * @returns {Object}
     */
    get data () {
        return this._data;
    }

    /**
     * Set the data object
     *
     * @param {Object} data
     */
    set data(data) {
        this._data = data;
    }

    /**
     *
     * @static
     * @returns {string}
     */
    static get NAME() { return "Proxy" }
}

/*
 *  index.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/


const puremvc = {
    Controller, Model, View,
    SimpleCommand, MacroCommand, Facade,
    Mediator, Notification, Notifier, Observer, Proxy
};

exports.puremvc = puremvc;
