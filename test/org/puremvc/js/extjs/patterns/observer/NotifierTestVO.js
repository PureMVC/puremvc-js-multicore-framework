/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.NotifierTestVO = Ext.extend(Object,
/**
 * @lends Puremvc.test.NotifierTestVO.prototype
 */
{
  /**
   * @constructs A utility class used by Puremvc.test.NotifierTest.
   *
   * @param input The number to be fed to the Puremvc.test.FacadeTestCommand.
   *
   * @see Puremvc.test.NotifierTest
   * @see Puremvc.test.NotiferTestCommand
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

Alias('Puremvc.test.NotifierTestVO');
