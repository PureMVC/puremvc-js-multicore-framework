/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ModelTestProxy = Ext.extend(Puremvc.patterns.Proxy,
/**
 * @lends Puremvc.test.ModelTestProxy.prototype
 */
{
  /**
   * @constructs A <code>Puremvc.patterns.Proxy</code> subclass used by <code>Puremvc.test.ModelTest</code> testCase.
   * @extends Puremvc.patterns.Proxy
   */
  constructor: function() {
    ModelTestProxy.superclass.constructor.call(this, ModelTestProxy.NAME, "");
  },

  /**
   * @override
   */
  onRegister: function() {
    this.setData(ModelTestProxy.ON_REGISTER_CALLED);
  },

  /**
   * @override
   */
  onRemove: function() {
    this.setData(ModelTestProxy.ON_REMOVE_CALLED);
  }
});

Ext.apply(Puremvc.test.ModelTestProxy,
/**
 * @lends Puremvc.test.ModelTestProxy
 */
{
  /**
   * @type {String}
   * @constant
   * @memberof Puremvc.test.ModelTestProxy
   */
  NAME: 'ModelTestProxy',

  /**
   * @type {String}
   * @constant
   * @memberof Puremvc.test.ModelTestProxy
   */
  ON_REGISTER_CALLED: 'onRegister Called',

  /**
   * @type {String}
   * @constant
   * @memberof Puremvc.test.ModelTestProxy
   */
  ON_REMOVE_CALLED: 'onRemove Called'
});

Alias('Puremvc.test.ModelTestProxy');
