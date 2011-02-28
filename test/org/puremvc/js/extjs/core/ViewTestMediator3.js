/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator3 = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator3.prototype
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
    ViewTestMediator3.superclass.constructor.call(this, ViewTestMediator3.NAME, view);
  },

  /**
   * Standard getter to return the view component handled by the
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
    // Be sure that the Puremvc.patterns.Mediator has some Puremvc.patterns.Observers created
    // in order to test removeMediator.
    return [ ViewTest.NOTE3 ];
  },

  /**
   * @override
   *
   * @param {Puremvc.patterns.Notification} notification
   *     The Puremvc.patterns.Notification instance to be handled.
   */
  handleNotification: function(notification/*Puremvc.patterns.Notification*/) {
    this._getViewTest().lastNotification = notification.getName();
  }
});

Ext.apply(Puremvc.test.ViewTestMediator3,
/**
 * @lends Puremvc.test.ViewTestMediator3
 */
{
  /**
   * The Puremvc.patterns.Mediator name.
   *
   * @type {String}
   * @constant
   * @memberof Puremvc.test.ViewTestMediator3
   */
  NAME: 'ViewTestMediator3'
});

Alias('Puremvc.test.ViewTestMediator3');
