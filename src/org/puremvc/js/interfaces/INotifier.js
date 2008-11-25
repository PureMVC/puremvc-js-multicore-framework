/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* The interface	definition for a PureMVC Notifier.
*
* <P>
* <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
* all have a need to send <code>Notifications</code>. </P>
*
* <P>
* The <code>INotifier</code> interface provides	a common method	called
* <code>sendNotification</code>	that relieves implementation code of
* the necessity	to actually	construct <code>Notifications</code>.</P>
*
* <P>
* The <code>Notifier</code>	INotifier, which all of	the	above mentioned	INotifieres
* extend, also provides	an initialized reference to	the	<code>Facade</code>
* Singleton, which is required for the convienience	method
* for sending <code>Notifications</code>, but also eases implementation	as these
* INotifieres have frequent	<code>Facade</code>	interactions and usually require
* access to	the	facade anyway.</P>
*
* @see org.puremvc.js.interfaces.IFacade IFacade
* @see org.puremvc.js.interfaces.INotification INotification
*/
function class_org_puremvc_js_interfaces_INotifier()
{
	Objs.register("org.puremvc.js.interfaces.INotifier",INotifier);
	var	o =	INotifier.prototype;

	/**
	* Constructor
	*/
	function INotifier(){}

	/**
	 * Send	a <code>INotification</code>.
	 *
	 * <P>
	 * Convenience method to prevent having	to construct new
	 * notification	instances in our implementation	code.</P>
	 *
	 * @param notificationName the name	of the notification	to send
	 * @param body the body	of the notification	(optional)
	 * @param type the type	of the notification	(optional)
	 */
	o.sendNotification = function( notificationName/*String*/, body/*Object*/, type/*String*/ ){};
}