/**
 * @lends Puremvc.patterns.Observer.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Observer = Ext.extend(Object, {
  /**
   * @class <p>A base <code>Observer</code> implementation.</P>
   * <P>
   * An <code>Observer</code> is an object that encapsulates information
   * about an interested object with a method that should
   * be called when a particular <code>Notification</code> is broadcast.</P>
   *
   * <P>
   * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
   * <UL>
   * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
   * <LI>Encapsulate the notification context (this) of the interested object.</LI>
   * <LI>Provide methods for setting the notification method and context.</LI>
   * <LI>Provide a method for notifying the interested object.</LI>
   * </UL>
   *
   * @see Puremvc.core.View
   * @see Puremvc.patterns.Notification
   *
   * @param {Function} notifyMethod the notification method of the interested object.
   * @param {Object} notifyContext the notification context of the interested object.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(notifyMethod /* Function */, notifyContext /* Object */) {
    Puremvc.patterns.Observer.superclass.constructor.call(this);
    this.notify = notifyMethod;
    this.context = notifyContext;
  },

  /**
   * Set the notification method.
   *
   * <P>
   * The notification method should take one parameter of type <code>Notification</code>.</P>
   *
   * @param {Function} notifyMethod the notification (callback) method of the interested object.
   */
  setNotifyMethod: function(notifyMethod /* Function */) {
    this.notify = notifyMethod;
  },

  /**
   * Set the notification context.
   *
   * @param {Object} notifyContext the notification context (this) of the interested object.
   */
  setNotifyContext: function(notifyContext /* Object */) {
    this.context = notifyContext;
  },

  /**
   * Get the notification method.
   *
   * @return the notification (callback) method of the interested object.
   * @type Function
   */
  getNotifyMethod: function() {
    return this.notify;
  },

  /**
   * Get the notification context.
   *
   * @return the notification context (<code>this</code>) of the interested object.
   * @type Object
   */
  getNotifyContext: function() {
    return this.context;
  },

  /**
   * @private
   * Notify the interested object.
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> to pass to the interested object's notification method.
   */
  notifyObserver: function(notification /* Notification */) {
    this.notify.apply(this.context, [notification]);
  },

  /**
   * @private
   * Compare an object to the notification context.
   *
   * @param {Object} object the object to compare.
   *
   * @return true if the object and the notification context are the same, otherwise false.
   * @type Boolean
   */
  compareNotifyContext: function(object /* Object */) {
    return object === this.context;
  }
});
