TestCase
(
    'org.puremvc.js.patterns.mediator.MediatorTest'
    
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
            var mediator= new Mediator();
            assertSame("Expected Mediator.NAME for mediator.getMediatorName()", 
                Mediator.NAME, mediator.getMediatorName());
                
                
            M.NAME= "M";
            M.prototype= new MediatorAdapter();
            M.prototype.constructor= M;
            M.constructor= M;
            function M ()
            {
                Mediator.apply(this, arguments);    
            };
            
            var m= new M;
            
            assertSame("Expected M.NAME for new M().getMediatorName()", 
                M.NAME, m.getMediatorName());
        }
        
        /**
         * 
         */
    ,   testViewAccessor: function ()
        {
            var view= {}
            ,   mediator= new Mediator(Mediator.NAME, view);
            
            assertSame("Retrieved view correctly", view, mediator.getViewComponent());
        }
    }
);