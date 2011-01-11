/**
* @misc
* The Controller class for PureMVC
* @class A Singleton <code>Controller</code> implementation.
* <P>
* In PureMVC, the <code>Controller</code> class follows the
* 'Command and Controller' strategy, and assumes these
* responsibilities:
* <UL>
* <LI> Remembering which <code>SimpleCommand</code>s
* or <code>MacroCommand</code>s
* are intended to handle which <code>Notifications</code>.</LI>
* <LI> Registering itself as an <code>Observer</code> with
* the <code>View</code> for each <code>Notification</code>
* that it has a <code>SimpleCommand</code>
* or <code>MacroCommand</code>  mapping for.</LI>
* <LI> Creating a new instance of the proper <code>SimpleCommand</code>
* or <code>MacroCommand</code>
* to handle a given <code>Notification</code> when notified by the <code>View</code>.</LI>
* <LI> Calling the <code>SimpleCommand</code>'s
* or <code>MacroCommand</code>'s  <code>execute</code>
* method, passing in the <code>Notification</code>.</LI>
* </UL>
*
* <P>
* Your application must register <code>ICommands</code> with the
* Controller.
* <P>
* The simplest way is to subclass </code>Facade</code>,
* and use its <code>initializeController</code> method to add your
* registrations.
*
* @see View
* @see Observer
* @see Notification
* @see SimpleCommand
* @see MacroCommand
* @author Justin Wilaby
*/
var Controller = function(){

    /**
     * The <code>View</code> singleton
     * @type View
     */
    this.view = null;

    /**
     * Mapping of <code>Notification<code> names to
     * <code>Command</code> Mootools <code>Class</code> references
     * @type Object
     */
    this.commandMap = {};

    /**
     * @ignore
     * MooTools Class constructor function.
     */
    this.initialize = function()
    {
	 this.initializeController();
    }

    /**
     * Called automatically by the constructor.
     * Retains a reference to the <code>View</code> singleton
     */
    this.initializeController = function()
    {
	this.view = View.getInstance();
    }
    /**
    * If an <code>SimpleCommand</code> or <code>MacroCommand</code>
    * has previously been registered to handle a the given
    * <code>Notification</code>, then it is executed.
    *
    * @param {Notification} note a <code>Notification</code>
    */
    this.executeCommand = function(note /* Notification */)
    {
	var commandClassRef = this.commandMap[note.getName()];
	if (!commandClassRef)
	    return;
	var command = new commandClassRef();
	command.execute(note);
    }

    /**
    * Register a particular <code>SimpleCommand</code> or
    * <code>MacroCommand</code> class as the handler
    * for a particular <code>Notification</code>.
    *
    * <P>
    * If an <code>Command</code> has already been registered to
    * handle <code>Notification</code>s with this name, it is no longer
    * used, the new <code>Command</code> is used instead.</P>
    *
    * The Observer for the new Command is only created if this the
    * first time an Command has been regisered for this Notification name.
    *
    * @param notificationName the name of the <code>Notification</code>
    * @param commandClassRef the <code>Class</code> of the <code>Command</code>
    */
    this.registerCommand = function(notificationName /* String */, commandClassRef /* Class */)
    {
	if (!this.commandMap[notificationName])
	    this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
	this.commandMap[notificationName] = commandClassRef;
    }

    /**
     * Check if a Command is registered for a given Notification
     *
     * @param {String} notificationName
     * @return {Boolean} whether a Command is currently registered for the given <code>notificationName</code>.
     */
    this.hasCommand = function(notificationName /* String */)
    {
	return this.commandMap[notificationName] != null;
    }

    /**
     * Remove a previously registered <code>SimpleCommand</code>
     * or <code>MacroCommand</code> to <code>Notification</code> mapping.
     *
     * @param {String} notificationName the name of the <code>Notification</code> to remove the
     * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for
     */
    this.removeCommand = function(notificationName /* String */)
    {
	if (!this.hasCommand(notificationName))
	    return;
	this.view.removeObserver(notificationName, this);
	delete this.commandMap[notificationName];
    }
}
/**
 * Singleton implementation for the <code>Controller</code>
 * @return {Controller} the Singleton instance of the <code>Controller</code>
 */
Controller.getInstance = function()
{
    if (Controller.instance == undefined)
    {
	var classFactory = new Class(new Controller());
	Controller.instance = new classFactory();
    }
    return Controller.instance;
}