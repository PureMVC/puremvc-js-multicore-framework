/**
 * @lends Puremvc.patterns.MacroCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.MacroCommand = Ext.extend(Puremvc.patterns.Notifier, {
  /**
   * An array of <code>SimpleCommands</code>
   * or subclasses of.
   * @type Array
   * @private
   */
  subCommands: null,

  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base <code>Command</code> implementation that executes other <code>Command</code>s.</P>
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
   * @see Puremvc.core.Controller
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.SimpleCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   * 
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.MacroCommand.superclass.constructor.call(this);
    this.subCommands = new Array();
    this.initializeMacroCommand();
  },

  /**
   * Initialize the <code>MacroCommand</code>.
   *
   * <P>
   * In your subclass, override this method to
   * initialize the <code>MacroCommand</code>'s <i>subCommands</i>
   * list with <code>ICommand</code> class references like
   * this:</P>
   *
   * <listing>
   *    // Initialize MyMacroCommand
   *    initializeMacroCommand: function()
   *    {
   *      this.addSubCommand(FirstCommand);
   *      this.addSubCommand(SecondCommand);
   *      this.addSubCommand(ThirdCommand);
   *    }
   * </listing>
   *
   * <P>
   * Note that <i>subCommands</i> may be any <code>Command</code> implementor;
   * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
   */
  initializeMacroCommand: function() {
  },

  /**
   * Add an entry to <i>subCommands</i> list.
   *
   * <P>
   * The <i>subCommands</i> will be called in First In/First Out (FIFO)
   * order.</P>
   *
   * @param {Class} commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
   */
  addSubCommand: function(commandClassRef /* Class */) {
    this.subCommands.push(commandClassRef);
  },

  /**
   * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
   *
   * <P>
   * The <i>subCommands</i> will be called in First In/First Out (FIFO)
   * order.
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> object to be passed to each entry of <i>subCommands</i> list.
   */
  execute: function(notification /* Notification */) {
    var len = this.subCommands.length;
    for (var i = 0; i < len; i++) {
      var commandClassRef = this.subCommands[i];
      var commandInstance = new commandClassRef();
      commandInstance.execute(notification);
    }
  }
});
