/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription <P>A base <code>Command</code> implementation that executes other <code>Command</code>s.
 *
 * <P>
 * A <code>MacroCommand</code> maintains an list of
 * <code>Command</code> Class references called <i>SubCommands</i>.
 *
 * <P>
 * When <code>execute</code> is called, the <code>MacroCommand</code>
 * instantiates and calls <code>execute</code> on each of its <i>SubCommands</i> turn.
 * Each <i>SubCommand</i> will be passed a reference to the original
 * <code>Notification</code> that was passed to the <code>MacroCommand</code>'s
 * <code>execute</code> method.
 *
 * <P>
 * Unlike <code>SimpleCommand</code>, your subclass
 * should not override <code>execute</code>, but instead, should
 * override the <code>initializeMacroCommand</code> method,
 * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
 * to be executed.
 * 
 * @extends org.puremvc.js.prototypejs.patterns.observer.Notifier Notifier
 * 
 * @constructor
 */
var MacroCommand = Class.create
(
	Notifier,
	{
		/**
		 * An array of <code>SimpleCommands</code>
		 * or subclasses of.
		 * @type {Array}
		 * @private
		 */
		subCommands: null,

		/**
		 * @override
		 *
		 * Initialize a <code>MacroCommand</code> instance.
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 */
		initialize: function( $super )
		{
			$super();

			this.subCommands = [];
			this.initializeMacroCommand();
		},

		/**
		 * Initialize the <code>MacroCommand</code>.
		 *
		 * <P>
		 * In your subclass, override this method to
		 * initialize the <code>MacroCommand</code>'s <i>subCommands</i>
		 * list with <code>Command</code> class references like
		 * this:
		 *
		 * <pre>
		 *    // Initialize MyMacroCommand
		 *    initializeMacroCommand: function()
		 *    {
		 *    	this.addSubCommand(FirstCommand);
		 *      this.addSubCommand(SecondCommand);
		 *      this.addSubCommand(ThirdCommand);
		 *    }
		 * </pre>
		 *
		 * <P>
		 * Note that <i>subCommands</i> may be any <code>Command</code>
		 * implementor.
		 *
		 * <P>
		 * In the JavaScript version it means that it only needs to
		 * implement an execute method and inherits from Notifier.
		 */
		initializeMacroCommand: function()
		{
		},

		/**
		 * Add an entry to <i>subCommands</i> list.
		 *
		 * <P>
		 * The <i>subCommands</i> will be called in First In/First Out (FIFO)
		 * order.
		 *
		 * @param {Function} commandClassRef
		 * 		A reference to the constructor of the <code>Command</code>.
		 */
		addSubCommand: function( commandClassRef )
		{
			this.subCommands.push( commandClassRef );
		},

		/**
		 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
		 *
		 * <P>
		 * The <i>subCommands</i> will be called in First In/First Out (FIFO)
		 * order.
		 *
		 * @param {Notification} note
		 * 		The <code>Notification</code> object to be passed to each entry
		 * 		of <i>subCommands</i> list.
		 */
		execute: function( note )
		{
			while( this.subCommands.length > 0)
			{
				var commandClassRef/*Function*/ = this.subCommands.shift();
				var commandInstance/*Command*/ = new commandClassRef();
				commandInstance.execute( note );
			}
		}
	}
);