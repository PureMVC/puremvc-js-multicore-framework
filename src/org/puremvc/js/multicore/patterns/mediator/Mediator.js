/**
 * @fileOverview
 * @author David Foley
 * @exports Mediator as org.puremvc.js.multicore.patterns.mediator.Mediator
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * The Mediators name. Just as with Proxy's, its common practice for Mediators
 * to define their name as a static property.
 * 
 * @example
 * ButtonMediator.NAME= 'buttonMediator';
 * 
 * @type String
 * @const
 * @static
 */
Mediator.NAME= "Mediator";

/**
 * Create a new Mediator to mediate between a view component and the rest of the
 * PureMVC actors.
 * 
 * 
 * @param {string} [mediatorName]
 *  The Mediators name. If not supplied, the Mediator will use its own static
 *  NAME property
 * @param {Object} [viewComponent]
 *  The Mediators view component.
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 * @see #setViewComponent
 */
function Mediator (mediatorName, viewComponent)
{
    this.mediatorName= mediatorName || this.constructor.NAME;
    this.viewComponent=viewComponent;  
};

/* subclass */
Mediator.prototype= new Notifier;
Mediator.prototype.constructor= Mediator;

/**
 * Determine the Mediators name.
 * 
 * @return {String}
 */
Mediator.prototype.getMediatorName= function ()
{
    return this.mediatorName;
};

/**
 * Set the Mediators view component. A view component could be a HTMLElement
 * retrieved using the DOM API, or an object produced by a DOM abstraction 
 * library such as MooTools or JQuery.
 * 
 * @param {Object} viewComponent
 * @return {void}
 */
Mediator.prototype.setViewComponent= function (viewComponent)
{
    this.viewComponent= viewComponent;
};

/**
 * Get the Mediators view component
 * 
 * @return {Object}
 */
Mediator.prototype.getViewComponent= function ()
{
    return this.viewComponent;
};

/**
 * Determine which notifications the Mediator is interested in. Once a Mediator
 * is registered with a Views, its #handleNotification method is invoked once
 * a matching notification is dispatched through the actors.
 * 
 * @return {Array.<String>}
 * @see #handleNotification
 */
Mediator.prototype.listNotificationInterests= function ()
{
    return [];
};

/**
 * The method invoked when a notification matching a notification interest is
 * dispatched. Typically speaking, notification handling is managed within a
 * switch statement, rather than delegating out to other methods.
 * 
 * @protected
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 */
Mediator.prototype.handleNotification= function (notification)
{
    return;
};

/**
 * The method invoked when the Mediator is registered with a View.
 * 
 * @protected
 * @return {void}
 */
Mediator.prototype.onRegister= function ()
{
    return;
};

/**
 * The method invoked when the Mediator is removed from a View.
 * 
 * @protected
 * @return void
 */
Mediator.prototype.onRemove= function ()
{
    return;
};

/**
 * The Mediators name. Should only be accessed by Mediator subclasses.
 * 
 * @protected
 * @type string
 */
Mediator.prototype.mediatorName= null;

/**
 * The Mediators viewComponent. Should only be accessed by Mediator subclasses.
 * 
 * @protected
 * @type Object
 */
Mediator.prototype.viewComponent=null;
