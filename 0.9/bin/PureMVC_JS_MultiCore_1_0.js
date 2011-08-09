/**
 * @fileOverview
 * @author David Foley | david@objectkit.com
 */

/**
 * An anonymous object scope is used to protect against
 * global variable leakage while we export the library classes
 * to the org.puremvc.js.multicore namespace
 * 
 * @constructor
 * @param {Object} scope
 */
new function (scope)
{
	// create the org.puremvc.js object hierarchy
	// if the hierarchy does not yet exist
	if (null == scope['org'])
	{
		scope.org= {};
	}
	
	if (null == scope['org']['puremvc'])
	{
		scope['org']['puremvc']= {};
	}
	
	if (null == scope['org']['puremvc']['js'])
	{
		scope['org']['puremvc']['js']= {};
	}
	
	// we have now established that at least the org.puremvc.js namespace
	// exists. Before continuing further, we test for the presence of the 
	// org.puremvc.js.multicore namespace to determine if the library has 
	// already been exported. If it has, we avoid exporting it again by 
	// exiting now.
	if (scope['org']['puremvc']['js']['multicore'])
	{
		return;	
	}

 	/* implementation begin */
	
	
/**
 * @fileOverview
 * @author David Foley
 * @exports Observer as org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
 * 
 * @param {Function} notifyMethod
 * @param {Object} notifyContext
 * @constructor
 * @implements org.puremvc.js.multicore.interfaces.IObserver
 */
function Observer (notifyMethod, notifyContext)
{
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
};

/**
 * 
 * @param {Function} notifyMethod
 * @return {void}
 */
Observer.prototype.setNotifyMethod= function (notifyMethod)
{
    this.notify= notifyMethod;
};

/**
 * 
 * @param {Object} notifyContext
 * @return {void}
 */
Observer.prototype.setNotifyContext= function (notifyContext)
{
    this.context= notifyContext;
};

/**
 * @return {Function}
 * @private
 */
Observer.prototype.getNotifyMethod= function ()
{
    return this.notify;
};

/**
 * @return {Function}
 * @private
 */
Observer.prototype.getNotifyContext= function ()
{
    return this.context;
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.INotification} notification
 * @return {void}
 */
Observer.prototype.notifyObserver= function (notification)
{
    this.getNotifyMethod().apply(this.getNotifyContext(), [notification]);
};

/**
 * 
 * @param {Object} object
 * @return {boolean}
 */
Observer.prototype.compareNotifyContext= function (object)
{
    return object === this.context;
};


/**
 * @private
 * @type {Function}
 */
Observer.prototype.notify= null;

/**
 * @private
 * @type {Function}
 */
Observer.prototype.context= null;
/**
 * @fileOverview
 * @exports Notification as org.puremvc.js.multicore.patterns.observer.Notification
 */

/**
 * @param {string} name
 * @param {Object} [body]
 * @param {Object} [type]
 * @constructor
 */
function Notification (name, body, type)
{
    this.name= name;
    this.body= body;
    this.type= type;
};

/**
 * @return {string}
 */
Notification.prototype.getName = function ()
{
    return this.name;
};

/**
 * 
 * @param {Object} body
 * @return {void}
 */
Notification.prototype.setBody = function (body)
{
    this.body= body;
};

/**
 * @return {Object|null}
 */
Notification.prototype.getBody = function ()
{
    return this.body
};

/**
 * 
 * @param {Object} type
 * @return {void}
 */
Notification.prototype.setType = function (type)
{
    this.type= type;
};

/**
 * @return {Object}
 */
Notification.prototype.getType = function ()
{
    return this.type;
};

/**
 * @override
 * @return {string}
 */
Notification.prototype.toString= function ()
{
    var msg = "Notification Name: "+this.getName();
    msg += "\nBody:"+(( this.body == null )?"null":this.body.toString());
    msg += "\nType:"+(( this.type == null )?"null":this.type);
    return msg;};

/**
 * @type {string}
 * @private
 */
Notification.prototype.name= null;

/**
 * @type {String}
 * @private
 */
Notification.prototype.type= null;

/**
 * @type {Object}
 * @private
 */
Notification.prototype.body= null;
/**
 * @fileOverview
 * @author David Foley
 * @exports Notifier as org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * 
 * @constructor
 * @implements org.puremvc.js.multicore.interfaces.INotifier
 */
function Notifier () { };

/**
 * 
 * @param {string} notificationName
 * @param {Object} [body]
 * @param {string} [type]
 * @return {void}
 */
Notifier.prototype.sendNotification= function (notificationName, body, type)
{
    var facade= this.getFacade();
    if (facade)
    {
        facade.sendNotification(notificationName, body, type);
    }
};

/**
 * 
 * @param {string} key
 * @return {void}
 */
Notifier.prototype.initializeNotifier= function (key)
{
    this.multitonKey= key;
};

/**
 * 
 * @protected
 * @return {org.puremvc.js.multicore.patterns.facade.Facade}
 */
Notifier.prototype.getFacade= function ()
{
    if (this.multitonKey == null)
    {
        throw new Error(Notifier.MULTITON_MSG);
    };
    
    return Facade.getInstance(this.multitonKey);
};

/**
 * 
 * @protected
 * @type string
 */
Notifier.prototype.multitonKey= null;

/**
 * 
 * @static
 * @protected
 * @const
 * @type string
 */
Notifier.MULTITON_MSG= "multitonKey for this Notifier not yet initialized!";
/**
 * @fileOverview
 * @author David Foley
 * @exports SimpleCommand as org.puremvc.js.multicore.patterns.command.SimpleCommand
 */

/**
 * 
 * @constructor
 * @implements org.puremvc.js.multicore.patterns.command.ICommand
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function SimpleCommand () { };

SimpleCommand.prototype= new Notifier;
SimpleCommand.prototype.constructor= SimpleCommand;

/**
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.command.ICommand#execute
 */
SimpleCommand.prototype.execute= function (notification) { };
/**
 * @fileOverview
 * @author David Foley
 * @exports MacroCommand as org.puremvc.js.multicore.patterns.command.MacroCommand
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 * @implements org.puremvc.js.multicore.patterns.command.ICommand
 */
function MacroCommand ()
{
    this.subCommands= [];
    this.initializeMacroCommand();    
};

/* subclass Notifier */
MacroCommand.prototype= new Notifier;
MacroCommand.prototype.constructor= MacroCommand;

/**
 * A list of SimpleCommand and MacroCommand constructors which will be
 * used to instantiate and execute commands as a result of executing this
 * MacroCommand
 * 
 * @type Array
 * @protected
 */
MacroCommand.prototype.subCommands= null;

/**
 * @protected
 * @return {void}
 */
MacroCommand.prototype.initializeMacroCommand= function ()
{
    return;    
};

/**
 * 
 * @param {Function} commandClassRef
 * @return {void}
 */
MacroCommand.prototype.addSubCommand= function (commandClassRef)
{
    this.subCommands.push(commandClassRef);
};

/**
 * TODO optimize implementation
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 * @return {void}
 */
MacroCommand.prototype.execute= function (note)
{	
    // SIC
    while(this.subCommands.length > 0)
    {
        var ref= this.subCommands.shift();
        var cmd= new ref;
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
    }

};
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
 * @implements org.puremvc.js.multicore.interfaces.IMediator
 * @implements org.puremvc.js.multicore.interfaces.INotifier
 */
function Mediator (mediatorName, viewComponent)
{
    this.mediatorName= mediatorName || this.constructor.NAME;
    this.viewComponent=viewComponent;  
    this.interests= [];
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
    return this.interests;
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
/**
 * @fileOverview
 * @author David Foley
 * @exports Proxy as org.puremvc.js.multicore.patterns.proxy.Proxy
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * 
 * @param {string} proxyName
 * @param {Object} data
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 * @implements org.puremvc.js.multicore.interfaces.IProxy
 * @implements org.puremvc.js.multicore.interfaces.INotifier
 */
function Proxy (proxyName, data)
{
    this.proxyName= proxyName || this.constructor.NAME;
    if (data != null)
    {
        this.setData(data);
    }
};

Proxy.prototype= new Notifier;
Proxy.prototype.constructor= Proxy;

/**
 * @return {string}
 */
Proxy.prototype.getProxyName= function ()
{
    return this.proxyName;
};

/**
 * 
 * @param {Object} data
 * @return {void}
 */
Proxy.prototype.setData= function (data)
{
    this.data= data;
};

/**
 * @return {Object|null}
 */
Proxy.prototype.getData= function ()
{
    return this.data;
};

/**
 * @return {void}
 */
Proxy.prototype.onRegister= function ()
{
    return;
};

/**
 * @return {void}
 */
Proxy.prototype.onRemove= function ()
{
    return;
};

/**
 * The proxy name.
 * 
 * @protected
 * @type String
 */
Proxy.prototype.proxyName= null;

/**
 * The data object.
 * 
 * @protected
 * @type Object
 */
Proxy.prototype.data= null;

/**
 * 
 * @static
 * @const
 * @type string
 */
Proxy.NAME= "Proxy";
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
 * @implements org.puremvc.js.multicore.interfaces.IFacade
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
 * @param {org.puremvc.js.multicore.interfaces.INotification} notification
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



/**
 * @fileOverview
 * @author David Foley
 * @exports View as org.puremvc.js.multicore.core.View
 */

/**
 * 
 * @param {string} key
 * @constructor
 * @see org.puremvc.js.multicore.core.View#getInstance
 * @see org.puremvc.js.multicore.patterns.IView
 */
function View (key)
{
    if (View.instanceMap[key] != null)
    {
        throw new Error(View.MULTITON_MSG);
    };
    
    this.multitonKey= key;
    View.instanceMap[this.multitonKey]= this;
    this.mediatorMap= [];
    this.observerMap= [];
    this.initializeView();
};

/**
 * @return {void}
 */
View.prototype.initializeView= function ()
{
    return;
};

/**
 * @static
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.View}
 */
View.getInstance= function (key)
{
    if (View.instanceMap[key] == null)
    {
        View.instanceMap[key]= new View(key);
    };
    
    return View.instanceMap[key];
};


/**
 * @param {string} notificationName
 * @param {org.puremvc.js.multicore.patterns.observer.Observer}
 * @return {void}
 */
View.prototype.registerObserver= function (notificationName, observer)
{
    if (this.observerMap[notificationName] != null)
    {
        this.observerMap[notificationName].push(observer);
    }
    else
    {
        this.observerMap[notificationName]= [observer];
    }
};

/**
 * @param {Object} notification
 * @return {void}
 */
View.prototype.notifyObservers= function (notification)
{
    // SIC
    if (this.observerMap[notification.getName()] != null)
    {
        var observers_ref= this.observerMap[notification.getName()]
        ,   observers= []
        ,   observer
        
        for (var i= 0; i < observers_ref.length; i++)
        {
            observer= observers_ref[i];
            observers.push(observer);
        }
        
        for (var i= 0; i < observers.length; i++)
        {
            observer= observers[i];
            observer.notifyObserver(notification);
        }
    }
};

/**
 * @param {string} notificationName
 * @param {Object} notifyContext
 * @return {void}
 */
View.prototype.removeObserver= function (notificationName, notifyContext)
{
    // SIC
    var observers= this.observerMap[notificationName];
    for (var i= 0; i < observers.length; i++)
    {
        if (observers[i].compareNotifyContext(notifyContext) == true)
        {
            observers.splice(i, 1);
            break;
        }
    }
    
    if (observers.length == 0)
    {
        delete this.observerMap[notificationName];
    }
};

/**
 * @return {void}
 */
View.prototype.registerMediator= function (mediator)
{
    // do not allow re-registration (you must to removeMediator fist)
    if (this.mediatorMap[mediator.getMediatorName()] != null)
    {
        return;
    }

    
    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()]= mediator;
    
    // get notification interests if any
    var interests= mediator.listNotificationInterests();
    
    // register mediator as an observer for each notification
    if (interests.length > 0)
    {
        // create observer referencing this mediators handleNotification method
        var observer= new Observer(mediator.handleNotification, mediator);
        for (var i= 0; i < interests.length; i++)
        {
            this.registerObserver(interests[i], observer);
        }
    }
    
    mediator.onRegister();
}

/**
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 */
View.prototype.retrieveMediator= function (mediatorName)
{
    return this.mediatorMap[mediatorName];    
};

/**
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 */
View.prototype.removeMediator= function (mediatorName)
{
    var mediator= this.mediatorMap[mediatorName];
    if (mediator)
    {
        // for every notification the mediator is interested in...
        var interests= mediator.listNotificationInterests();
        for (var i= 0; i < interests.length; i++)
        {
            // remove the observer linking the mediator to the notification 
            // interest
            this.removeObserver(interests[i], mediator);
        }
        
        // remove the mediator from the map
        delete this.mediatorMap[mediatorName];
        
        // alert the mediator that it has been removed
        mediator.onRemove();
    }
    
    return mediator;
};

/**
 * 
 * @param {string} mediatorName
 * @return {boolean}
 */
View.prototype.hasMediator= function (mediatorName)
{
    return this.mediatorMap[mediatorName] != null;
};

/**
 * Remove an IView instance.
 * 
 * @param {string} key
 * @return {void}
 */
View.removeView= function (key)
{
    delete View.instanceMap[key];    
};

/**
 * Mapping of mediator names to mediator instances
 * 
 * @type Array
 * @protected
 */
View.prototype.mediatorMap= null;

/**
 * Mapping of Notification names to Observer lists
 * 
 * @type Array
 * @protected
 */
View.prototype.observerMap= null;

/**
 * Singleton instance
 * 
 * @type Array
 * @protected
 */
View.instanceMap= [];

/**
 * The multiton key for this Core
 * 
 * @type string
 * @protected
 */
View.prototype.multitonKey= null;

/**
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG= "View instance for this Multiton key already constructed!";
/**
 * @fileOverview
 * @exports Model as org.puremvc.js.multicore.core.Model
 * @author David Foley
 */

/**
 * 
 * @param {string} key
 * @constructor
 * @throws {Error}
 * @see org.puremvc.js.multicore.core.Model.getInstance
 * @see org.puremvc.js.multicore.interfaces.IModel
 */
function Model (key)
{
    if (Model.instanceMap[key])
    {
        throw new Error (Model.MULTITON_MSG);
    }
    
    this.multitonKey= key;
    Model.instanceMap[key]= this;
    this.proxyMap= [];
    this.initializeModel();
};

/**
 * 
 */
Model.prototype.initializeModel= function ()
{
    return;
};

/**
 * 
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.Model}
 * @static
 * @throws {Error}
 */
Model.getInstance= function (key)
{
    if (Model.instanceMap[key] == null)
    {
        Model.instanceMap[key]= new Model(key);
    }  
    
    return Model.instanceMap[key];
};

/**
 * 
 * @param {org.puremvc.js.multicore.interfaces.IProxy} proxy
 * @return {void}
 */
Model.prototype.registerProxy= function (proxy)
{
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()]= proxy;
    proxy.onRegister();
};

