TestCase
(
    'org.puremvc.js.multicore.patterns.command.MacroCommandTest'
    
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

        
    ,   testSubCommandInstances: function ()
        {
            var ctor= MacroCommandTestSub1Command
            ,   obj= new ctor
            
            assertInstanceOf("Expected obj to be an instance of MacroCommandTestSub1Command", MacroCommandTestSub1Command, obj);
            assertInstanceOf("Expected obj to be an instance of SimpleCommand", SimpleCommand, obj);
            
        }

        /**
         * Tests operation of a <code>MacroCommand</code>.
         * 
         * <P>
         * This test creates a new <code>Notification</code>, adding a 
         * <code>MacroCommandTestVO</code> as the body. 
         * It then creates a <code>MacroCommandTestCommand</code> and invokes
         * its <code>execute</code> method, passing in the 
         * <code>Notification</code>.<P>
         * 
         * <P>
         * The <code>MacroCommandTestCommand</code> has defined an
         * <code>initializeMacroCommand</code> method, which is 
         * called automatically by its constructor. In this method
         * the <code>MacroCommandTestCommand</code> adds 2 SubCommands
         * to itself, <code>MacroCommandTestSub1Command</code> and
         * <code>MacroCommandTestSub2Command</code>.
         * 
         * <P>
         * The <code>MacroCommandTestVO</code> has 2 result properties,
         * one is set by <code>MacroCommandTestSub1Command</code> by
         * multiplying the input property by 2, and the other is set
         * by <code>MacroCommandTestSub2Command</code> by multiplying
         * the input property by itself. 
         * 
         * <P>
         * Success is determined by evaluating the 2 result properties
         * on the <code>MacroCommandTestVO</code> that was passed to 
         * the <code>MacroCommandTestCommand</code> on the Notification 
         * body.</P>
         * 
         */
    ,   testMacroCommandExecute: function ()
        {
            // Create the VO
            var vo = new MacroCommandTestVO(5);
            
            // Create the Notification (note)
            var note = new Notification('MacroCommandTest', vo);

            // Create the SimpleCommand             
            var command = new MacroCommandTestCommand();
            
            // Execute the SimpleCommand
            command.execute(note);
            
            // test assertions
            assertSame( "Expecting vo.result1 == 10", 10, vo.result1 );
            assertSame( "Expecting vo.result2 == 25", 25, vo.result2 );
        }
    }
);