/**
 * @fileOverview
 * @author David Foley
 * @exports SimpleCommand as org.puremvc.js.multicore.patterns.command.SimpleCommand
 */

/**
 * 
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function SimpleCommand () { };

SimpleCommand.prototype= new Notifier;
SimpleCommand.prototype.constructor= SimpleCommand;

/**
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.command.ICommand#execute
 */
SimpleCommand.prototype.execute= function (notification) { };