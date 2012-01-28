ViewTestMediator6.prototype= new MediatorAdapter;
ViewTestMediator6.prototype.constructor= ViewTestMediator6;

/**
 * @type {string}
 * @const
 */
ViewTestMediator6.NAME= "ViewTestMediator6";

/** @override */
ViewTestMediator6.prototype.listNotificationInterests= function ()
{
    return [ViewTestConstants.NOTE6];
};

/** @override */
ViewTestMediator6.prototype.handleNotification= function (note)
{
    this.getFacade().removeMediator(this.getMediatorName());
};

/** @override */
ViewTestMediator6.prototype.onRemove= function (note)
{
    this.viewComponent.counter++;
};

/**
 * 
 * @param {string} name
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator6 (name, view)
{
    Mediator.call(this, name, view);    
    // console.dir(view);
};
