/**
 * @misc
 * @class A base <code>Mediator</code> implementation.
 * <P>
 * Typically, a <code>Mediator</code> will be written to serve
 * one specific control or group controls and so,
 * will not have a need to be dynamically named.</P>
 * Typically, a <code>Mediator</code> will be written to serve
 * one specific control or group controls and so,
 * will not have a need to be dynamically named.</P>
 * @extends Notifier
 * @param {String} mediatorName the name of the Mediator.
 * @param {Object} viewComponent The <code>Mediator</code>'s view component.
 * @author Justin Wilaby
 */
var Mediator = function(mediatorName /* String */, viewComponent /* Object */){
    this.Extends = Notifier;

    /**
     * The name of the <code>Mediator</code> subclass
     * @type String
     */
    this.mediatorName = null;
    /**
     * The vewComponet instance to mediate
     * @type Object
     */
    this.viewComponent = null;
    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(mediatorName /* String */, viewComponent /* Object */)
    {
	this.parent();
	this.mediatorName = mediatorName || Mediator.NAME;
	this.viewComponent = viewComponent;
    }

    /**
     * List the <code>Notification</code> names this
     * <code>Mediator</code> is interested in being notified of.
     *
     * @return {Notification[]} the list of <code>Notification</code> names
     */
    this.listNotificationInterests = function()
    {
	return [];
    }

    /**
     * Get the name of the <code>Mediator</code>.
     *
     * @return {String} The Mediator name.
     */
    this.getMediatorName = function()
    {
	return this.mediatorName;
    }

    /**
     * Get the <code>Mediator</code>'s view component.
     *
     * @return {Object} the view component
     */
    this.getViewComponent = function()
    {
	return this.viewComponent;
    }

    /**
     * Set the <code>Mediator</code>'s view component.
     *
     * @param {Object} viewComponent The view component.
     */
    this.setViewComponent = function(viewComponent /* Object */)
    {
	this.viewComponent = viewComponent;
    }

    /**
     * Handle <code>INotification</code>s.
     *
     * <P>
     * Typically this will be handled in a switch statement,
     * with one 'case' entry per <code>Notification</code>
     * the <code>Mediator</code> is interested in.
     * @param {Notification} notification The notification instance to be handled.
     */
    this.handleNotification = function(notification /* Notification */){}

    /**
     * Called by the View when the Mediator is registered.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRegister = function(){}

    /**
     * Called by the View when the Mediator is removed.
     * This method is usually overridden as needed by the subclass.
     */
    this.onRemove = function(){}
}
Mediator = new Class(new Mediator());
/**
 * Default name of the <code>Mediator</code>
 * @type String
 */
Mediator.NAME = "Mediator";