/**
 * 
 * @param {string} proxyName
 * @return {org.puremvc.js.multicore.interfaces.IProxy|null}
 */
Model.prototype.retrieveProxy= function (proxyName)
{
    return this.proxyMap[proxyName];    
};

/**
 * 
 * @param {string} proxyName
 * @return {boolean}
 */
Model.prototype.hasProxy= function (proxyName)
{
    return this.proxyMap[proxyName] != null;
};


/**
 * 
 * @param {string} proxyName
 * @returns {org.puremvc.js.multicore.interfaces.IProxy|null}
 */
Model.prototype.removeProxy= function (proxyName)
{
    var proxy= this.proxyMap[proxyName];
    if (proxy)
    {
        this.proxyMap[proxyName]= null;
        proxy.onRemove();
    }
    
    return proxy;
};

/**
 * 
 * @param {string} key
 * @return {void}
 * @static
 */
Model.removeModel= function (key)
{
    delete Model.instanceMap[key];
};

/**
 * @type Array
 * @protected
 */
Model.prototype.proxyMap= null;

/**
 * @type Array
 * @protected
 */
Model.instanceMap= [];

/**
 * @type string
 * @protected
 */
Model.prototype.multitonKey;

/**
 * 
 * @type string
 * @protected
 * @const
 * @static
 */
