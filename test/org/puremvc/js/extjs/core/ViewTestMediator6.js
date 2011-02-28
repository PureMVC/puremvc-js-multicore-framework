/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator6 = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator6.prototype
 */
{
  /**
   * @constructs A Puremvc.patterns.Mediator class used by Puremvc.test.ViewTest.
   *
   * @param {String} mediatorName The name of the <code>Puremvc.patterns.Mediator</code>.
   * @param {Object} view The view component handled by this <code>Puremvc.patterns.Mediator</code>.
   *
   * @see Puremvc.test.ViewTest
   *
   * @extends Puremvc.patterns.Mediator
   */
  constructor: function(name/*String*/, view/*Object*/) {
    ViewTestMediator6.superclass.constructor.call(this, name, view);
  },

  /**
   * Standard getter to return the view handled by the
   * <code>Puremvc.patterns.Mediator</code>.
   *
   * @return {Object} The view handled by the <code>Puremvc.patterns.Mediator</code>.
   *
   * @private
   */
  _getViewTest: function()/*Puremvc.test.ViewTest*/ {
    return this.getViewComponent();
  },

  /**
   * @override
   *
   * @return {Array}
   *     The list of notification names in which the
   *     <code>Puremvc.patterns.Mediator</code> is interested.
   */
  listNotificationInterests: function()/*Array*/ {
    return [ ViewTest.NOTE6 ];
  },

  /**
   * @override
   *
   * @param {Puremvc.patterns.Notification} notification
   *     The Puremvc.patterns.Notification instance to be handled.
   */
  handleNotification: function(notification/*Puremvc.patterns.Notification*/) {
    this.facade.removeMediator(this.getMediatorName());
  },

  /**
   * @override
   */
  onRemove: function() {
    this._getViewTest().counter++;
  }
});

Ext.apply(Puremvc.test.ViewTestMediator6,
/**
 * @lends Puremvc.test.ViewTestMediator6
 */
{
  /**
   * The Puremvc.patterns.Mediator name.
   *
   * @type {String}
   * @memberof Puremvc.test.ViewTestMediator
   * @constant
   */
  NAME: 'ViewTestMediator6'
});

Alias('Puremvc.test.ViewTestMediator6');
