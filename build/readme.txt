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
    
  * JsTestDriver (Optional, Eclipse plugin or command line)
    > http://code.google.com/p/js-test-driver/
    
STEP 1: BUILDING LIBRARY

  * From the Command Line...
    > cd PureMVC_JS/build
    > ant -f build.xml buildLib
	
  * Within Eclipse...
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

    * Within Eclipse...
      > Window -> Other Views... -> Ant
      > Drag build.xml to Ant View
      > Right-click on 'buildDocWindows' target
      > Run As... -> Ant Build...
      
  * Building the Documentation on Mac / Unix
  
    * From the Command Line with Ant...
       $ cd PureMVC_JS/build
       $ ant -f build.xml buildDocUnix

    * From the Command Line with shell...
       $ cd PureMVC_JS/build
       $ ./makeDoc.sh

    * Within Eclipse...
      > Window -> Other Views... -> Ant
      > Drag build.xml to Ant View
      > Right-click on 'buildDocUnix' target
      > Run As... -> Ant Build...
      



Documentation is generated with JsDuck (https://github.com/senchalabs/jsduck).
Once installed, run makeDoc.sh to build the documentation.

JsTestDriver is used to run unit tests. This project used the JsTestDriver
plugin for Eclipse, but you may be able to run the tool from the command line
if this suits you better. For more information, please visit 
http://code.google.com/p/js-test-driver/




	
