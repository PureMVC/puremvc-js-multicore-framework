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
export { Model }