/**
 * @fileOverview
 * @author David Foley
 * @exports Mediator as org.puremvc.js.multicore.patterns.mediator.Mediator
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * The mediators name.
 * 
 * @type String
 * @const
 * @static
 */
Mediator.NAME= "Mediator";

/**
 * 
 * @param {string|null} mediatorName
 * @param {Object|null} viewComponent
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
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
 * @return {String}
 */
Mediator.prototype.getMediatorName= function ()
{
    return this.mediatorName;
};

/**
 * @param {Object} viewComponent
 * @return {void}
 */
Mediator.prototype.setViewComponent= function (viewComponent)
{
    this.viewComponent= viewComponent;
};

/**
 * @return {Object}
 */
Mediator.prototype.getViewComponent= function ()
{
    return this.viewComponent;
};

/**
 * @return {Array.<String>}
 */
Mediator.prototype.listNotificationInterests= function ()
{
    return [];
};

/**
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 */
Mediator.prototype.handleNotification= function (notification)
{
    return;
};

/**
 * @protected
 * @return {void}
 */
Mediator.prototype.onRegister= function ()
{
    return;
};

/**
 * @protected
 * @return void
 */
Mediator.prototype.onRemove= function ()
{
    return;
};

/**
 * @protected
 * @type string
 */
Mediator.prototype.mediatorName= null;

/**
 * @protected
 * @type Object
 */
Mediator.prototype.viewComponent=null;
