/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The <code>Controller</code> class for PureMVC.
 *
 * <P>
 * A singleton <code>Controller</code> implementation.
 *
 * <P>
 * In PureMVC, the <code>Controller</code> class follows the
 * 'Command and Controller' strategy, and assumes these responsibilities:
 * 
 * <UL>
 * <LI>Remembering which <code>SimpleCommand</code>s or
 * <code>MacroCommand</code>s are intended to handle which
 * <code>Notification</code>s.
 * <LI>Registering itself as an <code>Observer</code> with the
 * <code>View</code> for each <code>Notification</code> that it has a
 * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for.
 * <LI>Creating a new instance of the proper <code>SimpleCommand</code>
 * or <code>MacroCommand</code> to handle a given <code>Notification</code>
 * when notified by the <code>View</code>.
 * <LI>Calling the <code>SimpleCommand</code>'s
 * or <code>MacroCommand</code>'s  <code>execute</code>
 * method, passing in the <code>Notification</code>.
 *
 * <P>
 * Your application must register <code>Command</code>s with the
 * <code>Controller</code>.
 *
 * <P>
 * The simplest way is to subclass </code>Facade</code>,
 * and use its <code>initializeController</code> method to add your
 * registrations.
 * 
 * @see org.puremvc.js.prototypejs.View View
 * @see org.puremvc.js.prototypejs.patterns.observer.Observer Observer
 * @see org.puremvc.js.prototypejs.patterns.observer.Notification Notification
 * @see org.puremvc.js.prototypejs.patterns.command.SimpleCommand SimpleCommand
 * @see org.puremvc.js.prototypejs.patterns.command.MacroCommand MacroCommand
 * 
 * @constructor
 */
var Controller = Class.create
(
	{
		/**
		 * The <code>View</code> singleton.
		 *
		 * @type {View}
		 * @private
		 */
		view: null,

		/**
		 * Mapping of <code>Notification<code> names to <code>Command</code>
		 * class references.
		 *
		 * @type {Object}
		 * @private
		 */
		commandMap: null,

		/**
		 * Initialize a <code>Controller</code> instance.
		 * 
		 * @throws {Error}
		 * 		Throws an error if an instance for this singleton has already
		 * 		been constructed.
		 */
		initialize: function()
		{
			if( Controller.instance )
				throw Error( Controller.SINGLETON_MSG );

			this.commandMap = {};
			this.initializeController();
		},

		/**
		 * Called automatically by the constructor.
		 * Retains a reference to the <code>View</code> singleton.
		 * 
		 * @private
		 */
		initializeController: function()
		{
			this.view = View.getInstance();
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
			var commandClassRef/*Function*/ = this.commandMap[note.getName()];
			if( commandClassRef )
			{
				var command/*SimpleCommand*/ = new commandClassRef();
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
		 * used, the new <code>SimpleCommand</code> is used instead.
		 *
		 * The <code>Observer</code> for the new
		 * <code>Command</code> is only created if this is the
		 * first time a <code>Command</code> has been regisered for
		 * this <code>Notification</code> name.
		 *
		 * @param {String} name
		 * 		The name of the <code>Notification</code>.
		 *
		 * @param {Function} commandClassRef
		 * 		The <code>Class</code> of the <code>Command</code>.
		 */
		registerCommand: function( name, commandClassRef )
		{
			if( !this.commandMap[name] )
				this.view.registerObserver( name, new Observer( this.executeCommand, this ) );

			this.commandMap[name] = commandClassRef;
		},

		/**
		 * Check if a <code>Command</code> is registered for a given
		 * <code>Notification</code>.
		 *
		 * @param {String} name
		 * 		The name of the <code>Notification</code> to verify the
		 * 		existence of its registration.
		 * 
		 * @return {Boolean}
		 * 		A <code>Command</code> is currently registered for the
		 * 		given <code>name</code>.
		 */
		hasCommand: function( name )
		{
			return this.commandMap[name] ? true : false;
		},

		/**
		 * Remove a previously registered <code>Command</code> to
		 * <code>Notification</code> mapping.
		 *
		 * @param {String} name
		 * 		The name of the <code>Notification</code> to remove the
		 * 		<code>SimpleCommand</code> mapping for.
		 */
		removeCommand: function( name )
		{
			if( this.hasCommand(name) )
			{
				this.view.removeObserver(name, this);
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
Controller.SINGLETON_MSG = "Controller Singleton already constructed!";

/**
 * @type {Controller}
 * @private
 */
Controller.instance = null;

/**
 * Retrieve the singleton instance of the <code>Controller</code>.
 *
 * @return {Controller}
 * 		The singleton instance of <code>Controller</code>.
 */
Controller.getInstance = function()
{
	if( !Controller.instance )
		Controller.instance = new Controller();

	return Controller.instance;
}