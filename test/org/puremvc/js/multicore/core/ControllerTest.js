use: "org.puremvc.js.multicore.core.Controller";
use: "org.puremvc.js.mulitcore.core.ControllerTestCommand";
use: "org.puremvc.js.mulitcore.core.ControllerTestVO";

TestCase
(
    'org.puremvc.js.multicore.core.ControllerTest'
    
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
         * Tests the Controller Multiton Factory Method 
         */
    ,   testGetInstance: function ()
        {
            var controller= Controller.getInstance("ControllerTestKey1");
            
            assertTrue("Expecting instance not null", controller != null);
            assertTrue("Expecting instance implements IController", controller instanceof Controller);
        }
        
        /**
         * Tests Command registration and execution.
         * 
         * <P>
         * This test gets a Multiton Controller instance 
         * and registers the ControllerTestCommand class 
         * to handle 'ControllerTest' Notifications.<P>
         * 
         * <P>
         * It then constructs such a Notification and tells the 
         * Controller to execute the associated Command.
         * Success is determined by evaluating a property
         * on an object passed to the Command, which will
         * be modified when the Command executes.</P>
         */     
    ,   testRegisterAndExecuteCommand: function ()
        {
            var controller= Controller.getInstance("ControllerTestKey2");
            controller.registerCommand("ControllerTest", ControllerTestCommand);
            
            var vo= new ControllerTestVO(12);
            var note= new Notification("ControllerTest", vo);
            
            controller.executeCommand(note);
            
            assertTrue("Expected vo.result == 24", vo.result == 24);
        }


        /**
         * Tests Command registration and removal.
         * 
         * <P>
         * Tests that once a Command is registered and verified
         * working, it can be removed from the Controller.</P>
         */        
    ,   testRegisterAndRemoveCommand: function ()
        {
            var controller= Controller.getInstance("ControllerTestKey3");
            controller.registerCommand("ControllerRemoveTest", ControllerTestCommand);
            
            var vo= new ControllerTestVO(12);
            var note= new Notification("ControllerRemoveTest", vo);
            
            controller.executeCommand(note);
            
            assertTrue("Expected vo.result == 24", vo.result == 24);
            
            vo.result= 0;
            
            controller.removeCommand("ControllerRemoveTest");
            
            controller.executeCommand(note);
            
            assertTrue("Expecting vo.result == 0", vo.result == 0);
        }
        
        /**
         * Tests has command method
         */
    ,   testHasCommand: function ()
        {
            var controller= Controller.getInstance("ControllerTestKey4");
            controller.registerCommand("hasCommandTest", ControllerTestCommand);
            
            assertTrue("Expecting controller.hasCommand('hasCommandTest') == true", controller.hasCommand("hasCommandTest") == true);
            
            
            controller.removeCommand("hasCommandTest");
            
            assertTrue("Expecting controller.hasCommand('hasCommandTest') == false", controller.hasCommand("hasCommandTest") == false);
        }
        
        /**
         * Tests Removing and Reregistering a Command
         * 
         * <P>
         * Tests that when a Command is re-registered that it isn't fired twice.
         * This involves, minimally, registration with the controller but
         * notification via the View, rather than direct execution of
         * the Controller's executeCommand method as is done above in 
         * testRegisterAndRemove. The bug under test was fixed in AS3 Standard 
         * Version 2.0.2. If you run the unit tests with 2.0.1 this
         * test will fail.</P>
         */      
    ,   testReregisterAndExecuteCommand: function ()
        {
            var controller= Controller.getInstance("ControllerTestKey5");
            controller.registerCommand("ControllerTest2", ControllerTestCommand2);
            
            controller.removeCommand("ControllerTest2");
            
            controller.registerCommand("ControllerTest2", ControllerTestCommand2);
            
            var vo= new ControllerTestVO(12);
            var note= new Notification("ControllerTest2", vo);
            var view= View.getInstance("ControllerTestKey5");
            
            assertSame("Expecting vo.result == 0", 0, vo.result);
            assertSame("Expecting vo.input == 12", 12, vo.input);
            
            view.notifyObservers(note);
            
            assertSame("Expecting vo.result == 24", 24, vo.result);
            
            view.notifyObservers(note);
            
            assertSame("Expecting vo.result == 48", 48, vo.result);
        }
        
        /**
         * Ensures that #getInstance returns null if supplied a multitonKey
         * that is either null or undefined
         */
    ,	testNullMultitonKeyReturnsNull: function ()
    	{
    		assertNull('Multiton key was undefined, so #getInstance returned null', Controller.getInstance());
    		assertNull('Multiton key was null, so Controller#getInstance returned null', Controller.getInstance(null));
    	}        
    }
);