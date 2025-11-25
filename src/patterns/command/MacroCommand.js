/*
 *  MacroCommand.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
 */

import { SimpleCommand } from "./SimpleCommand.js";

/**
 * A base `Command` implementation that executes other `Command`s.
 *
 * <P>A `MacroCommand` maintains a list of
 * `Command` Class references called <i>SubCommands</i>.</P>
 *
 * <P>When `execute` is called, the `MacroCommand`
 * instantiates and calls `execute` on each of its <i>SubCommands</i> turn.
 * Each <i>SubCommand</i> will be passed a reference to the original
 * `Notification` that was passed to the `MacroCommand`'s
 * `execute` method.</P>
 *
 * <P>Unlike `SimpleCommand`, your subclass
 * should not override `execute`, but instead, should
 * override the `initializeMacroCommand` method,
 * calling `addSubCommand` once for each <i>SubCommand</i>
 * to be executed.</P>
 *
 * @see Controller Controller
 * @see Notification Notification
 * @see SimpleCommand SimpleCommand
 *
 * @class MacroCommand
 */
class MacroCommand extends SimpleCommand {
  /**
   * Constructor.
   *
   * <P>You should not need to define a constructor,
   * instead, override the `initializeMacroCommand`
   * method.</P>
   *
   * <P>If your subclass does define a constructor, be
   * sure to call `super()`.</P>
   *
   * @constructor
   */
  constructor() {
    super();
    /** @protected
     * @type {Array.<function():SimpleCommand>} */
    this.subCommands = [];
    this.initializeMacroCommand();
  }

  /**
   * Initialize the `MacroCommand`.
   *
   * <P>In your subclass, override this method to
   * initialize the `MacroCommand`'s <i>SubCommand</i>
   * list with `Command` class references like
   * this:</P>
   *
   * <pre>`
   *		// Initialize MyMacroCommand
   *		initializeMacroCommand() {
   *			this.addSubCommand(() => new app.FirstCommand());
   *			this.addSubCommand(() => new app.SecondCommand());
   *			this.addSubCommand(() => new app.ThirdCommand());
   *		}
   * `</pre>
   *
   * <P>Note that <i>SubCommand</i>s may be any `Command` implementor,
   * `MacroCommand`s or `SimpleCommands` are both acceptable.
   */
  initializeMacroCommand() {}

  /**
   * Add a <i>SubCommand</i>.
   *
   * <P>The <i>SubCommands</i> will be called in First In/First Out (FIFO)
   * order.</P>
   *
   * @param {function():SimpleCommand} factory
   */
  addSubCommand(factory) {
    this.subCommands.push(factory);
  }

  /**
   * Execute this `MacroCommand`'s <i>SubCommands</i>.
   *
   * <P>The <i>SubCommands</i> will be called in First In/First Out (FIFO)
   * order.</P>
   *
   * @param {Notification} notification
   */
  execute(notification) {
    while (this.subCommands.length > 0) {
      let factory = this.subCommands.shift();
      let commandInstance = factory();
      commandInstance.initializeNotifier(this.multitonKey);
      commandInstance.execute(notification);
    }
  }
}
export { MacroCommand };
