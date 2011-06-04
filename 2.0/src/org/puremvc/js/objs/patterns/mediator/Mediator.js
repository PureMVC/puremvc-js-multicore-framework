/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * <P>A base <code>Mediator</code> implementation.
	 * 
	 * <P>
	 * Typically, a <code>Mediator</code> will be written to serve one specific
	 * control or group controls and so, will not have a need to be dynamically
	 * named.
	 * 
	 * @see puremvc.Notification Notification
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var Mediator = Objs
	(
		"puremvc.Mediator",
		"puremvc.Notifier",
		{
			/**
			 * The name of the <code>Mediator</code>.
			 * 
			 * @type {String}
			 * @private
			 */
			mediatorName: null,
			
			/**
			 * The <code>Mediator</code>'s view component.
			 * 
			 * @type {Object}
			 * @private
			 */
			viewComponent: null,
			
			/**
			 * @override
			 *
			 * Initialize a <code>Mediator</code> instance.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code>.
			 *
			 * @param {Object} viewComponent
			 * 		The <code>Mediator</code>'s view component.
			 *
			 */
			initialize: function( mediatorName, viewComponent )
			{
				Mediator.$super.initialize.call(this);
			
				this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
				this.viewComponent = viewComponent;
			},
			
			/**
			 * List the <code>Notification</code> names this
			 * <code>Mediator</code> is interested in being notified of.
			 *
			 * @return {Array}
			 * 		The list of notifications names in which is interested the
			 * 		<code>Mediator</code>.
			 */
			listNotificationInterests: function()
			{
				return [];
			},
			
			/**
			 * Get the name of the <code>Mediator</code>.
			 *
			 * @return {String}
			 * 		The <code>Mediator</code> name.
			 */
			getMediatorName: function()
			{
				return this.mediatorName;
			},
			
			/**
			 * Get the <code>Mediator</code>'s view component.
			 *
			 * @return {Object}
			 * 		The view component.
			 */
			getViewComponent: function()
			{
				return this.viewComponent;
			},
			
			/**
			 * Set the <code>Mediator</code>'s view component.
			 *
			 * @param {Object} viewComponent
			 * 		The view component.
			 */
			setViewComponent: function( viewComponent )
			{
				this.viewComponent = viewComponent;
			},
			
			/**
			 * Handle <code>Notification</code>s.
			 *
			 * <P>
			 * Typically this will be handled in a switch statement,
			 * with one 'case' entry per <code>Notification</code>
			 * the <code>Mediator</code> is interested in.
			 *
			 * @param {Notification} note
			 * 		The notification instance to be handled.
			 */
			handleNotification: function( note ){},
			
			/**
			 * Called by the View when the Mediator is registered.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRegister: function(){},
			
			/**
			 * Called by the View when the Mediator is removed.
			 * This method is usually overridden as needed by the subclass.
			 */
			onRemove: function(){}
		}
	);
	
	/**
	 * Default name of the <code>Mediator</code>.
	 * 
	 * @type {String}
	 * @constant
	 */
	Mediator.NAME = "Mediator";
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Mediator = Objs("puremvc.Mediator");