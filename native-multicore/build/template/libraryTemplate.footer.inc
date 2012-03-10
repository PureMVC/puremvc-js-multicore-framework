	
 	/* implementation end */
 	 
 	// define the puremvc global namespace and export the actors
 	scope.puremvc=
 	{
 		View: View
 	,	Model: Model
 	,	Controller: Controller
 	,	SimpleCommand: SimpleCommand
 	,	MacroCommand: MacroCommand
 	,	Facade: Facade
 	,	Mediator: Mediator
 	,	Observer: Observer
 	,	Notification: Notification
 	,	Notifier: Notifier
 	,	Proxy: Proxy
 	,	define: define
 	,	declare: declare
 	}; 
 	
})(this); // the 'this' parameter will resolve to global scope in all environments
