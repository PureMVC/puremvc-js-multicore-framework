/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>IMediator</code> implementation.
*
* @see org.puremvc.js.core.view.View View
*/
function class_org_puremvc_js_patterns_mediator_Mediator()
{
	Objs.register("org.puremvc.js.patterns.mediator.Mediator",Mediator);

	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");

	/**
	 * The name of the <code>Mediator</code>.
	 *
	 * <P>
	 * Typically, a <code>Mediator</code> will be written to serve
	 * one specific control or group controls and so,
	 * will not have a need to be dynamically named.</P>
	 */
	Mediator.NAME/*String*/ = 'Mediator';

	/**
	 * Constructor.
	 *
	 * @param mediatorName    The dynamic name of the <code>Mediator</code>.
	 * @param viewComponent    The <code>IMediator</code>'s view component.
	 */
	function Mediator( mediatorName/*String*/, viewComponent/*Object*/ )
	{
		Notifier.apply(this,arguments);

		if(Objs.extending) return;

		this._mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
		this._viewComponent = viewComponent;
	}

	/**
	 * <code>Mediator</code> extends <code>Notifier</code>
	 */
	Objs.extend(Mediator,Notifier);

	/**
	 * <code>Mediator</code> implements <code>IMediator</code>
	 */
	Objs.implement(Mediator,IMediator);

	/**
	 * <code>Facade</code> implements <code>IFacade</code>
	 */
	Objs.implement(Mediator,INotifier);

	var o = Mediator.prototype;

	/**
	 * The mediator name
	 */
	o._mediatorName/*String*/ = null;

	/**
	 * The view component
	 */
	o._viewComponent/*Object*/ = null;

	/**
	 * Get the name of the <code>Mediator</code>.
	 * @return the Mediator name
	 */
	o.getMediatorName = function()/*String*/
	{
		return this._mediatorName;
	}

	/**
	 * Set the <code>IMediator</code>'s view component.
	 *
	 * @param viewComponent   The view component
	 */
	o.setViewComponent = function( viewComponent/*Object*/ )
	{
		this._viewComponent = viewComponent;
	}

	/**
	 * Get the <code>Mediator</code>'s view component.
	 *
	 * <P>
	 * Additionally, an implicit getter will usually
	 * be defined in the subclass that casts the view
	 * object to a type, like this:</P>
	 *
	 * <listing>
	 *      private function get comboBox:mx.controls.ComboBox
	 *      {
	 *          return viewComponent as mx.controls.ComboBox;
	 *      }
	 * </listing>
	 *
	 * @return the view component
	 */
	o.getViewComponent = function()/*Object*/
	{
		return this._viewComponent;
	}

	/**
	 * List the <code>INotification</code> names this
	 * <code>Mediator</code> is interested in being notified of.
	 *
	 * @return Array the list of <code>INotification</code> names
	 */
	o.listNotificationInterests = function()/*Array*/
	{
		return [ ];
	}

	/**
	 * Handle <code>INotification</code>s.
	 *
	 * <P>
	 * Typically this will be handled in a switch statement,
	 * with one 'case' entry per <code>INotification</code>
	 * the <code>Mediator</code> is interested in.
	 */
	o.handleNotification = function( notification/*INotification*/ )
	{

	}

	/**
	 * Called by the View when the Mediator is registered
	 */
	o.onRegister = function()
	{

	}

	/**
	 * Called by the View when the Mediator is removed
	 */
	o.onRemove = function()
	{

	}
}