/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ControllerTestVO = Ext.extend(Object,
/**
 * @lends Puremvc.test.ControllerTestVO.prototype
 */
{
  /**
   * @constructs A utility class used by Puremvc.test.ControllerTest.
   *
   * @param {Number} input The number to be fed to the <code>Puremvc.test.ControllerTestCommand</code>.
   *
   * @see Puremvc.test.ControllerTest
   * @see Puremvc.test.ControllerTestCommand
   */
  constructor: function(input/*Number*/) {
    this.input = input;
  },

  /**
   * @type {Number}
   */
  input: 0,

  /**
   * @type {Number}
   */
  result: 0
});

Alias('Puremvc.test.ControllerTestVO');
