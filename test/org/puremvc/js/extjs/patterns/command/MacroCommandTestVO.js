/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.MacroCommandTestVO = Ext.extend(Object,
/**
 * @lends Puremvc.test.MacroCommandTestVO.prototype
 */
{
  /**
   * @constructs A utility class used by Puremvc.test.MacroCommandTest.
   *
   * @param input A random number to pass to the command.
   *
   * @see Puremvc.test.MacroCommandTest
   * @see Puremvc.test.MacroCommandTestCommand
   * @see Puremvc.test.MacroCommandTestSub1Command
   * @see Puremvc.test.MacroCommandTestSub2Command
   */
  constructor: function(input/*Number*/) {
    this.input = input;
  },

  /**
   * @type {Number}
   */
  input: null,

  /**
   * @type {Number}
   */
  result1: null,

  /**
   * @type {Number}
   */
  result2: null
});

Alias('Puremvc.test.MacroCommandTestVO');
