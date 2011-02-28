/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator2 = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator2.prototype
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
    ViewTestMediator2.superclass.constructor.call(this, ViewTestMediator2.NAME, view);
  },

  /**
   * Standard getter to return the view handled by the
   * <code>Puremvc.patterns.Mediator</code>.
   *
   * @return {Object}
   *     The view component handled by the <code>Puremvc.patterns.Mediator</code>.
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
   *     The list of Puremvc.patterns.Notifications names in which the
   *     <code>Puremvc.patterns.Mediator</code> is interested.
   */
  listNotificationInterests: function()/*Array*/ {
    // Be sure that the Puremvc.patterns.Mediator has some Puremvc.patterns.Observers created
    // in order to test removeMediator.
    return [ ViewTest.NOTE1, ViewTest.NOTE2 ];
  },

  /**
   * @override
   *
   * @param {Puremvc.patterns.Notification} note
   *     The Puremvc.patterns.Notification instance to be handled.
   */
  handleNotification: function(note/*Puremvc.patterns.Notification*/) {
    this._getViewTest().lastNotification = note.getName();
  }
});

Ext.apply(Puremvc.test.ViewTestMediator2,
/**
 * @lends Puremvc.test.ViewTestMediator2
 */
{
  /**
   * The Puremvc.patterns.Mediator name.
   *
   * @type {String}
   * @memberof Puremvc.test.ViewTestMediator2
   * @constant
   */
  NAME: 'ViewTestMediator2'
});

Alias('Puremvc.test.ViewTestMediator2');
