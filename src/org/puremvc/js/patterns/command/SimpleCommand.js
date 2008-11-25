/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>ICommand</code> implementation.
*
* <P>
* Your subclass should override the <code>execute</code>
* method where your business logic will handle the <code>INotification</code>. </P>
*
* @see org.puremvc.js.core.controller.Controller Controller
* @see org.puremvc.js.patterns.observer.Notification Notification
* @see org.puremvc.js.patterns.command.MacroCommand MacroCommand
*/
function class_org_puremvc_js_patterns_command_SimpleCommand()
{
	Objs.register("org.puremvc.js.patterns.command.SimpleCommand",SimpleCommand);

	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");

	/**
	 * Constructor
	 */
	function SimpleCommand()
	{
		Notifier.apply(this,arguments);
		if(Objs.extending) return;
	}

	/**
	 * <code>SimpleCommand</code> extends <code>Notifier</code>
	 */
	Objs.extend(SimpleCommand,Notifier);

	/**
	 * <code>SimpleCommand</code> implements <code>ICommand</code>
	 */
	Objs.implement(SimpleCommand,ICommand);

	/**
	 * <code>SimpleCommand</code> implements <code>INotifier</code>
	 */
	Objs.implement(SimpleCommand,INotifier);

	var o = SimpleCommand.prototype;

	/**
	 * Fulfill the use-case initiated by the given <code>INotification</code>.
	 *
	 * <P>
	 * In the Command Pattern, an application use-case typically
	 * begins with some user action, which results in an <code>INotification</code> being broadcast, which
	 * is handled by business logic in the <code>execute</code> method of an
	 * <code>ICommand</code>.</P>
	 *
	 * @param notification The <code>INotification</code> to handle.
	 */
	o.execute = function( notification/*INotification*/ )
	{

	}
}