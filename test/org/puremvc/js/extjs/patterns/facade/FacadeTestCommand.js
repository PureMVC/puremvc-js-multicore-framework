/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A Puremvc.patterns.SimpleCommand subclass used by Puremvc.test.FacadeTest.
 *
 * @see Puremvc.test.FacadeTest
 * @see Puremvc.test.FacadeTestVO
 *
 * @extends Puremvc.patterns.SimpleCommand
 */
Puremvc.test.FacadeTestCommand = Ext.extend(Puremvc.patterns.SimpleCommand,
/**
 * @lends Puremvc.test.FacadeTestCommand.prototype
 */
{
  /**
   * Fabricate a result by multiplying the input by two.
   *
   * @param {Puremvc.patterns.Notification} note The Puremvc.patterns.Notification carrying the Puremvc.test.FacadeTestVO.
   */
  execute: function(note/*Puremvc.patterns.Notification*/) {
    var vo/*Puremvc.test.FacadeTestVO*/ = note.getBody();

    // Fabricate a result.
    vo.result = 2 * vo.input;
  }
});

Alias('Puremvc.test.FacadeTestCommand');
