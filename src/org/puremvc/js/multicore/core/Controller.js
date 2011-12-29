/**
 * @fileOverview
 * @author David Foley
 * @exports Controller as org.puremvc.js.multicore.core.Controller
 * @requires org.puremvc.js.multicore.core.View
 * @requires org.puremvc.js.multicore.patterns.observer.Notification
 * @requires org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
 * Create a new Controller instance. Note that the Controller 
 * constructor is used internally by the framework, and any attempt 
 * to use it directly will throw an error. 
 * 
 * You will most likely never access Controller instances or its
 * methods directly, but indirectly, via Facade.
 * 
 * @param {string} key
 * 	The Controllers multiton key.
 * @constructor
 * @throws {Error}
 * 	If an attempt is made to instantiate a Controller directly
 * @see org.puremvc.js.multicore.core.Controller.getInstance
 * @see org.puremvc.js.multicore.patterns.facade.Facade
 */
function Controller (key)
{
	if (Controller.instanceMap[key] != null)
	{
		throw new Error(Controller.MULTITON_MSG);
	}

	this.multitonKey= key;
	Controller.instanceMap[this.multitonKey]= this;
	this.commandMap= new Array();
	this.initializeController();
}

/**
 * Generally speaking, you should not subclass Controller, and
 * there should be no need to do so. However, if you do decide 
 * to subclass Controller, you can override this method to 
 * perform additional initialization, such as the registration
 * of commands. As retrieval of the Controllers corresponding
 * View is necessary at initialization time, ensure to either
 * call this method before executing your logic, or implement
 * the same view retrieval logic again in your overridden method.
 * 
 * @ignore
 * @protected
 * @return {void}
 */
Controller.prototype.initializeController= function ()
{
	this.view= View.getInstance(this.multitonKey);
};

/**
 * Retrieve a Controller by its multiton key. If no existing
 * Controller has the multiton key provided, a new Controller 
 * instance will be created automatically.
 * 
 * Typically, you will not use this method directly. Instead, your
 * use of Facade will drive Controller instantiation as needed.
 * 
 * @param {string} key
 * 	A multiton key	
 * @return {org.puremvc.js.multicore.core.Controller}
 * @see org.puremvc.js.multicore.patterns.facade.Facade.getInstance
 * @see org.puremvc.js.multicore.core.Controller.removeController
 */
Controller.getInstance= function (key)
{
	if (null == this.instanceMap[key])
	{
		this.instanceMap[key]= new this(key);
	}

	return this.instanceMap[key];
};

/**
 * Instruct the Controller to execute a Command. The supplied notes name
 * will be used to determine which Command to execute. If the note name
 * does not correspond to any registered Command, no action will be taken
 * by the Controller.
 * 
 * Note that Commands are instantiated prior to execution.
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 * @return {void}
 * @see #registerCommand
 * @see org.puremvc.js.multicore.patterns.observer.Notification#getName
 */
Controller.prototype.executeCommand= function(note)
{
	var commandClassRef= this.commandMap[note.getName()];
	if (commandClassRef == null)
		return;

	var commandInstance= new commandClassRef();
	commandInstance.initializeNotifier(this.multitonKey);
	commandInstance.execute(note);
};

/**
 * Register a Command with the Controller, associating it with a 
 * notification name. Note that you supply Command constructors, and
 * not Command instances to this method. You can think of the relationship
 * between Commands and notification names in terms of a key-value pair, where
 * the notification name is the key, and the Command constructor is the value
 * associated with that key.
 * 
 * Note that you will most likely not use this method directly, but indirectly
 * via Facade.
 * 
 * @param {string} notificationName
 * 	Any string to associate with the command.
 * @param {Function} commandClassRef
 * 	A SimpleCommand or MacroCommand constructor.
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#registerCommand
 */
Controller.prototype.registerCommand= function (notificationName, commandClassRef)
{
	if (this.commandMap[notificationName] == null)
	{
		this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
	}

	this.commandMap[notificationName]= commandClassRef;
};

/**
 * Determine if the Controller has any Command associated with a particular
 * notification name.
 * 
 * @param {string} notificationName
 * 	A notification name.
 * @return {boolean}
 * 	Whether this Controller associates the notification name with a Command or not
 * @see org.puremvc.js.multicore.patterns.facade.Facade#hasCommand
 */
Controller.prototype.hasCommand= function (notificationName)
{
	return this.commandMap[notificationName] != null;
};

/**
 * Unregister any Command previously registered with the Controller.
 * 
 * @param {string} notificationName
 * @return {void}
 * @see #hasCommand
 * @see #registerCommand
 * @see org.puremvc.js.multicore.patterns.facade.Facade#removeCommand
 */
Controller.prototype.removeCommand= function (notificationName)
{
	if(this.hasCommand(notificationName))
	{
		this.view.removeObserver(notificationName, this);
		this.commandMap[notificationName]= null;
	}
};

/**
 * Dispose of a particular Controller by its multiton key. 
 * 
 * @static
 * @param {string} key
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#removeCore
 */
Controller.removeController= function (key)
{
	delete this.instanceMap[key];
};

/**
 * Local reference to view.
 *
 * @type org.puremvc.js.multicore.core.View
 * @protected
 */
Controller.prototype.view;

/**
 * Mapping of notification names to Command class references
 *
 * @type Object
 * @protected
 */
Controller.prototype.commandMap;

/**
 * The multiton key for this Core.
 *
 * @type string
 * @protected
 */
Controller.prototype.multitonKey;

/**
 * Multion instances.
 *
 * @type Object
 * @protected
 * @ignore
 * @static
 */
Controller.instanceMap= [];

/**
 * The multiton error message thrown by the constructor in cases of instantiation
 * error.
 *
 * @protected
 * @static
 * @const
 * @type string
 */
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"