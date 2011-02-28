/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A Puremvc.patterns.SimpleCommand subclass used by Puremvc.test.SimpleCommandTest.
 *
 * @see Puremvc.test.SimpleCommandTest
 * @see Puremvc.test.SimpleCommandTestVO
 *
 * @extends Puremvc.patterns.SimpleCommand
 */
Puremvc.test.SimpleCommandTestCommand = Ext.extend(Puremvc.patterns.SimpleCommand,
/**
 * @lends Puremvc.test.SimpleCommandTestCommand.prototype
 */
{
  /**
   * Fabricate a result by multiplying the input by two.
   *
   * @param {Puremvc.patterns.Notification} note
   *     The <code>Notification</code> carrying the
   *     <code>SimpleCommandTestVO</code>
   */
  execute: function(note/*Puremvc.patterns.Notification*/) {
    var vo/*Puremvc.test.SimpleCommandTestVO*/ = note.getBody();

    // Fabricate a result.
    vo.result = 2 * vo.input;
  }
});

Alias('Puremvc.test.SimpleCommandTestCommand');
