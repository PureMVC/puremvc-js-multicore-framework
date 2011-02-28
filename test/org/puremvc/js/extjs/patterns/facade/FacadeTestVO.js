/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.FacadeTestVO = Ext.extend(Object,
/**
 * @lends Puremvc.test.FacadeTestVO.prototype
 */
{
  /**
   * @constructs A utility class used by FacadeTest.
   *
   * @param input The number to be fed to the Puremvc.test.FacadeTestCommand.
   *
   * @see Puremvc.test.FacadeTest
   * @see Puremvc.test.FacadeTestCommand
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

Alias('Puremvc.test.FacadeTestVO');
