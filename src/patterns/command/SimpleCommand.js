/*
 *  SimpleCommand.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
 */

import { Notifier } from "../observer/Notifier.js";

/**
 * A base `Command` implementation.
 *
 * <P>Your subclass should override the `execute`
 * method where your business logic will handle the `Notification`.</P>
 *
 * @see Controller Controller
 * @see Notification Notification
 * @see MacroCommand MacroCommand
 *
 * @class SimpleCommand
 */
class SimpleCommand extends Notifier {
  constructor() {
    super();
  }

  /**
   * Fulfill the use-case initiated by the given `Notification`.
   *
   * <P>In the Command Pattern, an application use-case typically
   * begins with some user action, which results in a `Notification` being broadcast, which
   * is handled by business logic in the `execute` method of an
   * `Command`.</P>
   *
   * @param {Notification} notification
   */
  // eslint-disable-next-line no-unused-vars
  execute(notification) {}
}
export { SimpleCommand };
