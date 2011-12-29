/**
 * @fileOverview
 * @author David Foley
 * @exports SimpleCommand as org.puremvc.js.multicore.patterns.command.SimpleCommand
 */

/**
 * SimpleCommands encapsulate the business logic of your application.
 * 
 * @constructor
 * @extends org.puremvc.js.multicore.patterns.observer.Notifier
 */
function SimpleCommand () { };

SimpleCommand.prototype= new Notifier;
SimpleCommand.prototype.constructor= SimpleCommand;

/**
 * Execute the SimpleCommans business logic, using the Notification body as the
 * carrier of the information needed to perform this logic.
 * 
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 * 
 * @see org.puremvc.js.multicore.patterns.facade.Facade#registerCommand
 * @see org.puremvc.js.multicore.core.Controller#registerCommand
 */
SimpleCommand.prototype.execute= function (notification) { };