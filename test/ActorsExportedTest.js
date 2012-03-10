
TestCase
(
	'ActorsExportedTest'

,	{
		/**
		 * Ensures that the library file correctly exports PureMVC actors to
		 * correct namespaces.
		 */
		testLibraryNamespacesDefined: function ()
		{
		    
			assertNotNull('The puremvc namespace is defined', window.puremvc);
			
			
			assertInstanceOf('Model is defined', Function, puremvc.Model);
			assertInstanceOf('View is defined', Function, puremvc.View);
			assertInstanceOf('Controller is defined', Function, puremvc.Controller);
			assertInstanceOf('Proxy is defined', Function, puremvc.Proxy);
			assertInstanceOf('Observer is defined', Function, puremvc.Observer);
			assertInstanceOf('Notifier is defined', Function, puremvc.Notifier);
			assertInstanceOf('Notification is defined', Function, puremvc.Notification);
			assertInstanceOf('Mediator is defined', Function, puremvc.Mediator);
			assertInstanceOf('Facade is defined', Function, puremvc.Facade);
			assertInstanceOf('SimpleCommand is defined', Function, puremvc.SimpleCommand);
			assertInstanceOf('MacroCommand is defined', Function, puremvc.MacroCommand);
			assertInstanceOf('define is defined', Function, puremvc.define);
			assertInstanceOf('declare is defined', Function, puremvc.declare);
			         
			// for convenience during testing, Help.exportPureMvcActors() is
			// used to export otherwise namespaced classes to the global scope

			assertInstanceOf('Model is defined', Function, Model);
			assertInstanceOf('View is defined', Function, View);
			assertInstanceOf('Controller is defined', Function, Controller);
			assertInstanceOf('Proxy is defined', Function, Proxy);
			assertInstanceOf('Observer is defined', Function, Observer);
			assertInstanceOf('Notifier is defined', Function, Notifier);
			assertInstanceOf('Notification is defined', Function, Notification);
			assertInstanceOf('Mediator is defined', Function, Mediator);
			assertInstanceOf('Facade is defined', Function, Facade);
			assertInstanceOf('SimpleCommand is defined', Function, SimpleCommand);
			assertInstanceOf('MacroCommand is defined', Function, MacroCommand);
			assertInstanceOf('define is defined', Function, define);
			assertInstanceOf('declare is defined', Function, define);
		}
	}
);