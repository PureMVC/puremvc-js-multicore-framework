/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A utility class used by Puremvc.test.SimpleCommandTest.
 *
 * @see Puremvc.test.SimpleCommandTest
 * @see Puremvc.test.SimpleCommandTestCommand
 */
Puremvc.test.SimpleCommandTestVO = Ext.extend(Object,
/**
 * @lends Puremvc.test.SimpleCommandTestVO.prototype
 */
{
  /**
   * @constructor.
   *
   * @param input The number to be fed to the <code>Puremvc.test.SimpleCommandTestCommand</code>.
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
  result: null
});

Alias('Puremvc.test.SimpleCommandTestVO');
