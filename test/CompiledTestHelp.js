/**
 * A helper object used to assert interface implementation. This object is
 * used only to assist tests. The Help object is not a dependency of the
 * puremvc implementation.
 * 
 * @author David Foley | david@objectkit.com
 */
Help=
{
    exportPureMvcActors: function (scope)
	{
	    // ensure global scope in testdriver context 
	    if (null == scope)
	       scope= window;
	       
	    var puremvc= scope.puremvc;
	    if (null == puremvc)
	       throw new Error('Puremvc is not defined')
	    // variables declared without var are implicit globals
		Model			= puremvc.Model;
		View			= puremvc.View;
		Controller		= puremvc.Controller;
		SimpleCommand	= puremvc.SimpleCommand;
		MacroCommand	= puremvc.MacroCommand;
		Facade			= puremvc.Facade;
		Mediator		= puremvc.Mediator;
		Observer		= puremvc.Observer;
		Notifier		= puremvc.Notifier;
		Notification	= puremvc.Notification;
		Proxy			= puremvc.Proxy;
		define          = puremvc.define;
		declare			= puremvc.declare;
		
		if (console)
			console.info('Exported PureMVC actors', this)
	}
};

Help.exportPureMvcActors(this);