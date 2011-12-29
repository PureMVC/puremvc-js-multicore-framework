
ViewTestMediator.prototype= new MediatorAdapter();
ViewTestMediator.prototype.constructor= ViewTestMediator;

/**
 * @type {string}
 * @const
 */
ViewTestMediator.NAME= "ViewTestMediator";

/** @override */
ViewTestMediator.prototype.listNotificationInterests= function ()
{
    return ["ABC", "DEF", "GHI"];    
};

/**
 * 
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator (view)
{
    Mediator.call(this, ViewTestMediator.NAME, view);    
};
