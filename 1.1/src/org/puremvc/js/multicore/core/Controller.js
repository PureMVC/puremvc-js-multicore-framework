/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau 
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 * 
 * @class puremvc.Controller
 * 
 * In PureMVC, the Controller class follows the 'Command and Controller' 
 * strategy, and assumes these responsibilities:
 * 
 * - Remembering which
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or 
 * {@link puremvc.MacroCommand MacroCommand}s
 * are intended to handle which 
 * {@link puremvc.Notification Notification}s
 * - Registering itself as an 
 * {@link puremvc.Observer Observer} with
 * the {@link puremvc.View View} for each 
 * {@link puremvc.Notification Notification}
 * that it has an 
 * {@link puremvc.SimpleCommand SimpleCommand} 
 * or {@link puremvc.MacroCommand MacroCommand} 
 * mapping for.
 * - Creating a new instance of the proper 
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or 
 * {@link puremvc.MacroCommand MacroCommand}s
 * to handle a given 
 * {@link puremvc.Notification Notification} 
 * when notified by the
 * {@link puremvc.View View}.
 * - Calling the command's execute method, passing in the 
 * {@link puremvc.Notification Notification}.
 *
 * Your application must register 
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or {@link puremvc.MacroCommand MacroCommand}s 
 * with the Controller.
 *
 * The simplest way is to subclass 
 * {@link puremvc.Facade Facade},
 * and use its 
 * {@link puremvc.Facade#initializeController initializeController} 
 * method to add your registrations.
 *
 * @constructor
 * This Controller implementation is a Multiton, so you should not call the 
 * constructor directly, but instead call the static #getInstance factory method, 
 * passing the unique key for this instance to it.
 * @param {string} key
 * @throws {Error}
 *  If instance for this Multiton key has already been constructed
 */
function Controller(key)
{
    if(Controller.instanceMap[key] != null)
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
 * 
 * Initialize the multiton Controller instance.
 *
 * Called automatically by the constructor.
 *
 * Note that if you are using a subclass of View
 * in your application, you should *also* subclass Controller
 * and override the initializeController method in the
 * following way.
 * 
 *     MyController.prototype.initializeController= function ()
 *     {
 *         this.view= MyView.getInstance(this.multitonKey);
 *     };
 * 
 * @return {void}
 */
Controller.prototype.initializeController= function()
{
    this.view= View.getInstance(this.multitonKey);
};

/**
 * The Controllers multiton factory method. 
 * Note that this method will return null if supplied a null 
 * or undefined multiton key. 
 *
 * @param {string} key
 *  A Controller's multiton key
 * @return {puremvc.Controller}
 *  the Multiton instance of Controller
 */
Controller.getInstance= function(key)
{
	if (null == key)
		return null;
		
    if(null == this.instanceMap[key])
    {
        this.instanceMap[key]= new this(key);
    }

    return this.instanceMap[key];
};

/**
 * If a SimpleCommand or MacroCommand has previously been registered to handle
 * the given Notification then it is executed.
 *
 * @param {puremvc.Notification} note
 * @return {void}
 */
Controller.prototype.executeCommand= function(note)
{
    var commandClassRef= this.commandMap[note.getName()];
    if(commandClassRef == null)
        return;

    var commandInstance= new commandClassRef();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(note);
};

/**
 * Register a particular SimpleCommand or MacroCommand class as the handler for 
 * a particular Notification.
 *
 * If an command already been registered to handle Notifications with this name, 
 * it is no longer used, the new command is used instead.
 *
 * The Observer for the new command is only created if this the irst time a
 * command has been regisered for this Notification name.
 *
 * @param {string} notificationName
 *  the name of the Notification
 * @param {Function} commandClassRef
 *  a command constructor
 * @return {void}
 */
Controller.prototype.registerCommand= function(notificationName, commandClassRef)
{
    if(this.commandMap[notificationName] == null)
    {
        this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
    }

    this.commandMap[notificationName]= commandClassRef;
};

/**
 * Check if a command is registered for a given Notification
 *
 * @param {string} notificationName
 * @return {boolean}
 *  whether a Command is currently registered for the given notificationName.
 */
Controller.prototype.hasCommand= function(notificationName)
{
    return this.commandMap[notificationName] != null;
};

/**
 * Remove a previously registered command to
 * {@link puremvc.Notification Notification}
 * mapping.
 *
 * @param {string} notificationName
 *  the name of the Notification to remove the command mapping for
 * @return {void}
 */
Controller.prototype.removeCommand= function(notificationName)
{
    if(this.hasCommand(notificationName))
    {
        this.view.removeObserver(notificationName, this);
        this.commandMap[notificationName]= null;
    }
};

/**
 * @static
 * Remove a Controller instance.
 *
 * @param {string} key 
 *  multitonKey of Controller instance to remove
 * @return {void}
 */
Controller.removeController= function(key)
{
    delete this.instanceMap[key];
};

/**
 * Local reference to the Controller's View
 * 
 * @protected
 * @type {puremvc.View}
 */
Controller.prototype.view= null;

/**
 * Note name to command constructor mappings
 * 
 * @protected
 * @type {Object}
 */
Controller.prototype.commandMap= null;

/**
 * The Controller's multiton key
 * 
 * @protected
 * @type {string}
 */
Controller.prototype.multitonKey= null;

/**
 * Multiton key to Controller instance mappings
 * 
 * @static
 * @protected
 * @type {Object}
 */
Controller.instanceMap= [];

/**
 * @ignore
 * 
 * Message constants
 * @static
 * @protected
 * @type {string}
 */
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"