/*
 PureMVC Javascript MultiCore port for Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");
	var View = Objs("puremvc.View");

	/**
	 * @classDescription
	 * The multiton <code>Controller</code> class for PureMVC.
	 *
	 * <P>
	 * In PureMVC, the <code>Controller</code> class follows the
	 * 'Command and Controller' strategy, and assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Remembering which <code>Command</code> are intended to handle which
	 * <code>Notification</code>s.
	 * 
	 * <LI>Registering itself as an <code>Observer</code> with the
	 * <code>View</code> for each <code>Notification</code> that it has a
	 * <code>Command</code> mapping for.
	 * 
	 * <LI>Creating a new instance of the proper <code>Command</code> to handle a
	 * given <code>Notification</code> when notified by the <code>View</code>.
	 * 
	 * <LI>Calling the <code>Command</code>'s <code>execute</code> method, passing
	 * in the <code>Notification</code>.
	 *
	 * <P>
	 * Your application must register <code>Command</code>s with the
	 * <code>Controller</code>.
	 *
	 * <P>
	 * The simplest way is to subclass </code>Facade</code>, and use its
	 * <code>initializeController</code> method to add your registrations.
	 * 
	 * @see puremvc.View View
	 * @see puremvc.Observer Observer
	 * @see puremvc.Notification Notification
	 * @see puremvc.SimpleCommand SimpleCommand
	 * @see puremvc.MacroCommand MacroCommand
	 * 
	 * @constructor
	 */
	var Controller = Objs
	(
		"puremvc.Controller",
		{
			/**
			 * Local reference to <code>View</code>.
			 *
			 * @type {View}
			 * @private
			 */
			view: null,

			/**
			 * Mapping of <code>Notification<code> names to
			 * <code>Command</code> class references.
			 *
			 * @type {Object}
			 * @private
			 */
			commandMap: null,

			/**
			 * The multiton Key for this Core.
			 *
			 * @type {String}
			 * @private
			 */
			multitonKey: null,

			/**
			 * Initialize a <code>Controller</code> instance.
			 *
			 * @param {String} key
			 *		Multiton key for this instance of <code>Controller</code>
			 *
			 * @throws {Error}
			 * 		Error if an instance for this multiton key has already been
			 *		constructed.
			 */
			initialize: function( key )
			{
				if( Controller.instanceMap[ key ] )
					throw Error( MULTITON_MSG );

				Controller.instanceMap[ key ] = this;

				this.multitonKey = key;
				this.commandMap = {};	
				this.initializeController();	
			},

			/**
			 * Initialize the multiton <code>Controller</code> instance.
			 * 
			 * <P>
			 * Called automatically by the constructor. 
			 * 
			 * <P>
			 * Note that if you are using a subclass of <code>View</code> in your
			 * application, you should <i>also</i> subclass <code>Controller</code>
			 * and override the <code>initializeController</code> method in the
			 * following way:
			 * 
			 * <pre>
			 *	// Ensure that the Controller is talking to my View implementation.
			 *	initializeController: function() 
			 *	{
			 *		this.view = MyView.getInstance( this.multitonKey );
			 *	}
			 * </pre>
			 *
			 * @private
			 */
			initializeController: function()
			{
				this.view = View.getInstance( this.multitonKey );
			},

			/**
			 * If a <code>Command</code> has previously been registered to handle
			 * the given <code>Notification</code>, then it is executed.
			 *
			 * @param {Notification} note
			 * 		A <code>Notification</code>.
			 */
			executeCommand: function( note )
			{
				var commandClassRef/*Function*/ = this.commandMap[ note.getName() ];
				if( commandClassRef )
				{
					var command/*Command*/ = new commandClassRef();
					command.initializeNotifier( this.multitonKey );
					command.execute(note);
				}
			},

			/**
			 * Register a particular <code>Command</code> class as the
			 * handler for a particular <code>Notification</code>.
			 *
			 * <P>
			 * If a <code>Command</code> has already been registered to
			 * handle <code>Notification</code>s with this name, it is no longer
			 * used, the new <code>Command</code> is used instead.
			 *
			 * The <code>Observer</code> for the new <code>Command</code> is only
			 * created if this is the first time a <code>Command</code> has been
			 * registered for this <code>Notification</code> name.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code>.
			 *
			 * @param {Function} commandClassRef
			 * 		The constructor of the <code>Command</code>.
			 */
			registerCommand: function( name, commandClassRef )
			{
				if( !this.commandMap[name] )
					this.view.registerObserver( name, new Observer( this.executeCommand, this ) );

				this.commandMap[name] = commandClassRef;
			},

			/**
			 * Check if a <code>SimpleCommand</code> is registered for a given
			 * <code>Notification</code>.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code> to verify the
			 * 		existence of its registration.
			 * 
			 * @return {Boolean}
			 * 		A <code>Command</code> is currently registered for the given
			 * 		<code>name</code>.
			 */
			hasCommand: function( name )
			{
				return this.commandMap[name] ? true : false;
			},

			/**
			 * Remove a previously registered <code>SimpleCommand</code>
			 * or <code>MacroCommand</code> to <code>Notification</code> mapping.
			 *
			 * @param {String} name
			 * 		The name of the <code>Notification</code> to remove the
			 * 		<code>SimpleCommand</code> or <code>MacroCommand</code>	mapping
			 * 		for.
			 */
			removeCommand: function( name )
			{
				if( this.hasCommand(name) )
				{
					this.view.removeObserver( name, this );
					delete this.commandMap[name];
				}
			}
		}
	);

	/**
	 * @constant
	 * @type {String}
	 * @private
	 */
	Controller.MULTITON_MSG = "Controller instance for this multiton key already constructed!";

	/**
	 * The multiton map used to store <code>Controller</code>s instances.
	 *
	 * @type {Object}
	 * @private
	 */
	Controller.instanceMap = {};

	/**
	 * <code>Controller</code> multiton factory method.
	 *
	 * @param {String} key
	 *		The multiton key of the instance of <code>Controller</code> to
	 *		create or retrieve.
	 *
	 * @return {Controller}
	 * 		The multiton instance of <code>Controller</code>
	 */
	Controller.getInstance = function( key )
	{
		if( !Controller.instanceMap[ key ] )
			Controller.instanceMap[ key ] = new Controller( key );

		return Controller.instanceMap[ key ];
	}

	/**
	 * Remove a <code>Controller</code> instance.
	 * 
	 * @param {String} key
	 *		Multiton key of the <code>Controller</code> instance to remove.
	 */
	Controller.removeController = function( key )
	{
		delete Controller.instanceMap[ key ];
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Controller = Objs("puremvc.Controller");