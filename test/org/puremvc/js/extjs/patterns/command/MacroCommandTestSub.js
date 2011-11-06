/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');

/**
 * @class A <code>Puremvc.patterns.MacroCommand</code> utility subclass used by
 * <code>Puremvc.test.MacroCommandTest</code>.
 *
 * @extends Puremvc.patterns.MacroCommand
 */
Puremvc.test.MacroCommandTestSub = Ext.extend(Puremvc.patterns.MacroCommand,
/**
 * @lends Puremvc.test.MacroCommandTestSub.prototype
 */
{
  /**
   * A method to test if <code>Puremvc.patterns.Facade</code> instance of the object has
   * well been declared during its construction.
   *
   * @return {Boolean}
   *     <code>Puremvc.patterns.Facade</code> instance of the object has well been declared
   *     during its construction.
   */
  hasFacade: function()/*Boolean*/ {
    return this.facade instanceof Puremvc.patterns.Facade;
  }
});

Alias('Puremvc.test.MacroCommandTestSub');
