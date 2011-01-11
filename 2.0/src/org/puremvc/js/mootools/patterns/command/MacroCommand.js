/**
 * @misc
 * @class A base <code>Command</code> implementation that executes other <code>Command</code>s.
 * <P>
 * A <code>MacroCommand</code> maintains an list of
 * <code>ICommand</code> Class references called <i>SubCommands</i>.</P>
 *
 * <P>
 * When <code>execute</code> is called, the <code>MacroCommand</code>
 * instantiates and calls <code>execute</code> on each of its <i>SubCommands</i> turn.
 * Each <i>SubCommand</i> will be passed a reference to the original
 * <code>INotification</code> that was passed to the <code>MacroCommand</code>'s
 * <code>execute</code> method.</P>
 *
 * <P>
 * Unlike <code>SimpleCommand</code>, your subclass
 * should not override <code>execute</code>, but instead, should
 * override the <code>initializeMacroCommand</code> method,
 * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
 * to be executed.</P>
 *
 * <P>
 * @extends Notifier
 * @see Controller
 * @see Notification
 * @see SimpleCommand
 */
var MacroCommand = function(){
    this.Extends = Notifier;

    /**
     * An array of <code>SimpleCommands</code>
     * or subclasses of
     * @type Array
     */
    this.subCommands = [];
    /**
     * @ignore
     */
    this.initialize = function()
    {
	this.initializeMacroCommand();
    }

    /**
     * Initialize the <code>MacroCommand</code>.
     *
     * <P>
     * In your subclass, override this method to
     * initialize the <code>MacroCommand</code>'s <i>SubCommand</i>
     * list with <code>ICommand</code> class references like
     * this:</P>
     *
     * <listing>
     *		// Initialize MyMacroCommand
     *		initializeMacroCommand : function()
     *		{
     *			this.addSubCommand(FirstCommand);
     *			this.addSubCommand(SecondCommand);
     *			this.addSubCommand(ThirdCommand);
     *		}
     * </listing>
     *
     * <P>
     * Note that <i>SubCommand</i>s may be any <code>Command</code> implementor,
     * <code>MacroCommand</code>s or <code>SimpleCommands</code> are both acceptable.
     */
    this.initializeMacroCommand = function(){}

    /**
     * Add a <i>SubCommand</i>.
     *
     * <P>
     * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.</P>
     *
     * @param {Class} commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
     */
    this.addSubCommand = function(commandClassRef /* Class */)
    {
	this.subCommands.push(commandClassRef);
    }

    /**
     * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
     *
     * <P>
     * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
     * order.
     *
     * @param {Notification} notification the <code>Notification</code> object to be passsed to each <i>SubCommand</i>.
     */
    this.execute = function(notification /* Notification */)
    {
	var len = this.subCommands.length;
	for (var i = 0; i < len; i++)
	{
	    var commandClassRef = this.subCommands[i];
	    var commandInstance = new commandClassRef();
	    commandInstance.execute(notification);
	}
    }
}
MacroCommand = new Class(new MacroCommand());