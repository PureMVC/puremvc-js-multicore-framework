/**
 * 
 * @constructor
 * @extends {SimpleCommand}
 */
function MacroCommandTestSub1Command () {};

// subclass SimpleCommand
MacroCommandTestSub1Command.prototype= new SimpleCommand;
MacroCommandTestSub1Command.prototype.constructor= MacroCommandTestSub1Command;

/** @override */
MacroCommandTestSub1Command.prototype.execute= function (note)
{
    var vo = note.getBody();
    // Fabricate a result
    vo.result1 = 2 * vo.input;
};