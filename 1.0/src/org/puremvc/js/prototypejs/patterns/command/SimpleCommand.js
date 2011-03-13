/*
 PureMVC Javascript port for Prototype by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A base <code>Command</code> implementation.
 * 
 * <P>
 * Your subclass should override the <code>execute</code> method where
 * your business logic will handle the <code>Notification</code>.
 *
 * @extends org.puremvc.js.prototypejs.patterns.observer.Notifier Notifier
 *
 * @constructor
 */
var SimpleCommand = Class.create
(
	Notifier,
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