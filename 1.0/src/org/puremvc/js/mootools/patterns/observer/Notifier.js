/**
 * @misc
 * @class The Base <code>Notifier</code> implementation.
 * <P>
 * <code>MacroCommand, Command, Mediator</code> and <code>Proxy</code>
 * all have a need to send <code>Notifications</code>. <P>
 * <P>
 * The <code>Notifier</code> base class provides a common method called
 * <code>sendNotification</code> that relieves implementation code of
 * the necessity to actually construct <code>Notifications</code>.</P>
 *
 * <P>
 * The <code>Notifier</code> class, which all of the above mentioned classes
 * extend, provides an initialized reference to the <code>Facade</code>
 * Singleton, which is required for the convienience method
 * for sending <code>Notifications</code>, but also eases implementation as these
 * classes have frequent <code>Facade</code> interactions and usually require
 * access to the facade anyway.</P>
 *
 * @see Facade
 * @see Mediator
 * @see Proxy
 * @see SimpleCommand
 * @see MacroCommand
 * @author Justin Wilaby
 */
var Notifier = function(){

    /**
    * The <code>Facade</code> Singleton
    * @type Facade
    */
    this.facade = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.facade = Facade.getInstance();
    }

    /**
     * Create and send a <code>Notification</code>.
     *
     * <P>
     * Keeps us from having to construct new Notification
     * instances in our implementation code.
     * @param {String} notificationName the name of the notiification to send
     * @param {Object} [body] the body of the notification
     * @param {String} [type] the type of the notification
     */
    this.sendNotification = function(notificationName /* String */, body /* Object */, type /* String */)
    {
	this.facade.sendNotification(notificationName, body, type);
    }
}
Notifier = new Class(new Notifier());