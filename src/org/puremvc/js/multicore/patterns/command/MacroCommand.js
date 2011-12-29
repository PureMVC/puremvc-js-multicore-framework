/**
 * @fileOverview
 * @author David Foley
 * @exports MacroCommand as org.puremvc.js.multicore.patterns.command.MacroCommand
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * MacroCommands, like SimpleCommands, encapsulate business logic to be preformed
 * when certain notifications are dispatched through PureMvc cores. Unlike
 * SimpleCommand, MacroCommand provides the means to add multiple sub commands.
 *
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function MacroCommand()
{
    this.subCommands= [];
    this.initializeMacroCommand();
};

/* subclass Notifier */
MacroCommand.prototype= new Notifier;
MacroCommand.prototype.constructor= MacroCommand;

/**
 * A list of SimpleCommand and MacroCommand constructors which will be
 * used to instantiate and execute commands as a result of executing this
 * MacroCommand
 *
 * @type Array
 * @protected
 */
MacroCommand.prototype.subCommands= null;

/**
 * Override this method to add sub commands to this MacroCommand using
 * the #addSubCommand method, noting that this method is guaranteed to
 * be called prior to the MacroCommands #execute method.
 * 
 * @protected
 * @return {void}
 * @see #addSubCommand
 */
MacroCommand.prototype.initializeMacroCommand= function()
{
    return;
};

/**
 * Add a SimpleCommand or other MacroCommand to this MacroCommand
 * 
 * @param {Function} commandClassRef
 *  A SimpleCommand or MacroCommand constructor
 * @return {void}
 */
MacroCommand.prototype.addSubCommand= function(commandClassRef)
{
    this.subCommands.push(commandClassRef);
};

/**
 * Execute the MacroCommand. All commands added to the MacroCommand will be 
 * executed in the order they were added. This method should not be overridden.
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 *  The Notification routed to this MacroCommand
 * @return {void}
 */
MacroCommand.prototype.execute= function(note)
{
    // SIC- TODO optimize
    while(this.subCommands.length > 0)
    {
        var ref= this.subCommands.shift();
        var cmd= new ref;
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
    }
};
