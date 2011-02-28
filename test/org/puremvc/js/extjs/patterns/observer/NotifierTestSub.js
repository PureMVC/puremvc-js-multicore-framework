/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A <code>Puremvc.patterns.Notifier</code> utility subclass used by <code>Puremvc.test.NotifierTest</code>.
 */
Puremvc.test.NotifierTestSub = Ext.extend(Puremvc.patterns.Notifier,
/**
 * @lends Puremvc.test.NotifierTestSub.prototype
 */
{
  /**
   * A method to test if <code>Puremvc.patterns.Facade</code> instance of the object has
   * well been declared during its construction.
   *
   * @return {Boolean} true if the
   *     <code>Puremvc.patterns.Facade</code> instance of the object has well been declared
   *     during its construction.
   */
  hasFacade: function()/*Boolean*/ {
    return this.facade instanceof Puremvc.patterns.Facade;
  }
});

Alias('Puremvc.test.NotifierTestSub');
