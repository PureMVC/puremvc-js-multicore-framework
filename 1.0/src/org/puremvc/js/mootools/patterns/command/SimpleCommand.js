/**
 * @misc
 * @class A base <code>Command</code> implementation.
 * <P>
 * Your subclass should override the <code>execute</code>
 * method where your business logic will handle the <code>Notification</code>. </P>
 * @extends Notifier
 * @see Controller
 * @see Notification
 * @see MacroCommand
 */
var SimpleCommand = function(){
    this.Extends = Notifier;

    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.parent();
    }

    /**
     * Fulfill the use-case initiated by the given <code>Notification</code>.
     *
     * <P>
     * In the Command Pattern, an application use-case typically
     * begins with some user action, which results in a <code>Notification</code> being broadcast, which
     * is handled by business logic in the <code>execute</code> method of an
     * <code>ICommand</code>.</P>
     *
     * @param {Notification} notification the <code>Notification</code> to handle.
     */
    this.execute = function(notification /* Notification */){}
}
SimpleCommand = new Class(new SimpleCommand());