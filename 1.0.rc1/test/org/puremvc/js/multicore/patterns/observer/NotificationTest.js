TestCase
(
    'org.puremvc.js.patterns.observer.NotificationTest'
    
,   {
        /**
         * Log a message to the console if supported.
         *
         * @param {String} message
         *  The message to log
         * @return {void}
         * @private
         */
        log: function (message)
        {
            if (window.console && console.log)
                console.log(message);
        }
        
        /**
         * A helper method called before each test is run. Use it to setup the 
         * conditions required to facilitate each test.
         *
         * @return {void}
         * @protected
         */
    ,   setUp: function ()
        {
            
        }
        
        /**
         * A helper method called after each test is run. Use it to clean uo anything
         * left over after running a test.
         *
         * @return {void}
         * @protected
         */
    ,   tearDown: function ()
        {
        
        }
        
    ,   testNameAccessors: function ()
        {

            // Create a new Notification and use accessors to set the note name 
            var note = new Notification('TestNote');
            
            // test assertions
            assertSame( "Expecting note.getName() == 'TestNote'", 'TestNote', note.getName());
        }
    
    ,   testBodyAccessors: function ()
        {
            // Create a new Notification and use accessors to set the body
            var note = new Notification(null);
            note.setBody(5);
            
            // test assertions
            assertSame( "Expecting note.getBody()as Number == 5", 5, note.getBody());
        }
        
    ,   testConstructor: function ()
        {
            // Create a new Notification using the Constructor to set the note name and body
            var note = new Notification('TestNote',5,'TestNoteType');
            
            // test assertions
            assertSame( "Expecting note.getName() == 'TestNote'", 'TestNote', note.getName());
            assertSame( "Expecting note.getBody()as Number == 5", 5, note.getBody());
            assertSame( "Expecting note.getType() == 'TestNoteType'", 'TestNoteType', note.getType() );
        }
        
    ,   testToString: function ()
        {
            // Create a new Notification and use accessors to set the note name 
            var note = new Notification('TestNote',[1,3,5],'TestType');
            var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
            
            // test assertions
            assertSame( "Expecting note.testToString() == '"+ts+"'", ts, note.toString());
        }
    }
);