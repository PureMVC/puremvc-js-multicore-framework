/**
 * @fileOverview
 * @author David Foley
 * @exports Controller as org.puremvc.js.multicore.core.Controller
 * @requires org.puremvc.js.multicore.core.View
 * @requires org.puremvc.js.multicore.patterns.observer.Notification
 * @requires org.puremvc.js.multicore.patterns.observer.Observer
 */

/**
 *
 * @param {string} key
 * @constructor
 * @throws {Error}
 * @see org.puremvc.js.multicore.core.Controller#getInstance
 * @see org.puremvc.js.multicore.core.Facade#initializeController
 * @see org.puremvc.js.multicore.interfaces.IController
 * @see org.puremvc.js.multicore.core.View
 * @see org.puremvc.js.multicore.patterns.observer.Observer
 * @see org.puremvc.js.multicore.patterns.observer.Notification
 * @see org.puremvc.js.multicore.patterns.command.SimpleCommand
 * @see org.puremvc.js.multicore.patterns.command.MacroCommand
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
 * @protected
 * @return {void}
 */
Controller.prototype.initializeController= function ()
{
	this.view= View.getInstance(this.multitonKey);
};

/**
 *
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.Controller}
 * @static
 * @throws {Error}
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
 *
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 * @return {void}
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
 *
 * @param {string} notificationName
 * @param {Function} commandClassRef
 * @return {void}
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
 *
 * @param {string} notificationName
 * @return {boolean}
 */
Controller.prototype.hasCommand= function (notificationName)
{
	return this.commandMap[notificationName] != null;
};

/**
 * Remove any Command / notification name associations previously registered with
 * this Controller
 * by association
 *
 * @param {string} notificationName
 * @return {void}
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
 *
 *
 * @param {string} key
 * @return {void}
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
 * @static
 * @const
 * @type string
 */
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"