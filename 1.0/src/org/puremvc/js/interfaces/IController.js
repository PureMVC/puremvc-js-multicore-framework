/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* The interface definition for a PureMVC Controller.
*
* <P>
* In PureMVC, an <code>IController</code> implementor
* follows the 'Command and Controller' strategy, and
* assumes these responsibilities:
* <UL>
* <LI> Remembering which <code>ICommand</code>s
* are intended to handle which <code>INotifications</code>.</LI>
* <LI> Registering itself as an <code>IObserver</code> with
* the <code>View</code> for each <code>INotification</code>
* that it has an <code>ICommand</code> mapping for.</LI>
* <LI> Creating a new instance of the proper <code>ICommand</code>
* to handle a given <code>INotification</code> when notified by the <code>View</code>.</LI>
* <LI> Calling the <code>ICommand</code>'s <code>execute</code>
* method, passing in the <code>INotification</code>.</LI>
* </UL>
*
* @see org.puremvc.js.interfaces INotification
* @see org.puremvc.js.interfaces ICommand
*/
function class_org_puremvc_js_interfaces_IController()
{
	Objs.register("org.puremvc.js.interfaces.IController",IController);
	var o = IController.prototype;

	/**
	* Constructor
	*/
	function IController(){}

	/**
	 * Register a particular <code>ICommand</code> IController as the handler
	 * for a particular <code>INotification</code>.
	 *
	 * @param notificationName the name of the <code>INotification</code>
	 * @param commandIControllerRef the IController of the <code>ICommand</code>
	 */
	o.registerCommand = function( notificationName/*String*/, commandIControllerRef/*IController*/ ){};

	/**
	 * Execute the <code>ICommand</code> previously registered as the
	 * handler for <code>INotification</code>s with the given notification name.
	 *
	 * @param notification the <code>INotification</code> to execute the associated <code>ICommand</code> for
	 */
	o.executeCommand = function( notification/*INotification*/ ){};

	/**
	 * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping.
	 *
	 * @param notificationName the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
	 */
	o.removeCommand = function( notificationName/*String*/ ){};

	/**
	 * Check if a Command is registered for a given Notification
	 *
	 * @param notificationName
	 * @return whether a Command is currently registered for the given <code>notificationName</code>.
	 */
	o.hasCommand = function( notificationName/*String*/ )/*Boolean*/{};
}