/*
 *  Proxy.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import {Notifier} from "../observer/Notifier.js";

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
export { Proxy }
