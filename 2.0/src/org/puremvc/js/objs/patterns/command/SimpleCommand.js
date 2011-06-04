/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * A base <code>Command</code> implementation.
	 * 
	 * <P>
	 * Your subclass should override the <code>execute</code> method where
	 * your business logic will handle the <code>Notification</code>.
	 *
	 * <P>
	 * As in JavaScript there isn't interfaces, <code>SimpleCommand</code> and
	 * <code>MacroCommand</code> cannot offer the guarantee to have the right
	 * signature. We could have inherited from a common <code>Command</code> class,
	 * but to avoid an unwanted complexity and to respect PureMVC implementation,
	 * this is to the developer to take care to inherit from
	 * <code>SimpleCommand</code> in its command and <code>MacroCommand</code>
	 * depending on his need.
	 * 
	 * @extends puremvc.Notifier Notifier
	 *
	 * @constructor
	 */
	Objs
	(
		"puremvc.SimpleCommand",
		"puremvc.Notifier",
		{
			/**
			 * Fulfill the use-case initiated by the given <code>Notification</code>.
			 *
			 * <P>
			 * In the Command Pattern, an application use-case typically begins with
			 * some user action, which results in a <code>Notification</code> being
			 * broadcast, which is handled by business logic in the
			 * <code>execute</code> method of an <code>Command</code>.
			 *
			 * @param {Notification} note 
			 * 		The <code>Notification</code> to handle.
			 */
			execute: function( note ){}
		}
	);
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	SimpleCommand = Objs("puremvc.SimpleCommand");