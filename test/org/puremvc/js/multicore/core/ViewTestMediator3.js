ViewTestMediator3.prototype= new MediatorAdapter;
ViewTestMediator3.prototype.constructor= ViewTestMediator3;

/**
 * @type {string}
 * @const
 */
ViewTestMediator3.NAME= "ViewTestMediator3";

/** @override */
ViewTestMediator3.prototype.listNotificationInterests= function ()
{
    // be sure that the mediator has some Observers created
    // in order to test removeMediator
    return [ViewTestConstants.NOTE3];    
};

/** @override */
ViewTestMediator3.prototype.handleNotification= function (notification)
{
    this.viewComponent.lastNotification= notification.getName();    
};

/**
 * 
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator3 (view)
{
    Mediator.call(this, ViewTestMediator3.NAME, view);    
};
