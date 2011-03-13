/*
 PureMVC Javascript MultiCore port for Prototype by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Test the PureMVC Notification class.
 * 
 * @see org.puremvc.js.multicore.prototypejs.patterns.observer.Notification
 */
var NotificationTest = new YUITest.TestCase
(
	{	
       /**
         * The name of the test case - if not provided, one is automatically
         * generated by the YUITest framework.
         * 
         * @type {String}
         * @private
         */
        name: "PureMVC Notification class tests",  

        /**
         * Sets up data that is needed by each test.
         */
        setUp: function()
		{
        },
        
        /**
         * Cleans up everything that was created by setUp().
         */
        tearDown: function()
		{
        },
        
  		/**
  		 * Tests setting and getting the name using Notification class accessor
  		 * methods.
  		 */
  		testNameAccessors: function()
		{
			// Create a new Notification and use accessors to set the note name 
   			var note/*Notification*/ = new Notification('TestNote');     
  			
   			// test assertions
   			YUITest.Assert.areEqual
			(
				'TestNote',
				note.getName(),
				"Expecting note.getName() == 'TestNote'"
			);
   		},

  		/**
  		 * Tests setting and getting the body using Notification class accessor
  		 * methods.
  		 */
  		testBodyAccessors: function()
		{
			// Create a new Notification and use accessors to set the body
   			var note/*Notification*/ = new Notification(null);
   			note.setBody(5);
   			
   			// test assertions
   			YUITest.Assert.areSame
			(
				5,
				note.getBody(),
				"Expecting note.getBody() === 5"
			);
   		},

  		/**
  		 * Tests setting the name and body using the Notification class
  		 * Constructor.
  		 */
  		testConstructor: function()
		{
			// Create a new Notification using the Constructor to set the note name and body
   			var note/*Notification*/ = new Notification( 'TestNote', 5, 'TestNoteType' );
   			
   			// test assertions
   			YUITest.Assert.areEqual
			(
				"TestNote",
				note.getName(),
				"Expecting note.getName() == 'TestNote'" 
			);
			
   			YUITest.Assert.areSame
			(
				5,
				note.getBody(),
				"Expecting note.getBody() === 5"
			);
			
   			YUITest.Assert.areEqual
			(
				"TestNoteType",
				note.getType(),
				"Expecting note.getType() == 'TestNoteType'"
			);
   		},

  		/**
  		 * Tests the toString method of the notification
  		 */
  		testToString: function()
		{
			// Create a new Notification and use accessors to set the note name 
   			var note/*Notification*/ = new Notification( 'TestNote', [1,3,5], 'TestType' );
   			var ts/*String*/ = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
   			
   			// test assertions
   			YUITest.Assert.areEqual
			(
				ts,
				note.toString(),
				"Expecting note.testToString() == '" + ts + "'"
			);
   		}
  	}
);