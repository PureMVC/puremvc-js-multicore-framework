/**
 * @lends Puremvc.patterns.Mediator.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.Mediator = Ext.extend(Puremvc.patterns.Notifier, {

  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Mediator</code> implementation.</P>
   * <P>
   * Typically, a <code>Mediator</code> will be written to serve
   * one specific control or group controls and so,
   * will not have a need to be dynamically named.</P>
   *
   * @param {String} mediatorName the name of the <code>Mediator</code>.
   * @param {Object} viewComponent The <code>Mediator</code>'s view component.
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(mediatorName /* String */, viewComponent /* Object */) {
    Puremvc.patterns.Mediator.superclass.constructor.call(this);
    this.mediatorName = (mediatorName != null) ? mediatorName : Puremvc.patterns.Mediator.NAME;
    this.viewComponent = viewComponent;
  },

  /**
   * List the <code>Notification</code> names this
   * <code>Mediator</code> is interested in being notified of.
   *
   * @return the list of <code>Notification</code> names.
   * @type Puremvc.patterns.Notification[]
   */
  listNotificationInterests: function() {
    return [];
  },

  /**
   * Get the name of the <code>Mediator</code>.
   *
   * @return the <code>Mediator</code> name.
   * @type String
   */
  getMediatorName: function() {
    return this.mediatorName;
  },

  /**
   * Get the <code>Mediator</code>'s view component.
   *
   * @return the view component.
   * @type Object
   */
  getViewComponent: function() {
    return this.viewComponent;
  },

  /**
   * Set the <code>Mediator</code>'s view component.
   *
   * @param {Object} viewComponent The view component.
   */
  setViewComponent: function(viewComponent /* Object */) {
    this.viewComponent = viewComponent;
  },

  /**
   * Handle <code>INotification</code>s.
   *
   * <P>
   * Typically this will be handled in a switch statement,
   * with one 'case' entry per <code>Notification</code>
   * the <code>Mediator</code> is interested in.
   *
   * @param {Puremvc.patterns.Notification} notification The notification instance to be handled.
   */
  handleNotification: function(notification /* Notification */) {
  },

  /**
   * Called by the View when the Mediator is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
  },

  /**
   * Called by the View when the Mediator is removed.
   * This method is usually overridden as needed by the subclass.
   */
  onRemove: function() {
  }
});

Ext.apply(Puremvc.patterns.Mediator,
/** @lends Puremvc.patterns.Mediator# */
{
  /**
   * Default name of the <code>Mediator</code>.
   * 
   * @type String
   * @constant
   * @memberof Puremvc.patterns.Mediator
   */
  NAME: "Mediator"
});
