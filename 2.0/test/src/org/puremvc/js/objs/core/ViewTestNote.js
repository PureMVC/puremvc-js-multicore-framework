/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Notification class used by ViewTest.
 *
 * @see puremvc.ViewTest ViewTest
 * @extends puremvc.Notification Notification
 * 
 * @constructor
 */
var ViewTestNote = Objs
(
	"puremvc.ViewTestNote",
	"puremvc.Notification", 
	{
		/**
		 * @constructor.
		 * 
		 * @param {String} name
		 * 		Ignored and forced to NAME.
		 * 
		 * @param {Object} body 
		 * 		The body of the Notification to be constructed.
		 */
		initialize: function( name, body )
		{						
			ViewTestNote.$super.initialize.call( this, ViewTestNote.NAME, body );
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