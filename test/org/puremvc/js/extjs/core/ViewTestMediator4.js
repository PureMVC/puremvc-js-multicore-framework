/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator4 = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator4.prototype
 */
{
  /**
   * @constructs A Puremvc.patterns.Mediator class used by Puremvc.test.ViewTest.
   *
   * @param {Object} view The view component handled by this <code>Puremvc.patterns.Mediator</code>.
   *
   * @see Puremvc.test.ViewTest
   *
   * @extends Puremvc.patterns.Mediator
   */
  constructor: function(view/*Object*/) {
    ViewTestMediator4.superclass.constructor.call(this, ViewTestMediator4.NAME, view);
  },

  /**
   * Standard getter to return the view component managed by this
   * <code>Puremvc.patterns.Mediator</code>.
   *
   * @return {Object} The view component handled by the <code>Puremvc.patterns.Mediator</code>.
   *
   * @private
   */
  _getViewTest: function()/*Puremvc.test.ViewTest*/ {
    return this.getViewComponent();
  },

  /**
   * @override
   */
  onRegister: function() {
    this._getViewTest().onRegisterCalled = true;
  },

  /**
   * @override
   */
  onRemove: function() {
    this._getViewTest().onRemoveCalled = true;
  }
});

Ext.apply(Puremvc.test.ViewTestMediator4,
/**
 * @lends Puremvc.test.ViewTestMediator4
 */
{
  /**
   * The Puremvc.patterns.Mediator name.
   *
   * @type {String}
   * @memberof Puremvc.test.ViewTestMediator4
   * @constant
   */
  NAME: 'ViewTestMediator4'
});

Alias('Puremvc.test.ViewTestMediator4');
