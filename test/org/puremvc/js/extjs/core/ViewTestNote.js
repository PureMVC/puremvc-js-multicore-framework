/*
 PureMVC ExtJS Javascript port by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace('Puremvc.test');
Puremvc.test.ViewTestNote = Ext.extend(Puremvc.patterns.Notification,
/**
 * @lends Puremvc.test.ViewTestNote.prototype
 */
{
  /**
   * @constructs A <code>Puremvc.patterns.Notification</code> class used by ViewTest.
   *
   * @param name Ignored and forced to NAME.
   * @param body The body of the Puremvc.patterns.Notification to be constructed.
   *
   * @see Puremvc.test.ViewTest
   */
  constructor: function(name/*String*/, body/*Object*/) {
    ViewTestNote.superclass.constructor.call(this, ViewTestNote.NAME, body);
  }
});

Ext.apply(Puremvc.test.ViewTestNote,
/**
 * @lends Puremvc.test.ViewTestNote
 */
{
  /**
   * The name of this Puremvc.patterns.Notification.
   * @type {String}
   * @constant
   * @static
   * @memberof Puremvc.test.ViewTestNote
   */
  NAME: "ViewTestNote",

  /**
   * Factory method.
   *
   * <P>
   * This method creates new instances of the ViewTestNote class,
   * automatically setting the note name so you don't have to. Use
   * this as an alternative to the constructor.</P>
   *
   * @param {String} name
   *     The name of the Puremvc.patterns.Notification to be constructed.
   *
   * @param {Object} body
   *     The body of the Puremvc.patterns.Notification to be constructed.
   */
  create: function(body/*Object*/)/*Puremvc.patterns.Notification*/ {
    return new ViewTestNote(ViewTestNote.NAME, body);
  }
});

Alias('Puremvc.test.ViewTestNote');
