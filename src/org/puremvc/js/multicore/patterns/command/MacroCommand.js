/**
 * @fileOverview
 * @author David Foley
 * @exports MacroCommand as org.puremvc.js.multicore.patterns.command.MacroCommand
 * @requires org.puremvc.js.multicore.patterns.observer.Notifier
 */

/**
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function MacroCommand ()
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
 * @protected
 * @return {void}
 */
MacroCommand.prototype.initializeMacroCommand= function ()
{
    return;    
};

/**
 * 
 * @param {Function} commandClassRef
 * @return {void}
 */
MacroCommand.prototype.addSubCommand= function (commandClassRef)
{
    this.subCommands.push(commandClassRef);
};

/**
 * TODO optimize implementation
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} note
 * @return {void}
 */
MacroCommand.prototype.execute= function (note)
{	
    // SIC
    while(this.subCommands.length > 0)
    {
        var ref= this.subCommands.shift();
        var cmd= new ref;
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
    }

};
