/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestMediator = Ext.extend(Puremvc.patterns.Mediator,
/**
 * @lends Puremvc.test.ViewTestMediator.prototype
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
    ViewTestMediator.superclass.constructor.call(this, ViewTestMediator.NAME, view);
  },

  /**
   * @override
   *
   * @return {Array} The list of notification names in which the <code>Puremvc.patterns.Mediator</code> is interested.
   */
  listNotificationInterests: function()/*Array*/ {
    // Be sure that the Puremvc.patterns.Mediator has some Puremvc.patterns.Observers created
    // in order to test removeMediator function.
    return [ 'ABC', 'DEF', 'GHI' ];
  }
});

Ext.apply(Puremvc.test.ViewTestMediator,
/**
 * @lends Puremvc.test.ViewTestMediator
 */
{
  /**
   * The Puremvc.patterns.Mediator name.
   *
   * @type {String}
   * @memberof Puremvc.test.ViewTestMediator
   * @constant
   */
  NAME: "ViewTestMediator"
});

Alias('Puremvc.test.ViewTestMediator');
