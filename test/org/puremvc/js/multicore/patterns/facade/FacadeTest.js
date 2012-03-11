TestCase
(
    'org.puremvc.js.multicore.patterns.facade.FacadeTest'
    
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

    ,   testFacadeTestCommand: function ()
        {
            var vo= new FacadeTestVO(32)
            ,   testCommand= new FacadeTestCommand()
            ,   note= new Notification('TestNote', vo)
            
            testCommand.execute(note);
            
            assertTrue("The command executed", testCommand.executed);
            assertSame("The notification body result value was doubled", 
                64, note.getBody().result);
            
            assertInstanceOf("The notification body was a FacadeTestVO", 
                FacadeTestVO, note.getBody());
                
            assertSame("The vo result was doubled", 64, vo.result);
            
        }
        
    ,   testGetInstance: function ()
        {
            var facade= Facade.getInstance("FacadeTestKey1");
            
            assertNotNull("Expected instance not null", facade);
            assertInstanceOf("Expected instance instance of facade", Facade, facade);
        }
        
    ,   testRegisterCommandAndSendNotification: function ()
        {
            // Create the Facade, register the FacadeTestCommand to 
            // handle 'FacadeTest' notifications
            var facade= Facade.getInstance('FacadeTestKey2');
            facade.registerCommand('FacadeTestNote', FacadeTestCommand);
            

            // Send notification. The Command associated with the event
            // (FacadeTestCommand) will be invoked, and will multiply 
            // the vo.input value by 2 and set the result on vo.result
            var vo = new FacadeTestVO( 32 );
            facade.sendNotification( 'FacadeTestNote', vo );
            
            // test assertions 
            assertSame( "Expecting vo.result == 64", 64, vo.result);
        }
        
    ,   testRegisterAndRetrieveProxy: function ()
        {
            // register a proxy and retrieve it.
            var facade = Facade.getInstance('FacadeTestKey4');
            facade.registerProxy( new Proxy('colors', ['red', 'green', 'blue']) );
            var proxy = facade.retrieveProxy( 'colors' );
            

            // retrieve data from proxy
            var data = proxy.getData();
            
            // test assertions
            assertNotNull( "Expecting data not null", data );
            assertInstanceOf( "Expecting data is Array", Array, data );
            assertSame( "Expecting data.length == 3", 3, data.length  );
            assertSame( "Expecting data[0] == 'red'", 'red', data[0]  );
            assertSame( "Expecting data[1] == 'green'", 'green', data[1] );
            assertSame( "Expecting data[2] == 'blue'", 'blue', data[2] );
        }
        
    ,   testRegisterAndRemoveProxy: function ()
        {
            // register a proxy, remove it, then try to retrieve it
            var facade = Facade.getInstance('FacadeTestKey5');
            var proxy = new Proxy('sizes', ['7', '13', '21'] );
            facade.registerProxy( proxy );
            
            // remove the proxy
            var removedProxy = facade.removeProxy('sizes');

            // assert that we removed the appropriate proxy
            assertTrue( "Expecting removedProxy.getProxyName() == 'sizes'", 
                        removedProxy.getProxyName() == 'sizes' );
            
            // make sure we can no longer retrieve the proxy from the model
            proxy = facade.retrieveProxy( 'sizes' );
            
            // test assertions
            assertNull( "Expecting proxy is null", proxy );
        }
        
    ,   testRegisterRetrieveAndRemoveMediator: function ()
        {
            // register a mediator, remove it, then try to retrieve it
            var facade = Facade.getInstance('FacadeTestKey6');
            facade.registerMediator( new Mediator( Mediator.NAME, new Object() ) );
            
            // retrieve the mediator
            assertNotNull( "Expecting mediator is not null", facade.retrieveMediator( Mediator.NAME ) );

            // remove the mediator
            var removedMediator = facade.removeMediator(Mediator.NAME);

            // assert that we have removed the appropriate mediator
            assertTrue( "Expecting removedMediator.getMediatorName() == Mediator.NAME", 
                        removedMediator.getMediatorName() == Mediator.NAME);
                
            // assert that the mediator is no longer retrievable
            assertTrue( "Expecting facade.retrieveMediator( Mediator.NAME ) == null )", 
                        facade.retrieveMediator( Mediator.NAME ) == null );
        }
        
        
        
    ,   testHasProxy: function ()
        {
            // register a Proxy
            var facade = Facade.getInstance('FacadeTestKey7');
            facade.registerProxy( new Proxy( 'hasProxyTest', [1,2,3] ) );
            
            // assert that the model.hasProxy method returns true
            // for that proxy name
            assertTrue( "Expecting facade.hasProxy('hasProxyTest') == true", 
                        facade.hasProxy('hasProxyTest') == true);        
        }
        
    ,   testHasMediator: function ()
        {
            // register a Mediator
            var facade = Facade.getInstance('FacadeTestKey8');
            facade.registerMediator( new Mediator( 'facadeHasMediatorTest', new Object() ) );
            
            // assert that the facade.hasMediator method returns true
            // for that mediator name
            assertTrue( "Expecting facade.hasMediator('facadeHasMediatorTest') == true", 
                        facade.hasMediator('facadeHasMediatorTest') == true);
                        
            facade.removeMediator( 'facadeHasMediatorTest' );
            
            // assert that the facade.hasMediator method returns false
            // for that mediator name
            assertTrue( "Expecting facade.hasMediator('facadeHasMediatorTest') == false", 
                        facade.hasMediator('facadeHasMediatorTest') == false);
        }
        
    ,   testHasCommand: function ()
        {
            // register the ControllerTestCommand to handle 'hasCommandTest' notes
            var facade = Facade.getInstance('FacadeTestKey10');
            facade.registerCommand('facadeHasCommandTest', FacadeTestCommand);
            
            // test that hasCommand returns true for hasCommandTest notifications 
            assertTrue( "Expecting facade.hasCommand('facadeHasCommandTest') == true", 
                facade.hasCommand('facadeHasCommandTest') == true );
            
            // Remove the Command from the Controller
            facade.removeCommand('facadeHasCommandTest');
            
            // test that hasCommand returns false for hasCommandTest notifications 
            assertTrue( "Expecting facade.hasCommand('facadeHasCommandTest') == false",
                facade.hasCommand('facadeHasCommandTest') == false );
            
        }
        
    ,   testHasCoreAndRemoveCore: function ()
        {
            // assert that the Facade.hasCore method returns false first
            assertTrue( "Expecting facade.hasCore('FacadeTestKey11') == false", 
                        Facade.hasCore('FacadeTestKey11') == false);
            
            // register a Core
            var facade = Facade.getInstance('FacadeTestKey11');
                        
            // assert that the Facade.hasCore method returns true now that a Core is registered
            assertTrue( "Expecting facade.hasCore('FacadeTestKey11') == true", 
                        Facade.hasCore('FacadeTestKey11') == true);
            
            // remove the Core
            Facade.removeCore('FacadeTestKey11');
            
            // assert that the Facade.hasCore method returns false now that the core has been removed.
            assertTrue( "Expecting facade.hasCore('FacadeTestKey11') == false", 
                        Facade.hasCore('FacadeTestKey11') == false);
        }
        
        
        /**
         * Ensures that #getInstance returns null if supplied a multitonKey
         * that is either null or undefined
         */
    ,	testNullMultitonKeyReturnsNull: function ()
    	{
    		assertNull('Multiton key was undefined, so #getInstance returned null', Facade.getInstance());
    		assertNull('Multiton key was null, so #getInstance returned null', Facade.getInstance(null));
    	}    
    }
);