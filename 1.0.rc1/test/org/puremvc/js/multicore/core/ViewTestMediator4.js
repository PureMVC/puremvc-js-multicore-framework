ViewTestMediator4.prototype= new MediatorAdapter;
ViewTestMediator4.prototype.constructor= ViewTestMediator4;

/**
 * @type {string}
 * @const
 */
ViewTestMediator4.NAME= "ViewTestMediator4";

/** @override */
ViewTestMediator4.prototype.onRegister= function ()
{
    this.viewComponent.onRegisterCalled= true; 
};

/** @override */
ViewTestMediator4.prototype.onRemove= function ()
{
    this.viewComponent.onRemoveCalled= true; 
};

/**
 * 
 * @param {Object} view
 * @constructor
 * @extends {Mediator}
 */
function ViewTestMediator4 (view)
{
    Mediator.call(this, ViewTestMediator4.NAME, view);    
};
