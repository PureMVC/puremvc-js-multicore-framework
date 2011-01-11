/**
 * @misc
 * @class A base <code>Observer</code> implementation.
 * <P>
 * An <code>Observer</code> is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular <code>Notification</code> is broadcast. </P>
 *
 * <P>
 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
 * <UL>
 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
 * <LI>Provide methods for setting the notification method and context.</LI>
 * <LI>Provide a method for notifying the interested object.</LI>
 * </UL>
 * @param {Function} notifyMethod the notification method of the interested object
 * @param {Object} notifyContext the notification context of the interested object
 * @see View
 * @see Notification
 */
var Observer = function(notifyMethod /* Function */, notifyContext /* Object */){

    /**
     * The method to call when notifying <code>Observer</code>s
     * @type Function
     */
    this.notify = null;
    /**
     * The context (this) of interested objects
     * @type Object
     */
    this.context = null;

    /**
     * @ignore
     * MooTools Class constructor function
     */
    this.initialize = function(notifyMethod /* Function */, notifyContext /* Object */)
    {
	this.notify = notifyMethod;
	this.context = notifyContext;
    }

    /**
     * Set the notification method.
     *
     * <P>
     * The notification method should take one parameter of type <code>Notification</code>.</P>
     *
     * @param {Function} notifyMethod the notification (callback) method of the interested object.
     */
    this.setNotifyMethod = function(notifyMethod /* Function */)
    {
	this.notify = notifyMethod;
    }

    /**
     * Set the notification context.
     *
     * @param {Object} notifyContext the notification context (this) of the interested object.
     */
    this.setNotifyContext = function(notifyContext /* Object */ )
    {
	this.context = notifyContext;
    }

    /**
     * Get the notification method.
     *
     * @return {Function} the notification (callback) method of the interested object.
     */
    this.getNotifyMethod = function()
    {
	return this.notify;
    }

    /**
     * Get the notification context.
     *
     * @return {Object} the notification context (<code>this</code>) of the interested object.
     */
    this.getNotifyContext = function()
    {
	return this.context;
    }

    /**
     * @private
     * Notify the interested object.
     *
     * @param {Notification} notification the <code>Notification</code> to pass to the interested object's notification method.
     */
    this.notifyObserver = function(notification /* Notification */)
    {
	this.notify.apply(this.context, [notification]);
    }

    /**
     * @private
     * Compare an object to the notification context.
     *
     * @param {Object} object the object to compare
     * @return {Boolean} Indicates if the object and the notification context are the same
     */
    this.compareNotifyContext = function(object /* Object */)
    {
	return object === this.context;
    }
}
Observer = new Class(new Observer());