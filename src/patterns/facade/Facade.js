/*
 *  Facade.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import {Controller} from "../../core/Controller.js";
import {Model} from "../../core/Model.js";
import {View} from "../../core/View.js";
import {Notification} from "../observer/Notification.js";

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
export { Facade }
