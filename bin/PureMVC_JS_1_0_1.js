
function class_org_puremvc_js_core_Controller()
{
	Objs.register("org.puremvc.js.core.Controller",Controller);
	var View = Objs.load("org.puremvc.js.core.View");
	var Observer = Objs.load("org.puremvc.js.patterns.observer.Observer");
	var IController = Objs.load("org.puremvc.js.interfaces.IController");
	function Controller()
	{
		if(Objs.extending) return;
		if(Controller._instance != null)
			throw new Error(Controller._SINGLETON_MSG);
		Controller._instance = this;
		this._commandMap = new Array();
		this._initializeController();
	}
	Objs.implement(Controller,IController);
	var o = Controller.prototype;
	o._view = null;
	o._commandMap = null;
	Controller._instance    = null;
	Controller._SINGLETON_MSG = "Controller Singleton already constructed!";
	o._initializeController = function()
	{
		this._view = View.getInstance();
	}
	Controller.getInstance = function()
	{
		if(Controller._instance == null)
			Controller._instance = new Controller();
		return Controller._instance;
	}
	o.executeCommand = function(note)
	{
		var commandClassRef = this._commandMap[ note.getName() ];
		if(commandClassRef == null)
			return;
		var commandInstance = new commandClassRef();
		commandInstance.execute( note );
	}
	o.registerCommand = function(notificationName, commandClassRef)
	{
		var that = this;
		var f =  function(note){ that.executeCommand(note)}
		if(this._commandMap[notificationName] == null)
			this._view.registerObserver( notificationName, new Observer(f, this )   );
		this._commandMap[ notificationName ] = commandClassRef;
	}
	o.hasCommand = function(notificationName)
	{
		return this._commandMap[ notificationName ] != null;
	}
	o.removeCommand = function(notificationName)
	{
		if(this.hasCommand( notificationName ) )
		{
			this._view.removeObserver( notificationName, this );
			this._commandMap[ notificationName ] = null;
		}
	}
}


function class_org_puremvc_js_core_Model()
{
	Objs.register("org.puremvc.js.core.Model",Model);
	var IModel = Objs.load("org.puremvc.js.interfaces.IModel");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	function Model()
	{
		if(Objs.extending) return;
		if(Model._instance != null)
			throw Error(Model.SINGLETON_MSG);
		Model._instance = this;
		this._proxyMap = new Array();
		this._initializeModel();
	}
	Objs.implement(Model,IModel);
	var o = Model.prototype;
	o._proxyMap = null;
	Model._instance = null;
	Model._SINGLETON_MSG = "Model Singleton already constructed!";
	o._initializeModel = function()
	{
	}
	Model.getInstance = function()
	{
		if(Model._instance == null)
			Model._instance = new Model();
		return Model._instance;
	}
	o.registerProxy = function( proxy )
	{
		this._proxyMap[ proxy.getProxyName() ] = proxy;
		proxy.onRegister();
	}
	o.retrieveProxy = function( proxyName )
	{
		return this._proxyMap[ proxyName ];
	}
	o.hasProxy = function( proxyName )
	{
		return this._proxyMap[ proxyName ] != null;
	}
	o.removeProxy = function( proxyName )
	{
		var proxy = this._proxyMap [ proxyName ];
		if( proxy )
		{
			this._proxyMap[ proxyName ] = null;
			proxy.onRemove();
		}
		return proxy;
	}
}


