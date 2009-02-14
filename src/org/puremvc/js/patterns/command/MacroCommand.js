/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
*
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
*
* @see org.puremvc.js.core.controller.Controller Controller
* @see org.puremvc.js.patterns.observer.Notification Notification
* @see org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
*/
function class_org_puremvc_js_patterns_command_MacroCommand()
{
	Objs.register("org.puremvc.js.patterns.command.MacroCommand",MacroCommand);

	var Notifier = Objs.load("org.puremvc.js.patterns.observer.Notifier");
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotifier = Objs.load("org.puremvc.js.interfaces.INotifier");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");

	/**
	 * Constructor.
	 *
	 * <P>
	 * You should not need to define a constructor,
	 * instead, override the <code>initializeMacroCommand</code>
	 * method.</P>
	 *
	 * <P>
	 * If your subclass does define a constructor, be
	 * sure to call <code>super()</code>.</P>
	 */
	function MacroCommand()
	{
		Notifier.apply(this,arguments);

		if(Objs.extending) return;

		this._subCommands = new Array();
		this._initializeMacroCommand();
	}

	/**
	 * <code>MacroCommand</code> extends <code>Notifier</code>
	 */
	Objs.extend(MacroCommand,Notifier);

	/**
	 * <code>MacroCommand</code> implements <code>ICommand</code>
	 */
	Objs.implement(MacroCommand,ICommand);

	/**
	 * <code>MacroCommand</code> implements <code>INotifier</code>
	 */
	Objs.implement(MacroCommand,INotifier);

	var o = MacroCommand.prototype;

	/**
	 * A list of <i>SubCommand</i>.
	 */
	o._subCommands/*Array*/ = null;

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
	 *      // Initialize MyMacroCommand
	o._initializeMacroCommand = function()
	 *      {
	 *          this.addSubCommand( com.me.myapp.controller.FirstCommand );
	 *          this.addSubCommand( com.me.myapp.controller.SecondCommand );
	 *          this.addSubCommand( com.me.myapp.controller.ThirdCommand );
	 *      }
	 * </listing>
	 *
	 * <P>
	 * Note that <i>SubCommand</i>s may be any <code>ICommand</code> implementor,
	 * <code>MacroCommand</code>s or <code>SimpleCommands</code> are both acceptable.
	 */
	o._initializeMacroCommand = function()
	{
	}

	/**
	 * Add a <i>SubCommand</i>.
	 *
	 * <P>
	 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
	 * order.</P>
	 *
	 * @param commandClassRef a reference to the <code>Function</code> of the <code>ICommand</code>.
	 */
	o._addSubCommand = function( commandClassRef/*Function*/ )
	{
		this._subCommands.push(commandClassRef);
	}

	/**
	 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
	 *
	 * <P>The <i>SubCommands</i> will be called in First In/First Out (FIFO)
	 * order.</P>
	 *
	 * @final Method must not be overrided.
	 *
	 * @param notification the <code>INotification</code> object to be passsed to each <i>SubCommand</i>.
	 */
	o.execute = function( notification/*INotification*/ )
	{
		while(this._subCommands.length>0)
		{
			var commandClassRef/*Function*/ = this._subCommands.shift();
			var commandInstance/*ICommand*/ = new commandClassRef();
			commandInstance.execute( notification );
		}
	}
}