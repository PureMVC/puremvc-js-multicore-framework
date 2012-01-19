TestCase
(
    'org.puremvc.js.multicore.patterns.observer.NotifierTest'
    
,   {
    
        facadeId: 'org.puremvc.js.multicore.patterns.observer.NotifierTest'
        
    ,   tearDown: function ()
        {
            Facade.removeCore(this.facadeId);
        }
        
        /**
         * Tests assignment of Notifier#facade property after initializeNotifier
         * is called. 
         */
    ,   testFacadePropertyIsSetAfterInititializeNotifier: function ()
        {
            var facade= Facade.getInstance(this.facadeId)
            ,   notifier= new Notifier
            
            
            assertTrue('The facade property is not set until #initializeNotifier is called', null == notifier.facade);
            
            notifier.initializeNotifier(this.facadeId);
            
            assertSame('The facade property was initialized correctly', facade, notifier.facade);
        }
    }
)
