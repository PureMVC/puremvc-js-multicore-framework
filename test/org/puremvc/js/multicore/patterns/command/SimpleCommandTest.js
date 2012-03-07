TestCase
(
    'org.puremvc.js.multicore.patterns.command.SimpleCommandTest'
    
,   {

        /**
         * Tests the <code>execute</code> method of a <code>SimpleCommand</code>.
         * 
         * <P>
         * This test creates a new <code>Notification</code>, adding a 
         * <code>SimpleCommandTestVO</code> as the body. 
         * It then creates a <code>SimpleCommandTestCommand</code> and invokes
         * its <code>execute</code> method, passing in the note.</P>
         * 
         * <P>
         * Success is determined by evaluating a property on the 
         * object that was passed on the Notification body, which will
         * be modified by the SimpleCommand</P>.
         * 
         */
        testSimpleCommandExecute: function ()
        {
            var vo= new SimpleCommandTestVO(5)
            ,   note= new Notification('SimpleCommandTestNote', vo)
            ,   command= new SimpleCommandTestCommand();
            
            command.execute(note);
            
            assertSame("Expected vo.result === 10", 10, vo.result);
        }
    }
);