function class_org_puremvc_js_core_View()
{
	Objs.register("org.puremvc.js.core.View",View);
	var IView = Objs.load("org.puremvc.js.interfaces.IView");
	var IObserver = Objs.load("org.puremvc.js.interfaces.IObserver");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Observer = Objs.load("org.puremvc.js.patterns.observer.Observer");
	function View()
	{
		if(Objs.extending) return;
		if(View._instance != null)
			throw Error(View._SINGLETON_MSG);
		View._instance = this;
		this._mediatorMap = new Array();
		this._observerMap = new Array();
		this._initializeView();
	}
	Objs.implement(View,IView);
	var o = View.prototype;
	o._mediatorMap = null;
	o._observerMap = null;
	View._instance = null;
	View._SINGLETON_MSG = "View Singleton already constructed!";
	o._initializeView = function()
	{
	}
	View.getInstance =  function()
	{
		if(View._instance == null)
			View._instance  = new View();
		return View._instance;
	}
	o.registerObserver = function( notificationName, observer )
	{
		var observers = this._observerMap[ notificationName ];
		if( observers )
			observers.push( observer );
		else
			this._observerMap[ notificationName ] = [ observer ];
	}
	o.notifyObservers = function( notification )
	{
		if( this._observerMap[ notification.getName() ] != null )
		{
			var observers = this._observerMap[ notification.getName() ];
			for(var i = 0; i<observers.length; i++)
			{
				var observer = observers[ i ];
				observer.notifyObserver( notification );
			}
		}
	}
	o.removeObserver = function( notificationName, notifyContext )
	{
		var observers = this._observerMap[ notificationName ];
		for( var i=0; i<observers.length; i++ )
		{
			if( Observer(observers[i]).compareNotifyContext( notifyContext ) == true )
			{
				observers.splice(i,1);
				break;
			}
		}
		if( observers.length == 0 )
			delete this._observerMap[ notificationName ];
	}
	o.registerMediator = function( mediator )
	{
		this._mediatorMap[ mediator.getMediatorName() ] = mediator;
		var interests = mediator.listNotificationInterests();
		if( interests.length>0 )
		{
			var observer = new Observer( mediator.handleNotification, mediator );
			for( var i=0; i<interests.length; i++ )
				this.registerObserver( interests[i],  observer );
		}
		mediator.onRegister();
	}
	o.retrieveMediator = function( mediatorName )
	{
		return this._mediatorMap[ mediatorName ];
	}
	o.removeMediator = function( mediatorName )
	{
		var mediator = this._mediatorMap[ mediatorName ];
		if( mediator )
		{
			var interests = mediator.listNotificationInterests();
			for( var i=0; i<interests.length; i++ )
			{
				this.removeObserver( interests[i], mediator );
			}
			delete this._mediatorMap[ mediatorName ];
			mediator.onRemove();
		}
		return mediator;
	}
	o.hasMediator = function( mediatorName )
	{
		return this._mediatorMap[ mediatorName ] != null;
	}
}


function class_org_puremvc_js_interfaces_ICommand()
{
	Objs.register("org.puremvc.js.interfaces.ICommand",ICommand);
	var o = ICommand.prototype;
	function ICommand(){}
	o.execute = function( notification ){};
}


function class_org_puremvc_js_interfaces_IController()
{
	Objs.register("org.puremvc.js.interfaces.IController",IController);
	var o = IController.prototype;
	function IController(){}
	o.registerCommand = function( notificationName, commandIControllerRef ){};
	o.executeCommand = function( notification ){};
	o.removeCommand = function( notificationName ){};
	o.hasCommand = function( notificationName ){};
}


function class_org_puremvc_js_interfaces_IFacade()
{
	Objs.register("org.puremvc.js.interfaces.IFacade",IFacade);
	var o = IFacade.prototype;
	function IFacade(){}
	o.registerProxy = function( proxy ){};
	o.retrieveProxy = function( proxyName ){};
	o.removeProxy = function( proxyName ){};
	o.hasProxy = function( proxyName ){};
	o.registerCommand = function( noteName, commandIFacadeRef ){};
	o.removeCommand = function( notificationName ){};
	o.hasCommand = function( notificationName ){};
	o.registerMediator = function( mediator ){};
	o.retrieveMediator = function( mediatorName ){};
	o.removeMediator = function( mediatorName ){};
	o.hasMediator = function( mediatorName ){};
	o.notifyObservers = function( notification ){};
}


