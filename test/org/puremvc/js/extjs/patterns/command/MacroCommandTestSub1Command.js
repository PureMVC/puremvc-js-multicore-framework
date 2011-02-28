/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A Puremvc.patterns.SimpleCommand subclass used by Puremvc.test.MacroCommandTestCommand.
 *
 * @see Puremvc.test.MacroCommandTest
 * @see Puremvc.test.MacroCommandTestCommand
 * @see Puremvc.test.MacroCommandTestVO
 *
 * @extends Puremvc.patterns.MacroCommand
 */
Puremvc.test.MacroCommandTestSub1Command = Ext.extend(Puremvc.patterns.SimpleCommand,
/**
 * @lends Puremvc.test.MacroCommandTestSub1Command.prototype
 */
{
  /**
   * Fabricate a result by multiplying the input by two.
   *
   * @param {Puremvc.patterns.Notification} event
   *     The <code>Event</code> carrying the
   *     <code>Puremvc.test.MacroCommandTestVO</code>
   */
  execute: function(note/*Puremvc.patterns.Notification*/) {

    var vo/*Puremvc.test.MacroCommandTestVO*/ = note.getBody();

    // Fabricate a result.
    vo.result1 = 2 * vo.input;
  }
});

Alias('Puremvc.test.MacroCommandTestSub1Command');
