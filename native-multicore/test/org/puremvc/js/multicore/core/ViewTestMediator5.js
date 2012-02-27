ViewTestMediator5.prototype= new MediatorAdapter;
ViewTestMediator5.prototype.constructor= ViewTestMediator5;

/**
 * @type {string}
 * @const
 */
ViewTestMediator5.NAME= "ViewTestMediator5";

/** @override */
ViewTestMediator5.prototype.listNotificationInterests= function ()
{
    return [ViewTestConstants.NOTE5];
};

/** @override */
ViewTestMediator5.prototype.handleNotification= function (note)
{
    this.viewComponent.counter++;
};

/**
 * 
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator5 (view)
{
    Mediator.call(this, ViewTestMediator5.NAME, view);    
};
