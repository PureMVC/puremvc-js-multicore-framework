/**
 * @fileOverview
 * @author David Foley
 * @exports MediatorAdpater
 * @requires Mediator
 */

/**
 * An adapter class used to facilitate subclassing of Mediator by various
 * test units. This class does not constitute any part of the PureMVC library.
 * 
 * @constructor
 * @extends {Proxy}
 */
function MediatorAdapter () {};
MediatorAdapter.prototype= Mediator.prototype;