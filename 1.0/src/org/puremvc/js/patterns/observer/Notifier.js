/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A Base <code>INotifier</code> implementation.
*
* <P>
* <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
* all have a need to send <code>Notifications</code>. <P>
* <P>
* The <code>INotifier</code> interface provides a common method called
* <code>sendNotification</code> that relieves implementation code of
* the necessity to actually construct <code>Notifications</code>.</P>
*
* <P>
* The <code>Notifier</code> class, which all of the above mentioned classes
* extend, provides an initialized reference to the <code>Facade</code>
* Singleton, which is required for the convienience method
* for sending <code>Notifications</code>, but also eases implementation as these
* classes have frequent <code>Facade</code> interactions and usually require
* access to the facade anyway.</P>
*
* @see org.puremvc.js.patterns.facade.Facade Facade
* @see org.puremvc.js.patterns.mediator.Mediator Mediator
* @see org.puremvc.js.patterns.proxy.Proxy Proxy
* @see org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
* @see org.puremvc.js.patterns.command.MacroCommand MacroCommand
*/
function class_org_puremvc_js_patterns_observer_Notifier()
{
	Objs.register("org.puremvc.js.patterns.observer.Notifier",Notifier);

	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var Facade = Objs.load("org.puremvc.js.patterns.facade.Facade");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");

	/**
	 * Constructor
	 */
	function Notifier()
	{
		if(Objs.extending) return;

		o._facade = Facade.getInstance();
	}

	/**
	 * <code>Notifier</code> implements <code>INotifier</code>
	 */
	Objs.implement(Notifier,INotifier);

	var o = Notifier.prototype;

	/**
	 * Local reference to the Facade Singleton
	 */
	o._facade/*IFacade*/ = null;

	/**
	 * Create and send an <code>INotification</code>.
	 *
	 * <P>
	 * Keeps us from having to construct new INotification
	 * instances in our implementation code.
	 * @param notificationName the name of the notiification to send
	 * @param body the body of the notification (optional)
	 * @param type the type of the notification (optional)
	 */
	o.sendNotification = function( notificationName/*String*/, body/*Object*/, type/*String*/ )
	{
		this._facade.sendNotification( notificationName, body, type );
	}
}