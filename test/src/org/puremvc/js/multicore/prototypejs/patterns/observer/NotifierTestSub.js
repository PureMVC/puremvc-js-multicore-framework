/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A <code>Notifier</code> utility subclass used by <code>NotifierTest</code>.
 * 
 * @extends org.puremvc.js.objs.patterns.observer.Notifier Notifier
 * 
 * @constructor
 */
var NotifierTestSub = Class.create
(
	Notifier,
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has
		 * well been declared during its construction.
		 * 
		 * @return {Boolean}
		 * 		<code>Facade</code> instance of the object has well been declared
		 * 		during its construction.
		 */
		hasFacade: function()
		{
			return this.facade() instanceof Facade;
		}
	}
);