/**
 * @classDescription
 *  A port of org.puremvc.as3.multicore.patterns.command.MacroCommandTestSub2Command
 *  test object
 *  
 * @author David Foley | david@objectkit.com
 */

/**
 * @constructor
 * @extends {SimpleCommand}
 */
function MacroCommandTestSub2Command () {};

// subclass SimpleCommand
MacroCommandTestSub2Command.prototype= new SimpleCommand;
MacroCommandTestSub2Command.prototype.constructor= MacroCommandTestSub2Command;

/** @override */
MacroCommandTestSub2Command.prototype.execute= function (note)
{
    var vo = note.getBody();
    
    // Fabricate a result
    vo.result2 = vo.input * vo.input;    
};