function class_org_puremvc_js_interfaces_IMediator()
{
	Objs.register("org.puremvc.js.interfaces.IMediator",IMediator);
	var o = IMediator.prototype;
	function IMediator(){}
	o.getMediatorName = function(){};
	o.getViewComponent = function(){};
	o.setViewComponent = function( viewComponent ){};
	o.listNotificationInterests = function(){};
	o.handleNotification = function( notification ){};
	o.onRegister = function(){};
	o.onRemove = function(){};
}


function class_org_puremvc_js_interfaces_IModel()
{
	Objs.register("org.puremvc.js.interfaces.IModel",IModel);
	var o = IModel.prototype;
	function IModel(){}
	o.registerProxy = function( proxy ){};
	o.retrieveProxy = function( proxyName ){};
	o.removeProxy = function( proxyName ){};
	o.hasProxy = function( proxyName ){};
}


function class_org_puremvc_js_interfaces_INotification()
{
	Objs.register("org.puremvc.js.interfaces.INotification",INotification);
	var o = INotification.prototype;
	function INotification(){}
	o.getName = function(){};
	o.setBody = function( body ){};
	o.getBody = function(){};
	o.setType = function( type ){};
	o.getType = function(){};
	o.toString = function(){};
}


function class_org_puremvc_js_interfaces_INotifier()
{
	Objs.register("org.puremvc.js.interfaces.INotifier",INotifier);
	var	o =	INotifier.prototype;
	function INotifier(){}
	o.sendNotification = function( notificationName, body, type ){};
}


function class_org_puremvc_js_interfaces_IObserver()
{
	Objs.register("org.puremvc.js.interfaces.IObserver",IObserver);
	var o = IObserver.prototype;
	function IObserver(){}
	o.setNotifyMethod = function( notifyMethod ){};
	o.setNotifyContext = function( notifyContext ){};
	o.notifyObserver = function( notification ){};
	o.compareNotifyContext = function( object ){};
}


function class_org_puremvc_js_interfaces_IProxy()
{
	Objs.register("org.puremvc.js.interfaces.IProxy",IProxy);
	function IProxy(){}
	var o = IProxy.prototype;
	o.getProxyName = function(){};
	o.setData = function( data ){};
	o.getData = function(){};
	o.onRegister = function(){};
	o.onRemove = function(){};
}


function class_org_puremvc_js_interfaces_IView()
{
	Objs.register("org.puremvc.js.interfaces.IView",IView);
	function IView(){}
	var o = IView.prototype;
	o.registerObserver = function( notificationName, observer ){};
	o.removeObserver = function( notificationName, notifyContext ){};
	o.notifyObservers = function( note ){};
	o.registerMediator = function( mediator ){};
	o.retrieveMediator = function( mediatorName ){};
	o.removeMediator = function( mediatorName ){};
	o.hasMediator = function( mediatorName ){};
}


function class_org_puremvc_js_patterns_command_MacroCommand()
{
	Objs.register("org.puremvc.js.patterns.command.MacroCommand",MacroCommand);
	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	function MacroCommand()
	{
		Notifier.apply(this,arguments);
		if(Objs.extending) return;
		this._subCommands = new Array();
		this._initializeMacroCommand();
	}
	Objs.extend(MacroCommand,Notifier);
	Objs.implement(MacroCommand,ICommand);
	Objs.implement(MacroCommand,INotifier);
	var o = MacroCommand.prototype;
	o._subCommands = null;
	o._initializeMacroCommand = function()
	{
	}
	o._addSubCommand = function( commandClassRef )
	{
		this._subCommands.push(commandClassRef);
	}
	o.execute = function( notification )
	{
		while(this._subCommands.length>0)
		{
			var commandClassRef = this._subCommands.shift();
			var commandInstance = new commandClassRef();
			commandInstance.execute( notification );
		}
	}
}


function class_org_puremvc_js_patterns_command_SimpleCommand()
{
	Objs.register("org.puremvc.js.patterns.command.SimpleCommand",SimpleCommand);
	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	function SimpleCommand()
	{
		Notifier.apply(this,arguments);
		if(Objs.extending) return;
	}
	Objs.extend(SimpleCommand,Notifier);
	Objs.implement(SimpleCommand,ICommand);
	Objs.implement(SimpleCommand,INotifier);
	var o = SimpleCommand.prototype;
	o.execute = function( notification )
	{
	}
}


