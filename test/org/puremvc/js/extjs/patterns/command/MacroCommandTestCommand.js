/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A MacroCommand subclass used by MacroCommandTest.
 *
 * @see Puremvc.test.MacroCommandTest
 * @see Puremvc.test.MacroCommandTestSub1Command
 * @see Puremvc.test.MacroCommandTestSub2Command
 * @see Puremvc.test.MacroCommandTestVO
 *
 * @extends Puremvc.patterns.MacroCommand
 */
Puremvc.test.MacroCommandTestCommand = Ext.extend(Puremvc.patterns.MacroCommand,
/**
 * @lends Puremvc.test.MacroCommandTestCommand.prototype
 */
{
  /**
   * Initialize the Puremvc.test.MacroCommandTestCommand by adding
   * its two Puremvc.patterns.SubCommands.
   *
   * @override
   */
  initializeMacroCommand: function() {
    this.addSubCommand(MacroCommandTestSub1Command);
    this.addSubCommand(MacroCommandTestSub2Command);
  }
});

Alias('Puremvc.test.MacroCommandTestCommand');
