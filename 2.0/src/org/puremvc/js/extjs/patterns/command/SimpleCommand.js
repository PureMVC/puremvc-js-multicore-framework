/**
 * @lends Puremvc.patterns.SimpleCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.SimpleCommand = Ext.extend(Puremvc.patterns.Notifier, {
  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Command</code> implementation.</P>
   * <P>
   * Your subclass should override the <code>execute</code>
   * method where your business logic will handle the <code>Notification</code>.</P>
   *
   * @see Puremvc.core.Controller
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   * 
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.SimpleCommand.superclass.constructor.call(this);
  },

  /**
   * Fulfill the use-case initiated by the given <code>Notification</code>.
   *
   * <P>
   * In the Command Pattern, an application use-case typically
   * begins with some user action, which results in a <code>Notification</code> being broadcast, which
   * is handled by business logic in the <code>execute</code> method of an
   * <code>ICommand</code>.</P>
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to handle.
   */
  execute: function(notification /* Notification */) {
  }
});
