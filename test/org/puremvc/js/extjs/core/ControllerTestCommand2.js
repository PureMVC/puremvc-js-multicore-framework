/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A Puremvc.patterns.SimpleCommand subclass used by Puremvc.test.ControllerTest.
 *
 * @see Puremvc.test.ControllerTest
 * @see Puremvc.test.ControllerTestVO
 *
 * @extends Puremvc.patterns.SimpleCommand
 */
Puremvc.test.ControllerTestCommand2 = Ext.extend(Puremvc.patterns.SimpleCommand,
/**
 * @lends Puremvc.test.ControllerTestCommand2.prototype
 */
{
  /**
   * Fabricate a result by multiplying the input by two and adding to the
   * existing result.
   *
   * <P>
   * This tests an accumulation effect that would show if the command were
   * executed more than once.
   *
   * @param {Puremvc.patterns.Notification} note The notification carrying the Puremvc.test.ControllerTestVO.
   */
  execute: function(note/*Puremvc.patterns.Notification*/) {

    var vo/*Puremvc.test.ControllerTestVO*/ = note.getBody();

    // Fabricate a result.
    vo.result = vo.result + (2 * vo.input);
  }
});

Alias('Puremvc.test.ControllerTestCommand2');