Model.MULTITON_MSG= "Model instance for this Multiton key already constructed!";


/**
 * @fileOverview
 * @author David Foley
 * @exports Controller as org.puremvc.js.multicore.core.Controller
 * @requires org.puremvc.js.multicore.core.View
 * @requires org.puremvc.js.multicore.patterns.observer.Notification
 * @requires org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
 * An <code>IController</code> implemented as a multiton.
 *
 * <p>
 *  In PureMVC, the <code>Controller</code> class follows the 'Command and
 *  Controller' strategy, and assumes these responsibilities:
 * </p>
 *  <ul>
 *      <li>
 *          Remembering which <code>ICommand</code>s are intended to handle
 *          which which <code>INotifications</code>
 *      </li>
 *      <li>
 *          Registering itself as an <code>IObserver</code> with the
 *          <code>View</code> for each <code>INotification</code> that it has
 *          an <code>ICommand</code> mapping for.
 *      </li>
 *      <li>
 *          Creating a new instance of the proper <code>ICommand</code> to
 *          handle a given <code>INotification</code> when notified by the
 *          <code>IView</code>
 *      </li>
 *      <li>
 *          Calling the <code>ICommands</code>s <code>execute</code> method
 *          passing in the <code>INotification</code>
 *      </li>
 * </ul>
 *
 * <p>
 *  Your application must register <code>ICommand</code>s with the Controller.
 * </p>
 * <p>
 *  The simplest way is to subclass <code>Facade</code> and use its
 *  <code>initializeController</code> method to add to your registrations.
 * </p>
 *
 * @param {string} key
 * @constructor
 * @throws {Error}
 * @see org.puremvc.js.multicore.core.Controller#getInstance
 * @see org.puremvc.js.multicore.core.Facade#initializeController
 * @see org.puremvc.js.multicore.interfaces.IController
 * @see org.puremvc.js.multicore.core.View
 * @see org.puremvc.js.multicore.patterns.observer.Observer
 * @see org.puremvc.js.multicore.patterns.observer.Notification
 * @see org.puremvc.js.multicore.patterns.command.SimpleCommand
 * @see org.puremvc.js.multicore.patterns.command.MacroCommand
 */
