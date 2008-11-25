/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A Singleton <code>IController</code> implementation.
*
* <P>
* In PureMVC, the <code>Controller</code> class follows the
* 'Command and Controller' strategy, and assumes these
* responsibilities:
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
* <P>
* Your application must register <code>ICommands</code> with the
* Controller.
* <P>
* The simplest way is to subclass <code>Facade</code>,
* and use its <code>initializeController</code> method to add your
* registrations.
*
* @see org.puremvc.js.core.view.View View
* @see org.puremvc.js.patterns.observer.Observer Observer
* @see org.puremvc.js.patterns.observer.Notification Notification
* @see org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
* @see org.puremvc.js.patterns.command.MacroCommand MacroCommand
*/
function class_org_puremvc_js_core_Controller()
{
	Objs.register("org.puremvc.js.core.Controller",Controller);

	var View = Objs.load("org.puremvc.js.core.View");
	var Observer = Objs.load("org.puremvc.js.patterns.observer.Observer");
	var IController = Objs.load("org.puremvc.js.interfaces.IController");

	/**
	 * Constructor.
	 *
	 * <P>
	 * This <code>IController</code> implementation is a Singleton,
	 * so you should not call the constructor
	 * directly, but instead call the static Singleton
	 * Factory method <code>Controller.getInstance()</code>
	 *
	 * @throws Error Error if Singleton instance has already been constructed
	 *
	 */
	function Controller()
	{
		if(Objs.extending) return;

		if(Controller._instance != null)
			throw new Error(Controller._SINGLETON_MSG);

		Controller._instance = this;

		this._commandMap = new Array();
		this._initializeController();
	}

	/**
	 * <code>Controller</code> implements <code>IController</code>
	 */
	Objs.implement(Controller,IController);

	var o = Controller.prototype;

	/**
	 * Local reference to View
	 */
	o._view = null;

	/**
	 * Mapping of Notification names to Command Class references
	 */
	o._commandMap = null;

	/**
	 * Singleton instance
	 */
	Controller._instance    = null;

	/* Message Constants */
	Controller._SINGLETON_MSG = "Controller Singleton already constructed!";

	/**
	 * Initialize the Singleton <code>Controller</code> instance.
	 *
	 * <P>Called automatically by the constructor.</P>
	 *
	 * <P>Note that if you are using a subclass of <code>View</code>
	 * in your application, you should <i>also</i> subclass <code>Controller</code>
	 * and override the <code>initializeController</code> method in the
	 * following way:</P>
	 *
	 * <listing>
	 * // ensure that the Controller is talking to my IView implementation
	 * o._initializeController = function()
	 * {
	 *      view = MyView.getInstance();
	 * }
	 * </listing>
	 *
	 * @return void
	 */
	o._initializeController = function()
	{
		this._view = View.getInstance();
	}

	/**
	 * <code>Controller</code> Singleton Factory method.
	 *
	 * @return the Singleton instance of <code>Controller</code>
	 */
	Controller.getInstance = function()
	{
		if(Controller._instance == null)
			Controller._instance = new Controller();

		return Controller._instance;
	}

	/**
	 * If an <code>ICommand</code> has previously been registered
	 * to handle a the given <code>INotification</code>, then it is executed.
	 *
	 * @param note INotification an <code>INotification</code>
	 */
	o.executeCommand = function(note)
	{
		var commandClassRef = this._commandMap[ note.getName() ];
		if(commandClassRef == null)
			return;

		var commandInstance = new commandClassRef();
		commandInstance.execute( note );
	}

	/**
	 * Register a particular <code>ICommand</code> class as the handler
	 * for a particular <code>INotification</code>.
	 *
	 * <P>
	 * If an <code>ICommand</code> has already been registered to
	 * handle <code>INotification</code>s with this name, it is no longer
	 * used, the new <code>ICommand</code> is used instead.</P>
	 *
	 * The Observer for the new ICommand is only created if this the
	 * first time an ICommand has been regisered for this Notification name.
	 *
	 * @param notificationName String the name of the <code>INotification</code>
	 * @param commandClassRef Funciton the <code>Class</code> of the <code>ICommand</code>
	 */
	o.registerCommand = function(notificationName, commandClassRef)
	{
		/* Use of a closure to execute the command in the Controller singleton context. */
		var that = this;
		var f =  function(note){ that.executeCommand(note)}

		if(this._commandMap[notificationName] == null)
			this._view.registerObserver( notificationName, new Observer(f, this )   );

		this._commandMap[ notificationName ] = commandClassRef;
	}

	/**
	 * Check if a Command is registered for a given Notification
	 *
	 * @param notificationName String
	 * @return whether a Command is currently registered for the given <code>notificationName</code>.
	 */
	o.hasCommand = function(notificationName)
	{
		return this._commandMap[ notificationName ] != null;
	}

	/**
	 * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping.
	 *
	 * @param notificationName  string the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
	 */
	o.removeCommand = function(notificationName)
	{
		/**
		 * if the Command is registered...
		 */
		if(this.hasCommand( notificationName ) )
		{
			/* remove the observer */
			this._view.removeObserver( notificationName, this );

			/* remove the command */
			this._commandMap[ notificationName ] = null;
		}
	}
}