/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* The interface definition for a PureMVC Mediator.
*
* <P>
* In PureMVC, <code>IMediator</code> implementors assume these responsibilities:</P>
* <UL>
* <LI>Implement a common method which returns a list of all <code>INotification</code>s
* the <code>IMediator</code> has interest in.</LI>
* <LI>Implement a notification callback method.</LI>
* <LI>Implement methods that are called when the IMediator is registered or removed from the View.</LI>
* </UL>
* <P>
* Additionally, <code>IMediator</code>s typically:
* <UL>
* <LI>Act as an intermediary between one or more view components such as text boxes or
* list controls, maintaining references and coordinating their behavior.</LI>
* <LI>In Flash-based apps, this is often the place where event listeners are
* added to view components, and their handlers implemented.</LI>
* <LI>Respond to and generate <code>INotifications</code>, interacting with of
* the rest of the PureMVC app.
* </UL></P>
* <P>
* When an <code>IMediator</code> is registered with the <code>IView</code>,
* the <code>IView</code> will call the <code>IMediator</code>'s
* <code>listNotificationInterests</code> method. The <code>IMediator</code> will
* return an <code>Array</code> of <code>INotification</code> names which
* it wishes to be notified about.</P>
*
* <P>
* The <code>IView</code> will then create an <code>Observer</code> object
* encapsulating that <code>IMediator</code>'s (<code>handleNotification</code>) method
* and register it as an Observer for each <code>INotification</code> name returned by
* <code>listNotificationInterests</code>.</P>
*
* <P>
* A concrete IMediator implementor usually looks something like this:</P>
*
* <listing>
*   var View = AjaxIMediatorLoader.load("org.puremvc.js.patterns.mediator.~~
*   var View = AjaxIMediatorLoader.load("org.puremvc.js.patterns.observer.~~
*   var View = AjaxIMediatorLoader.load("org.puremvc.js.core.view.~~
*
*   var View = AjaxIMediatorLoader.load("com.me.myapp.model.~~
*   var View = AjaxIMediatorLoader.load("com.me.myapp.view.~~
*   var View = AjaxIMediatorLoader.load("com.me.myapp.controller.~~
*
*   var View = AjaxIMediatorLoader.load("mx.controls.ComboBox
*   var View = AjaxIMediatorLoader.load("mx.events.ListEvent
*
* public IMediator MyMediator extends Mediator implements IMediator {
*
*       IMediator.protoype.MyComboMediator = function viewComponent:Object ) {
*           super( viewComponent );
*           combo.addEventListener( Event.CHANGE, onChange );
*       }
*
*       override IMediator.protoype.listNotificationInterests = function):Array {
*               return [ MyFacade.SET_SELECTION,
*                        MyFacade.SET_DATAPROVIDER ];
*       }
*
*       override IMediator.protoype.handleNotification = function notification:INotification ):void
{
*               switch ( notification.getName() ) {
*                   case MyFacade.SET_SELECTION:
*                       setSelection(notification);
*                       break;
*                   case MyFacade.SET_DATAPROVIDER:
*                       setDataProvider(notification);
*                       break;
*               }
*       }
*
*       // Set the data provider of the combo box
o.setDataProvider = function( notification:INotification ):void
{
*           combo.dataProvider = notification.getBody() as Array;
*       }
*
*       // Invoked when the combo box dispatches a change event, we send a
*      // notification with the
o.onChange = function(event:ListEvent):void
{
*           sendNotification( MyFacade.MYCOMBO_CHANGED, this );
*       }
*
*       // A private getter for accessing the view object by IMediator
o.get combo = function():ComboBox  {
*         return view as ComboBox;
*      }
*
* }
* </listing>
*
* @see org.puremvc.js.interfaces.INotification INotification
*/
function class_org_puremvc_js_interfaces_IMediator()
{
	Objs.register("org.puremvc.js.interfaces.IMediator",IMediator);
	var o = IMediator.prototype;

	/**
	* Constructor
	*/
	function IMediator(){}

	/**
	 * Get the <code>IMediator</code> instance name
	 *
	 * @return the <code>IMediator</code> instance name
	 */
	o.getMediatorName = function()/*String*/{};

	/**
	 * Get the <code>IMediator</code>'s view component.
	 *
	 * @return Object the view component
	 */
	o.getViewComponent = function()/*Object*/{};

	/**
	 * Set the <code>IMediator</code>'s view component.
	 *
	 * @param viewComponent     Object the view component
	 */
	o.setViewComponent = function( viewComponent/*Object*/ ){};

	/**
	 * List <code>INotification</code> interests.
	 *
	 * @return an <code>Array</code> of the <code>INotification</code> names this <code>IMediator</code> has an interest in.
	 */
	o.listNotificationInterests = function()/*Array*/{};

	/**
	 * Handle an <code>INotification</code>.
	 *
	 * @param notification the <code>INotification</code> to be handled
	 */
	o.handleNotification = function( notification/*INotification*/ ){};


	/**
	 * Called by the View when the Mediator is registered
	 */
	o.onRegister = function(){};

	/**
	 * Called by the View when the Mediator is removed
	 */
	o.onRemove = function(){};
}