function Controller (key)
{
	if (Controller.instanceMap[key] != null)
	{
		throw new Error(Controller.MULTITON_MSG);
	}

	this.multitonKey= key;
	Controller.instanceMap[this.multitonKey]= this;
	this.commandMap= new Array();
	this.initializeController();
}

/**
 * @protected
 * @return {void}
 */
Controller.prototype.initializeController= function ()
{
	this.view= View.getInstance(this.multitonKey);
};

/**
 *
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.Controller}
 * @static
 * @throws {Error}
 */
Controller.getInstance= function (key)
{
	if (null == this.instanceMap[key])
	{
		this.instanceMap[key]= new this(key);
	}

	return this.instanceMap[key];
};

/**
 *
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 * @return {void}
 */
Controller.prototype.executeCommand= function(note)
{
	var commandClassRef= this.commandMap[note.getName()];
	if (commandClassRef == null)
		return;

	var commandInstance= new commandClassRef();
	commandInstance.initializeNotifier(this.multitonKey);
	commandInstance.execute(note);
};

/**
 *
 * @param {string} notificationName
 * @param {Function} commandClassRef
 * @return {void}
 */
Controller.prototype.registerCommand= function (notificationName, commandClassRef)
{
	if (this.commandMap[notificationName] == null)
	{
		this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
	}

	this.commandMap[notificationName]= commandClassRef;
};

