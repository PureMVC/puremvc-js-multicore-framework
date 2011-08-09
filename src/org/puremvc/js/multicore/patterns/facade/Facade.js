/**
 * @fileOverview
 * @author David Foley
 * @exports Facade as org.puremvc.js.multicore.patterns.facade.Facade
 * @requires org.puremvc.js.multicore.core.Controller
 * @requires org.puremvc.js.multicore.core.Model
 * @reqruies org.puremvc.js.multicore.patterns.observer.Notification
 */

/**
 * 
 * @param {string} key
 * @constructor
 * @throws {Error}
 */
function Facade (key)
{
    if (Facade.instanceMap[key] != null)
    {
        throw new Error (Facade.MULTITON_MSG);
    }    
    
    this.initializeNotifier(key);
    Facade.instanceMap[key]= this;
    this.initializeFacade();
};

/**
 * @protected
 * @return {void}
 */
Facade.prototype.initializeFacade= function ()
{
    this.initializeModel();
    this.initializeController();
    this.initializeView();
};

/**
 * 
 * @param {string} key
 * @return {org.puremvc.js.multicore.patterns.facade.Facade}
 * @throws {Error}
 */
Facade.getInstance= function (key)
{
    if (Facade.instanceMap[key] == null)
    {
        Facade.instanceMap[key]= new Facade(key);
    }
    
    return Facade.instanceMap[key];
};

/**
 * @protected
 * @return {void}
 */
Facade.prototype.initializeController= function ()
{
    if (this.controller != null)
        return;
        
    this.controller= Controller.getInstance(this.multitonKey);
};

/**
 * @protected 
 * @return {void}
 */
Facade.prototype.initializeModel= function ()
{
    if (this.model != null)
        return;
        
    this.model= Model.getInstance(this.multitonKey);
};

/**
 * @protected
 * @return {void}
 */
Facade.prototype.initializeView= function ()
{
    if (this.view != null)
        return;
        
    this.view= View.getInstance(this.multitonKey);
};

/**
 * 
 * @param {string} notificationName
 * @param {Function} commandClassRef
 * @return {void}
 */
Facade.prototype.registerCommand= function (notificationName, commandClassRef)
{
    this.controller.registerCommand(notificationName, commandClassRef);
};

/**
 * 
 * @param {string} notificationName
 * @return {void}
 */
Facade.prototype.removeCommand= function (notificationName)
{
    this.controller.removeCommand(notificationName);
};

/**
 * 
 * @param {string} notificationName
 * @remove {boolean}
 */
Facade.prototype.hasCommand= function (notificationName)
{
    return this.controller.hasCommand(notificationName);
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.IProxy} proxy
 * @return {void}
 */
Facade.prototype.registerProxy= function (proxy)
{
    this.model.registerProxy(proxy);
};

/**
 * 
 * @param {string} proxyName
 * @return {org.puremvc.js.multicore.interfaces.IProxy}
 */
Facade.prototype.retrieveProxy= function (proxyName)
{
    return this.model.retrieveProxy(proxyName);
};

/**
 * 
 * @param {string} proxyName
 * @return {org.puremvc.js.multicore.interfaces.IProxy}
 */
Facade.prototype.removeProxy= function (proxyName)
{
    var proxy= null;
    if (this.model != null)
    {
        proxy= this.model.removeProxy(proxyName);
    }
    
    return proxy;
};

/**
 * 
 * @param {string} proxyName
 * @return {boolean}
 */
Facade.prototype.hasProxy= function (proxyName)
{
    return this.model.hasProxy(proxyName);
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.IMediator} mediator
 * @return {void}
 */
Facade.prototype.registerMediator= function (mediator)
{
    if (this.view != null)
    {
        this.view.registerMediator(mediator);
    }
};

/**
 * 
 * @param {string} mediatorName
 * @return {org.puremvc.js.multicore.interfaces.IMediator}
 */
Facade.prototype.retrieveMediator= function (mediatorName)
{
    return this.view.retrieveMediator(mediatorName);
};

/**
 * 
 * @param {string} mediatorName
 * @return {org.puremvc.js.multicore.interfaces.IMediator}
 */
Facade.prototype.removeMediator= function (mediatorName)
{
    var mediator= null;
    if (this.view != null)
    {
        mediator= this.view.removeMediator(mediatorName);
    }
    
    return mediator;
};

/**
 * 
 * @param {string} mediatorName
 * @return {boolean}
 */
Facade.prototype.hasMediator= function (mediatorName)
{
    return this.view.hasMediator(mediatorName);
};

/**
 * 
 * @param {string} notificationName
 * @param {Object} [body]
 * @param {string} [type]
 * @return {void}
 */
Facade.prototype.sendNotification= function (notificationName, body, type)
{
    this.notifyObservers(new Notification(notificationName, body, type));
};

/**
 * 
 * @param {org.puremvc.js.multicore.patterns.command.Notification} notification
 * @return {void}
 */
Facade.prototype.notifyObservers= function (notification)
{
    if (this.view != null)
    {
        this.view.notifyObservers(notification);
    }
};

/**
 * 
 * @param {string} key
 * @return {void}
 */
Facade.prototype.initializeNotifier= function (key)
{
    this.multitonKey= key;
};

/**
 * 
 * @param {string} key
 * @return {boolean}
 * @static
 */
Facade.hasCore= function (key)
{
    return Facade.instanceMap[key] != null;
};

/**
 * 
 * @param {string} key
 * @return {void}
 * @static
 */
Facade.removeCore= function (key)
{
    if (Facade.instanceMap[key] == null)
        return;
        
    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete Facade.instanceMap[key];
};

/**
 * 
 * @protected
 * @type org.puremvc.js.multicore.core.Controller
 */
Facade.prototype.controller= null;

/**
 * @protected
 * @type org.puremvc.js.multicore.core.Model
 */
Facade.prototype.model= null;

/**
 * @protected
 * @type org.puremvc.js.multicore.core.View
 */
Facade.prototype.view= null;

/**
 * @protected
 * @type string
 */
Facade.prototype.multitonKey= null;

/**
 * @protected
 * @type Array
 */
Facade.instanceMap= [];

/**
 * @protected
 * @type {string}
 * @const
 * @static
 */
Facade.MULTITON_MSG= "Facade instance for this Multiton key already constructed!";

