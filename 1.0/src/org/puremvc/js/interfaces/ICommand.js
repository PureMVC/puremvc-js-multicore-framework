/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * The interface definition for a PureMVC Command.
 *
 * @see org.puremvc.js.interfaces INotification
 */
function class_org_puremvc_js_interfaces_ICommand()
{
	Objs.register("org.puremvc.js.interfaces.ICommand",ICommand);
	var o = ICommand.prototype;

	/**
	* Constructor
	*/
	function ICommand(){}

	/**
	 * Execute the <code>ICommand</code>'s logic to handle a given <code>INotification</code>.
	 *
	 * @param notification an <code>INotification</code> to handle.
	 */
	o.execute = function( notification/*INotification*/ ){};
}