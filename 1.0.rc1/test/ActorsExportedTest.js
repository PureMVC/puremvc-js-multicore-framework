
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
			assertNotNull('The org namespace is defined', window.org);
			assertNotNull('The org.puremvc namespace is defined', org.puremvc);
			
			assertInstanceOf('Model is defined', Function, org.puremvc.js.multicore.core.Model);
			assertInstanceOf('View is defined', Function, org.puremvc.js.multicore.core.View);
			assertInstanceOf('Controller is defined', Function, org.puremvc.js.multicore.core.Controller);
			assertInstanceOf('Proxy is defined', Function, org.puremvc.js.multicore.patterns.proxy.Proxy);
			assertInstanceOf('Observer is defined', Function, org.puremvc.js.multicore.patterns.observer.Observer);
			assertInstanceOf('Notifier is defined', Function, org.puremvc.js.multicore.patterns.observer.Notifier);
			assertInstanceOf('Notification is defined', Function, org.puremvc.js.multicore.patterns.observer.Notification);
			assertInstanceOf('Mediator is defined', Function, org.puremvc.js.multicore.patterns.mediator.Mediator);
			assertInstanceOf('Facade is defined', Function, org.puremvc.js.multicore.patterns.facade.Facade);
			assertInstanceOf('SimpleCommand is defined', Function, org.puremvc.js.multicore.patterns.command.SimpleCommand);
			assertInstanceOf('MacroCommand is defined', Function, org.puremvc.js.multicore.patterns.command.MacroCommand);
			
			
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
		}
	}
);