function class_org_puremvc_js_patterns_facade_Facade()
{
	Objs.register("org.puremvc.js.patterns.facade.Facade",Facade);
	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var IController = Objs.load("org.puremvc.js.interfaces.IController");
	var IModel = Objs.load("org.puremvc.js.interfaces.IModel");
	var IView = Objs.load("org.puremvc.js.interfaces.IView");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var Model = Objs.load("org.puremvc.js.core.Model");
	var View = Objs.load("org.puremvc.js.core.View");
	var Controller = Objs.load("org.puremvc.js.core.Controller");
	function Facade()
	{
		if(Objs.extending) return;
		if(Facade._instance != null)
			throw Error(Facade._SINGLETON_MSG);
		this._initializeFacade();
	}
	Objs.implement(Facade,IFacade);
	var o = Facade.prototype;
	o._controller = null;
	o._model = null;
	o._view = null;
	Facade._instance = null;
	Facade._SINGLETON_MSG = "Facade Singleton already constructed!";
	o._initializeFacade = function()
	{
		this._initializeModel();
		this._initializeController();
		this._initializeView();
	}
	Facade.getInstance = function()
	{
		if(Facade._instance == null)
			Facade._instance = new Facade();
		return Facade._instance;
	}
	o._initializeController = function()
	{
		if( this._controller != null )
			return;
		this._controller = Controller.getInstance();
	}
	o._initializeModel = function()
	{
		if( this._model != null )
			return;
		this._model = Model.getInstance();
	}
	o._initializeView = function()
	{
		if( this._view != null )
			return;
		this._view = View.getInstance();
	}
	o.registerCommand = function( notificationName, commandClassRef )
	{
		this._controller.registerCommand( notificationName, commandClassRef );
	}
	o.removeCommand = function( notificationName )
	{
		this._controller.removeCommand( notificationName );
	}
	o.hasCommand = function( notificationName )
	{
		return this._controller.hasCommand(notificationName);
	}
	o.registerProxy = function( proxy )
	{
		this._model.registerProxy( proxy );
	}
	o.retrieveProxy = function( proxyName )
	{
		return this._model.retrieveProxy( proxyName );
	}
	o.removeProxy = function( proxyName )
	{
		var proxy;
		if( this._model != null )
			proxy = this._model.removeProxy( proxyName );
		return proxy
	}
	o.hasProxy = function( proxyName )
	{
		return this._model.hasProxy( proxyName );
	}
	o.registerMediator = function( mediator )
	{
		if( this._view != null )
			this._view.registerMediator( mediator );
	}
	o.retrieveMediator = function( mediatorName )
	{
		return this._view.retrieveMediator( mediatorName );
	}
	o.removeMediator = function( mediatorName )
	{
		var mediator;
		if( this._view != null )
			mediator = this._view.removeMediator( mediatorName );
		return mediator;
	}
	o.hasMediator = function( mediatorName )
	{
		return this._view.hasMediator( mediatorName );
	}
	o.sendNotification = function( notificationName, body, type )
	{
		this.notifyObservers( new Notification( notificationName, body, type ) );
	}
	o.notifyObservers = function( notification )
	{
		if(this._view != null)
			this._view.notifyObservers( notification );
	}
}


function class_org_puremvc_js_patterns_mediator_Mediator()
{
	Objs.register("org.puremvc.js.patterns.mediator.Mediator",Mediator);
	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	Mediator.NAME = 'Mediator';
	function Mediator( mediatorName, viewComponent )
	{
		Notifier.apply(this,arguments);
		if(Objs.extending) return;
		this._mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
		this._viewComponent = viewComponent;
	}
	Objs.extend(Mediator,Notifier);
	Objs.implement(Mediator,IMediator);
	Objs.implement(Mediator,INotifier);
	var o = Mediator.prototype;
	o._mediatorName = null;
	o._viewComponent = null;
	o.getMediatorName = function()
	{
		return this._mediatorName;
	}
	o.setViewComponent = function( viewComponent )
	{
		this._viewComponent = viewComponent;
	}
	o.getViewComponent = function()
	{
		return this._viewComponent;
	}
	o.listNotificationInterests = function()
	{
		return [ ];
	}
	o.handleNotification = function( notification )
	{
	}
	o.onRegister = function()
	{
	}
	o.onRemove = function()
	{
	}
}


