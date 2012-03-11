TestCase
(
    "org.puremvc.js.multicore.core.ModelTest"
    
,   {
        
        /**
         * Test the Model multiton method
         * @return {void}
         */
        testGetInstance: function ()
        {
            var model= Model.getInstance("ModelTestKey1")
            ,   assertionError= null
            
            assertNotNull("Expected instance not null", model);
        }
        
        /**
         * Tests the proxy registration and removal methods.
         * 
         * <P>
         * Tests <code>registerProxy</code> and <code>retrieveProxy</code> in the same test.
         * These methods cannot currently be tested separately
         * in any meaningful way other than to show that the
         * methods do not throw exception when called. </P>
         */
    ,   testRegisterAndRetrieveProxy: function ()
        {
            var model= Model.getInstance("ModelTestKey2");
            model.registerProxy(new Proxy("colors", ["red", "green", "blue"]))
            
            var proxy= model.retrieveProxy("colors")
            ,   data;
            
            // assertNotNull("Expecting the model to be retrieved", proxy);
            assertFalse("Expecting the model to be retrieved", null == proxy);
            
            data= proxy.getData();
            
            assertNotNull ("Expecting data not null", data);
            assertInstanceOf("Expected data to be an Array", Array, data);
            assertSame("Expected data length to be 3", 3, data.length);
            assertSame("Expecting data[0] === 'red'", 'red', data[0]);
            assertSame("Expecting data[1] === 'green'", 'green', data[1]);
            assertSame("Expecting data[2] === 'blue'", 'blue', data[2]);
        }
        
        /**
         * Test the Proxy removal method
         */
    ,   testRegisterAndRemoveProxy: function ()
        {
            // register a proxy, remove it, then try to retrieve it
            var model = Model.getInstance('ModelTestKey3');
            var proxy = new Proxy( 'sizes', ['7', '13', '21']);
            model.registerProxy( proxy );

            // remove the proxy
            var removedProxy = model.removeProxy('sizes');
            
            // assert that we removed the appropriate proxy
            assertTrue( "Expecting removedProxy.getProxyName() == 'sizes'", 
                        removedProxy.getProxyName() == 'sizes' );
            
            // ensure that the proxy is no longer retrievable from the model
            proxy = model.retrieveProxy( 'sizes' );
            
            // test assertions
            assertNull( "Expecting proxy is null", proxy ); 
        }
        
        /**
         * Tests the hasProxy method
         */
    ,   testHasProxy: function ()
        {
            // register a proxy
            var model = Model.getInstance('ModelTestKey4');
            var proxy = new Proxy( 'aces', ['clubs', 'spades', 'hearts', 'diamonds']);
            model.registerProxy( proxy );
            
            // assert that the model.hasProxy method returns true
            // for that proxy name
            assertTrue( "Expecting model.hasProxy('aces') == true", 
                        model.hasProxy('aces') == true);
            
            // remove the proxy
            model.removeProxy('aces');
            
            // assert that the model.hasProxy method returns false
            // for that proxy name
            assertTrue( "Expecting model.hasProxy('aces') == false", 
                        model.hasProxy('aces') == false);           
        }
        
    ,   testOnRegisterAndOnRemove: function ()
        {
    		try
    		{
                // Get a Multiton View instance
                var model = Model.getInstance('ModelTestKey4');

                // Create and register the test mediator
                var proxy = new ModelTestProxy( );
                
                model.registerProxy( proxy);

                // assert that onRegsiter was called, and the proxy responded by setting its data accordingly
                assertTrue( "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED", 
                            proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED );
                
                // Remove the component
                model.removeProxy( ModelTestProxy.NAME );
                
                // assert that onRemove was called, and the proxy responded by setting its data accordingly
                assertTrue( "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED", 
                            proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED );
    		}
    		catch (thrown)
    		{
    			console.error(thrown);
    		}
        }
        
        
        /**
         * Ensures that #getInstance returns null if supplied a multitonKey
         * that is either null or undefined
         */
    ,	testNullMultitonKeyReturnsNull: function ()
    	{
    		assertNull('Multiton key was undefined, so #getInstance returned null', Model.getInstance());
    		assertNull('Multiton key was null, so #getInstance returned null', Model.getInstance(null));
    	}    
    }
);