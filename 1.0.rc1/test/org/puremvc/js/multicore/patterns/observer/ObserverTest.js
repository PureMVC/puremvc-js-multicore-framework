TestCase
(
    'org.puremvc.js.multicore.patterns.observer.ObserverTest'
    
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
        
        /**
         * 
         * @type {number}
         * @private
         */
    ,   observerTestVar: 0
    
        /**
         * 
         * @param {Object} note
         * @return {void}
         * @private
         */
    ,   observerTestMethod: function (note)
        {
            this.observerTestVar= note.getBody();
        }
        
        /**
         * Tests observer class when initialized by accessor methods.
         */       
    ,   testObserverAccessors: function ()
        {
                    // Create observer with null args, then
            // use accessors to set notification method and context
            var observer = new Observer(null,null);
            observer.setNotifyContext(this);
            observer.setNotifyMethod(this.observerTestMethod);
            
            // create a test event, setting a payload value and notify 
            // the observer with it. since the observer is this class 
            // and the notification method is observerTestMethod,
            // successful notification will result in our local 
            // observerTestVar being set to the value we pass in 
            // on the note body.
            var note = new Notification('ObserverTestNote',10);
            observer.notifyObserver(note);

            // test assertions              
            assertSame( "Expecting observerTestVar = 10", 10, this.observerTestVar);
        }
        
        /**
         * Tests observer class when initialized by constructor.
         * 
         */        
    ,   testObserverConstructor: function ()
        {
            // Create observer passing in notification method and context
            var observer = new Observer(this.observerTestMethod,this);
            
            // create a test note, setting a body value and notify 
            // the observer with it. since the observer is this class 
            // and the notification method is observerTestMethod,
            // successful notification will result in our local 
            // observerTestVar being set to the value we pass in 
            // on the note body.
            var note = new Notification('ObserverTestNote',5);
            observer.notifyObserver(note);

            // test assertions              
            assertSame( "Expecting observerTestVar = 5", 5, this.observerTestVar);
        }
        
        /**
         * Tests the compareNotifyContext method of the Observer class
         * 
         */        
    ,   testCompareNotifyContext: function ()
        {
            // Create observer passing in notification method and context
            var observer = new Observer( this.observerTestMethod, this );
            
            var negTestObj = new Object();
            
            // test assertions              
            assertFalse( "Expecting observer.compareNotifyContext(negTestObj) == false", 
                observer.compareNotifyContext(negTestObj));
            assertTrue( "Expecting observer.compareNotifyContext(this) == true", observer.compareNotifyContext(this));
        }
    }
);