function class_org_puremvc_js_patterns_observer_Notification()
{
	Objs.register("org.puremvc.js.patterns.observer.Notification",Notification);
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	function Notification
	(
		name,
		body,
		type
	)
	{
		if(Objs.extending) return;
		this._name = name;
		this._body = body;
		this._type = type;
	}
	Objs.implement(Notification,INotification);
	var o = Notification.prototype;
	o._name = null;
	o._type = null;
	o._body = null;
	o.getName = function()
	{
		return this._name;
	}
	o.setBody = function( body )
	{
		this._body = body;
	}
	o.getBody = function()
	{
		return this._body;
	}
	o.setType = function( type )
	{
		this._type = type;
	}
	o.getType = function()
	{
		return this._type;
	}
	o.toString = function()
	{
		var msg = "Notification Name:" + this.getName();
		msg += "\nBody:" + (( this._body == null ) ? "null" : this._body.toString());
		msg += "\nType:" + (( this._type == null ) ? "null" : this._type);
		return msg;
	}
}


function class_org_puremvc_js_patterns_observer_Notifier()
{
	Objs.register("org.puremvc.js.patterns.observer.Notifier",Notifier);
	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var Facade = Objs.load("org.puremvc.js.patterns.facade.Facade");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	function Notifier()
	{
		if(Objs.extending) return;
		o._facade = Facade.getInstance();
	}
	Objs.implement(Notifier,INotifier);
	var o = Notifier.prototype;
	o._facade = null;
	o.sendNotification = function( notificationName, body, type )
	{
		this._facade.sendNotification( notificationName, body, type );
	}
}


function class_org_puremvc_js_patterns_observer_Observer()
{
	Objs.register("org.puremvc.js.patterns.observer.Observer",Observer);
	var IObserver = Objs.load("org.puremvc.js.interfaces.IObserver");
	function Observer(notifyMethod, notifyContext )
	{
		if(Objs.extending) return;
		this.setNotifyMethod( notifyMethod );
		this.setNotifyContext( notifyContext );
	}
	var o = Observer.prototype;
	o._notify = null;
	o._context = null;
	Objs.implement(Observer,IObserver);
	o.setNotifyMethod = function( notifyMethod )
	{
		this._notify = notifyMethod;
	}
	o.setNotifyContext = function( notifyContext )
	{
		this._context = notifyContext;
	}
	o.__getNotifyMethod = function()
	{
		return this._notify;
	}
	o.__getNotifyContext = function()
	{
		return this._context;
	}
	o.notifyObserver = function( notification )
	{
		this.__getNotifyMethod().apply(this.__getNotifyContext(),[notification]);
	}
	o.compareNotifyContext = function( object )
	{
		return object === this._context;
	}
}


function class_org_puremvc_js_patterns_proxy_Proxy()
{
	Objs.register("org.puremvc.js.patterns.proxy.Proxy",Proxy);
	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	function Proxy( proxyName, data )
	{
		Notifier.apply(this,arguments);
		if(Objs.extending) return;
		this._proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
		if(data != null)
			this.setData(data);
	}
	Objs.extend(Proxy,Notifier);
	Objs.implement(Proxy,IProxy);
	Objs.implement(Proxy,INotifier);
	var o = Proxy.prototype;
	Proxy.NAME = 'Proxy';
	o._proxyName = null;
	o._data = null ;
	o.getProxyName = function()
	{
		return this._proxyName;
	}
	o.setData = function( data )
	{
		this._data = data;
	}
	o.getData = function()
	{
		return this._data;
	}
	o.onRegister = function()
	{
	}
	o.onRemove = function()
	{
	}
}

