BUILDING PUREMVC / JS NATIVE MULTICORE

  * There is ordinarily no need for the developer to 
    build the PureMVC libraries, documentation, or to
    run the unit tests. This is because there is also
    typically no reason to modify the framework itself. 
    
  * If you wish to modify the framework for whatever 
    reason, you should document your changes in terms
    of their difference from the official distribution,
    then create or modify the unit tests accordingly,
    and regenerate the documentation. 

TOOLING PREREQUISITES:

  * Install Apache Ant 
    > http://ant.apache.org/
    > NOTE: Your IDE may already have it, check first.
    > If executing from command line, set ANT_HOME.   
    
  * Google Closure Compiler
    > http://code.google.com/p/closure-compiler/
    > NOTE: Closure requires Java 1.6 JRE
    > Closure is included for your convenience
    
  * JsDuck 
    * If you have Windows and ruby is not installed
      > https://github.com/senchalabs/jsduck/downloads
      > jduck executable is included for your convenience
    	
    * Any system with ruby installed:
      > https://github.com/senchalabs/jsduck
      $ [sudo] gem install jsduck
    
  * JsTestDriver 
    > http://code.google.com/p/js-test-driver/
    > jsTestDriver is included for your convenience
    
STEP 1: BUILDING LIBRARY

  * From the Command Line...
    > cd PureMVC_JS/build
    > ant -f build.xml buildLib
	
  * From within Eclipse...
    > Right-click on build.xml
    > Run As... -> Ant Build...
	  
  * Output:
    > Buildfile: Z:\Outgoing\workspaces\FB3\PureMVC\PureMVC_JS\build\build.xml
    > package:
    > 	[jscomp] Compiling 1 file(s) with 40 extern(s)
    > 	[jscomp] 0 error(s), 0 warning(s)
    > BUILD SUCCESSFUL
    > Total time: 3 seconds

STEP 2: BUILDING DOCS

  * Building the Documentation on Windows
  
    * From the Command Line with Ant...
      > cd PureMVC_JS/build
      > ant -f build.xml buildDocWindows

    * From within Eclipse...
      > Window -> Other Views... -> Ant
      > Drag build.xml to Ant View
      > Right-click on 'buildDocWindows' target
      > Run As... -> Ant Build...
      
  * Building the Documentation on Mac / Unix
  
    * From the Command Line with Ant...
      $ cd PureMVC_JS/build
      $ ant -f build.xml buildDocUnix

    * From the Command Line with shell script...
      $ cd PureMVC_JS/build
      $ ./makeDoc.sh

    * From within Eclipse...
      > Window -> Other Views... -> Ant
      > Drag build.xml to Ant View
      > Right-click on 'buildDocUnix' target
      > Run As... -> Ant Build...
      
STEP 3: RUNNING THE UNIT TESTS (SIMPLE)
    * Change browser paths 
      > Open PureMVC_JS/build/config/build.properties
      > Find the JS TEST DRIVER SETTINGS section
      > Un-comment one of the 'js.test.browsers' property declarations
      > depending on your OS. Modify the paths to the browsers if 
      > necessary.
      
    * From the Command Line with Ant...
      $ cd PureMVC_JS/build
      $ ant -f build.xml runUnitTests

    * From within Eclipse...
      > Window -> Other Views... -> Ant
      > Drag build.xml to Ant View
      > Right-click on 'runUnitTests' target
      > Run As... -> Ant Build...
      
	
	  RUNNING UNIT TESTS AGAINST OS / BROWSER COMBINATIONS (ADVANCED)
	  You may also want to run tests across a mix of OS / Browser combinations.
	  In order to this you will need to first start the test server in standalone
	  mode and be able to access it over your physical or virtualized network. 
	  
	  These instructions are for running the test server on OSX, but you can 
	  find more information on how to do this with other operating systems in 
	  the links below, but the process is essentially the same.
	  
	  To begin, you must first pick a port and start the test server via 
	  terminal, with build/lib as your cwd. In this case & is added at the
	  end of the startup command to run the server as a background process.
	  
	  $ cd PureMVC_JS/build/lib
	  $ java -jar JsTestDriver-1.3.3.d.jar --port <PORTNUMBER> &
	
      For testing on your local machine, open each browser you want the tests
      to run in and visit http://localhost:<PORTNUMBER> to capture each browser.
	  If your machine is accessible over the network, visit its network address
	  using the same port number from another machine and repeat the capture
	  process.
      
	  Once you have captured all browsers you want to test against, use the
	  following commands from the host machines terminal to run the tests.
	  
      $ java -jar JsTestDriver-1.3.3.d.jar --config ../config/testdriver.conf
      
      $ java -jar JsTestDriver-1.3.3.d.jar --config ../config/testdriver-compiled.conf

      More information can be found at the jstestdriver wiki:
      http://code.google.com/p/js-test-driver/w/list

