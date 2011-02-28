/**
 * @lends Puremvc.patterns.Notification.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Notification = Ext.extend(Object, {
  /**
   * @class <P>A base <code>Notification</code> implementation.</P>
   * <P>
   * PureMVC does not rely upon underlying event models such
   * as the one provided with Flash, and ActionScript 3 does
   * not have an inherent event model.</P>
   *
   * <P>
   * The Observer pattern as implemented within PureMVC exists
   * to support event-driven communication between the
   * application and the actors of the MVC triad (Model, View
   * and Controller.</P>
   *
   * <P>
   * Notifications are not meant to be a replacement for Events
   * in Flex/Flash/AIR/Javascript. Generally, <code>Mediator</code>
   * implementors place event listeners on their view components, which they
   * then handle in the usual way. This may lead to the broadcast of <code>Notification</code>s to
   * trigger <code>Command</code>s or to communicate with other <code>Mediators</code>.
   * <code>IProxy</code> and <code>Command</code>
   * instances communicate with each other and <code>Mediator</code>s
   * by broadcasting <code>Notification</code>s.</P>
   *
   * <P>
   * A key difference between Flash <code>Event</code>s and PureMVC
   * <code>Notification</code>s is that <code>Event</code>s follow the
   * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
   * until some parent component handles the <code>Event</code>, while
   * PureMVC <code>Notification</code>s follow a 'Publish/Subscribe'
   * pattern. PureMVC classes need not be related to each other in a
   * parent/child relationship in order to communicate with one another
   * using <code>Notification</code>s.
   *
   * @param {String} name the name of the notification.
   * @param {Object} [body] (optional) body data to send with the notification.
   * @param {String} [type] (optional) type identifier of the notification.
   *
   * @see Puremvc.patterns.Observer
   * 
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(name /* String */, body /* Object */, type /* String */) {
    Puremvc.patterns.Notification.superclass.constructor.call(this);
    this.name = name;
    this.body = body;
    this.type = type;
  },

  /**
   * Get the name of the <code>Notification</code> instance.
   *
   * @return the name of the <code>Notification</code> instance.
   * @type String
   */
  getName: function() {
    return this.name;
  },

  /**
   * Set the body of the <code>Notification</code> instance.
   *
   * @param {Object} body the body of the notification.
   */
  setBody: function(body /* Object */) {
    this.body = body;
  },

  /**
   * Get the body of the <code>Notification</code> instance.
   *
   * @return the body object.
   * @type Object
   */
  getBody: function() {
    return this.body;
  },

  /**
   * Set the type of the <code>Notification</code> instance.
   *
   * @param {String} type the type identifier for the notification.
   */
  setType: function(type /* String */) {
    this.type = type;
  },

  /**
   * Get the type of the <code>Notification</code> instance.
   *
   * @return the type identifier for the notification.
   * @type String
   */
  getType: function() {
    return this.type;
  },

  /**
   * Get a textual representation of the <code>Notification</code> instance.
   *
   * @return the textual representation of the <code>Notification</code> instance.
   * @type String
   */
  toString: function() {
    var msg = "Notification Name: " + this.getName();
    msg += "\nBody:" + ((this.body == null) ? "null": this.body.toString());
    msg += "\nType:" + ((this.type == null) ? "null": this.type);
    return msg;
  }
});
