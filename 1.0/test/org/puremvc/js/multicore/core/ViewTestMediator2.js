
ViewTestMediator2.prototype= new MediatorAdapter;
ViewTestMediator2.prototype.constructor= ViewTestMediator2;

/**
 * @type {string}
 * @const
 */
ViewTestMediator2.NAME= "ViewTestMediator2";

/** @override */
ViewTestMediator2.prototype.listNotificationInterests= function ()
{
    return [ViewTestConstants.NOTE1, ViewTestConstants.NOTE2];    
};

/** @override */
ViewTestMediator2.prototype.handleNotification= function (notification)
{
    // console.log("ViewTestMediator2.handleNotification: " + notification);
    this.viewComponent.lastNotification= notification.getName();    
};

/**
 * 
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator2 (view)
{
    Mediator.call(this, ViewTestMediator2.NAME, view);    
};


