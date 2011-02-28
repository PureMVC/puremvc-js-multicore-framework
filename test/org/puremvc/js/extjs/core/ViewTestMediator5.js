/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator5 = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator5
 */
{
  /**
   * @constructs A Mediator class used by ViewTest.
   *
   * @param {Object} view  The view component handled by this <code>Mediator</code>.
   *
   * @see Puremvc.test.ViewTest
   *
   * @extends Puremvc.patterns.Mediator
   */
  constructor: function(view/*Object*/) {
    ViewTestMediator5.superclass.constructor.call(this, ViewTestMediator5.NAME, view);
  },

  /**
   * Standard getter to return the view handled by the
   * <code>Mediator</code>.
   *
   * @return {Object} The view handled by the <code>Mediator</code>.
   *
   * @private
   */
  _getViewTest: function()/*ViewTest*/ {
    return this.getViewComponent();
  },

  /**
   * @override
   *
   * @return {Array}
   *     The list of notifications names in which is interested the
   *     <code>Mediator</code>.
   */
  listNotificationInterests: function()/*Array*/ {
    return [ ViewTest.NOTE5 ];
  },

  /**
   * @override
   *
   * @param {Notification} notification
   *     The notification instance to be handled.
   */
  handleNotification: function(notification/*Notification*/) {
    this._getViewTest().counter++;
  }
});

Ext.apply(Puremvc.test.ViewTestMediator5,
/**
 * @lends Puremvc.test.ViewTestMediator5
 */
{
  /**
   * The Mediator name.
   *
   * @type {String}
   * @memberof Puremvc.test.ViewTestMediator5
   * @constant
   */
  NAME: 'ViewTestMediator5'
});

Alias('Puremvc.test.ViewTestMediator5');
