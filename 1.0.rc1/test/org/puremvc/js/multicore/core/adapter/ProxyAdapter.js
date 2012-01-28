/**
 * @fileOverview
 * @author David Foley
 * @exports ProxyAdapter
 * @requires Proxy
 */

/**
 * An adapter class used to facilitate subclassing of Proxy by various
 * test units. This class does not constitute any part of the PureMVC library.
 * 
 * @constructor
 * @extends {Proxy}
 */
function ProxyAdapter () { };
ProxyAdapter.prototype= Proxy.prototype;
