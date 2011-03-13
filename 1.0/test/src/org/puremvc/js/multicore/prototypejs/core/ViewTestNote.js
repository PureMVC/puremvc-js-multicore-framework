/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Notification class used by ViewTest.
 *
 * @see org.puremvc.js.multicore.prototypejs.core.ViewTest ViewTest
 * 
 * @constructor
 */
var ViewTestNote = Class.create
(
	Notification,
	{
		/**
		 * @constructor.
		 * 
		 * @param {Function} $super
		 * 		<em>Prototype.js</em> standard superclass reference handling.
		 * 
		 * @param {String} name
		 * 		Ignored and forced to NAME.
		 * 
		 * @param {String} body 
		 * 		The body of the Notification to be constructed.
		 */
		initialize: function( $super, name, body )
		{						
			$super( ViewTestNote.NAME, body );
		}
	}
);

/**
 * The name of this Notification.
 * @type {String}
 */
ViewTestNote.NAME = "ViewTestNote";

/**
 * Factory method.
 * 
 * <P> 
 * This method creates new instances of the ViewTestNote class,
 * automatically setting the note name so you don't have to. Use
 * this as an alternative to the constructor.
 * 
 * @param {Object} body
 * 		The body of the Notification to be constructed.
 *
 * @return {Notification}
 *		The created <code>Notification</code>
 */
ViewTestNote.create = function( body )	
{
	return new ViewTestNote( ViewTestNote.NAME, body );
}