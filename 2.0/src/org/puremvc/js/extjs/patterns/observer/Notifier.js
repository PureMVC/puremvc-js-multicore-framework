/**
 * @lends Puremvc.patterns.Notifier.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Notifier = Ext.extend(Object, {
  /**
   * @class <P>The Base <code>Notifier</code> implementation.</P>
   * <P>
   * <code>MacroCommand</code>, <code>Command</code>, <code>Mediator</code> and
   * <code>Proxy</code> all have a need to send <code>Notifications</code>.</P>
   * <P>
   * The <code>Notifier</code> base class provides a common method called
   * <code>sendNotification</code> that relieves implementation code of
   * the necessity to actually construct <code>Notification</code>s.</P>
   *
   * <P>
   * The <code>Notifier</code> class, which all of the above mentioned classes
   * extend, provides an initialized reference to the <code>Facade</code>
   * singleton, which is required by the convenience method <code>sendNotification</cpde>
   * for sending <code>Notifications</code>, but it also eases implementation as these
   * classes have frequent <code>Facade</code> interactions and usually require
   * access to the facade anyway.</P>
   *
   * @see Puremvc.patterns.Facade
   * @see Puremvc.patterns.Mediator
   * @see Puremvc.patterns.Proxy
   * @see Puremvc.patterns.SimpleCommand
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   * 
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.Notifier.superclass.constructor.call(this);
    this.facade = Puremvc.patterns.Facade.getInstance();
  },

  /**
   * Create and send a <code>Notification</code>.
   *
   * <P>
   * Keeps us from having to construct new Notification
   * instances in our implementation code.</P>
   * 
   * @param {String} notificationName the name of the notiification to send.
   * @param {Object} [body] the (optional) body of the notification.
   * @param {String} [type] the (optional) type of the notification.
   */
  sendNotification: function(notificationName /* String */, body /* Object */, type /* String */) {
    this.facade.sendNotification(notificationName, body, type);
  }
});