/**
 *
 * @param {string} notificationName
 * @return {boolean}
 */
Controller.prototype.hasCommand= function (notificationName)
{
	return this.commandMap[notificationName] != null;
};

/**
 * Remove any Command / notification name associations previously registered with
 * this Controller
 * by association
 *
 * @param {string} notificationName
 * @return {void}
 */
Controller.prototype.removeCommand= function (notificationName)
{
	if(this.hasCommand(notificationName))
	{
		this.view.removeObserver(notificationName, this);
		this.commandMap[notificationName]= null;
	}
};

/**
 *
 *
 * @param {string} key
 * @return {void}
 */
Controller.removeController= function (key)
{
	delete this.instanceMap[key];
};

/**
 * Local reference to view.
 *
 * @type org.puremvc.js.multicore.core.View
 * @protected
 */
Controller.prototype.view;

/**
 * Mapping of notification names to Command class references
 *
 * @type Object
 * @protected
 */
Controller.prototype.commandMap;

/**
 * The multiton key for this Core.
 *
 * @type string
 * @protected
 */
Controller.prototype.multitonKey;

/**
 * Multion instances.
 *
 * @type Object
 * @protected
 * @ignore
 * @static
 */
Controller.instanceMap= [];

/**
 * The multiton error message thrown by the constructor in cases of instantiation
 * error.
 *
 * @static
 * @const
 * @type string
 */
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"
	
 	/* implementation end */
 	 
	// export the library classes to the
	// org.puremvc.js.multicore namespace
	scope['org']['puremvc']['js']['multicore']=
	{
		'core':
		{
			'View': View
		,	'Model': Model
		,	'Controller': Controller
		}
		
	,	'patterns':
		{
			'command':
			{
				'SimpleCommand': SimpleCommand
			,	'MacroCommand': MacroCommand
			}
		,
			'facade':
			{
				'Facade': Facade
			}
			
		,	'mediator':
			{
				'Mediator': Mediator
			}
			
		,	'observer':
			{
				'Observer': Observer
			,	'Notification': Notification
			,	'Notifier': Notifier
			}
			
		,	'proxy':
			{
				'Proxy': Proxy
			}
		}
	};
}(this); // the 'this' parameter will resolve to global scope in all environments
