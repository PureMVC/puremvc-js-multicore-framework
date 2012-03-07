TestCase
(
    'org.puremvc.js.multicore.patterns.proxy.ProxyTest'
    
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
        
    ,   testNameAccessor: function ()
        {
            // Create a new Proxy and use accessors to set the proxy name 
            var proxy = new Proxy('TestProxy');
            
            // test assertions
            assertSame( "Expecting proxy.getProxyName() == 'TestProxy'", 'TestProxy', proxy.getProxyName());
        }
        
    ,   testDataAccessors: function ()
        {
            // Create a new Proxy and use accessors to set the data
            var proxy = new Proxy('colors');
            proxy.setData(['red', 'green', 'blue']);
            var data = proxy.getData();
            
            // test assertions
            assertSame( "Expecting data.length == 3", 3, data.length);
            assertSame( "Expecting data[0] == 'red'", 'red', data[0]);
            assertSame( "Expecting data[1] == 'green'", 'green', data[1]);
            assertSame( "Expecting data[2] == 'blue'", 'blue', data[2]);
        }
    }
);