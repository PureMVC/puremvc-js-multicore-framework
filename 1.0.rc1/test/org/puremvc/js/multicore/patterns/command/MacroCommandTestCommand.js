
MacroCommandTestCommand.prototype= new MacroCommand;
MacroCommandTestCommand.prototype.constructor= MacroCommandTestCommand;

/** @override */
MacroCommandTestCommand.prototype.initializeMacroCommand= function ()
{
    this.addSubCommand( MacroCommandTestSub1Command );
    this.addSubCommand( MacroCommandTestSub2Command );    
};

/**
 * @constructor
 * @extends {MacroCommand}
 */
function MacroCommandTestCommand ()
{
    MacroCommand.call(this);
};
