/**
 * Note that this test only runs with uncompiled source, as the compiled library
 * hides the help object from client code
 */
TestCase
(
    'org.puremvc.js.multicore.help.OopHelpTest'
    
,   {
        
        /**
         * @private
         * A reference to the global scope. We use this rather than window
         * as window is only an alias to the global scope in browsers, and
         * not part of the JavaScript specification
         * @type {Object}
         */
        global: (function (){return this})()
    
        /** @private */
    ,   console: jstestdriver.console
        
        /**
         * Ensures the helper is in scope during source unit tests and all
         * methods are available.
         */
    ,   testHelpIsDefinedInSourceScope: function ()
        {
            assertInstanceOf('helper is available in source scope', Object, OopHelp);
            assertInstanceOf('#decorate is defined', Function, OopHelp.decorate);  
            assertInstanceOf('#declare is defined', Function, OopHelp.declare);   
            assertInstanceOf('#extend is defined', Function, OopHelp.extend);      
        }
        
        /**
         * Tests the helpers decorate method, used to copy properties from
         * one object to another. Only properties defined on the supplied
         * traits Object itself are copied to the destination Object.
         */
    ,   testDecorateCopiesShadowedNativePropertiesButNotNativeProperties: function ()
        {
            var object= {}
            ,   traits= {}
            ,   isEmpty= function (object)
                {
                    for (var accessor in object)
                        return false;
                        
                    return true;
                }
            
            assertTrue('object is empty', isEmpty(object));
            assertTrue('traits is empty', isEmpty(traits))
            OopHelp.decorate(object, traits);
            assertTrue('object is empty, proving default obejct properties are not copied', isEmpty(object));
            
            var toString= new Function // define a dummy toString method
            traits.toString= toString
            
            assertSame('object has default toString', Object.prototype.toString, object.toString);
            
            OopHelp.decorate(object, traits);
            
            assertSame('object now has overridden toString method as only own properties are decorated', toString, object.toString);
        }

        /**
         * The declare method uses the global object as the default namespace
         * node by default, without overriding that object.
         */
    ,   testDeclareUsesGlobalScopeAsDefaultNamespaceRoot: function ()
        {
            var scope= {}
            ,   object= {}
            ,   testNs= 'puremvctest.ns'
            ,   returned= null
            ,   global= this.global
            
            assertUndefined('The test ns is not defined', global.puremvctest);

            returned= OopHelp.declare(testNs);
            
            assertInstanceOf('The namespace root was created in global scope by default', Object, global.puremvctest);
            assertInstanceOf('The namespace child node was created', Object, global.puremvctest.ns);
            assertSame('#declare returns the referent of the namespace (the last node)', global.puremvctest.ns, returned);
            
            global.puremvctest = undefined;
   
            assertUndefined('The test ns is not defined', global.puremvctest);
        }
        
        /**
         * Declare can create an object hierarchy upon an arbitrary Object which
         * it will use as the namespaces root node.
         */
    ,   testDeclareCanUseArbitraryObjectAsNamespaceRootNode: function ()
        {
            var scope= {}
            ,   object= {}
            ,   testNs= 'puremvctest.ns'
            ,   returned= null
            ,   global= this.global
            
            returned= OopHelp.declare(testNs, null, scope)
            
            assertSame('If scope is provided, it becomes the namespace scope', scope.puremvctest.ns, returned);
            assertFalse('object is not the referennt of the namespace', object === returned);
            
            returned= OopHelp.declare(testNs, object, scope);
            
            assertSame('The second argument, if not null, will become the referrent of the namespace', object, returned);
        }
        
        /**
         * Namespaces can be redeclared, only changing the namespace referrent
         * if supplied, not modifiying the namespace hierarchy otherwise.
         */
    ,   testDeclareCanRedeclare: function ()
        {
            var scope= {}
            ,   object= {}
            ,   newObject= {}
            ,   returned
            ,   ref
            
            assertUndefined('namespace is not defined on namespace root', scope.namespace);
            returned= OopHelp.declare('namespace', null, scope);
            assertInstanceOf('The namespace was declared', Object, scope.namespace);
            
            ref= scope.namespace;
            returned= OopHelp.declare('namespace', null, scope);
            assertSame('The namespace was not overridden as it already exists and no new value was supplied as second argument', returned, ref);

            OopHelp.declare('namespace.object', object, scope);
            
            assertSame('object is the referent of the namesapce', object, scope.namespace.object);
            
            OopHelp.declare('namespace.object', newObject, scope);
            
            assertNotSame('The redeclared namespace with new object is not the original referent', object, scope.namespace.object);
            assertSame('The redeclared namespace with new object replaced the first referrent', newObject, scope.namespace.object);
        }
        
        /**
         * Declare does not override existing objects in an arbitrary
         * object hierarchy.
         */
    ,   testDeclareDoesNotOverrideExistingNamespaceNodes: function ()
        {
            var scope=
                {
                    one:
                    {
                        two:
                        {
                            
                        }
                    }
                }
                
            ,   object= {}
            ,   ref= scope.one
            
            assertSame('The namespace was not overridden', OopHelp.declare('one.two', null, scope), scope.one.two);
            
            assertSame('Suppliying the object as second object, it becomes one.two', OopHelp.declare('one.two', object, scope), scope.one.two);
            
            assertSame('The first node was not overridden', ref, scope.one);
        }
        
        
        /**
         * Ensures that OopHelp.extend correctly extends on constructors prototoype
         * by another when provided two Functions.
         */
    ,   testExtendUsesUnubtrusivePrototypeChainingCorrectly: function ()
        {
            var A= new Function
            ,   B= new Function
            ,   b1= new B
            ,   b2= null
            ,   typeError= null
            
            // before inheritance
            assertFalse('B instance is not instanceof A', b1 instanceof A);
            
            OopHelp.extend(B, A);
            
            b2= new B
            
            assertTrue('B instances after extending are instances of A', b2 instanceof A);
            assertFalse('B instances created before extending are not subclasses of A', b1 instanceof A);
        }
        
        /**
         * Ensures that #extend throws TypeErrors if supplied invalid arguments
         */
    ,   testExtendThrowsTypeErrorForInavlidArguments: function ()
        {
            var A= new Function
            ,   B= new Function
            ,   b1= new B
            ,   b2= null
            ,   typeError= null
            
            A= ''; // String instance is not a Function
            
            try
            {
                OopHelp.extend(B, A);
            }
            catch (thrown)
            {
                // this.console.info(thrown)
                typeError= thrown
            }

            assertInstanceOf('If #extnds first argument is not Function, TypeError is thrown', TypeError, typeError);
            
            A= new Function // define A as a Function
            B= true // b is not a Fcuntion
            
            typeError= null
            
            try
            {
                OopHelp.extend(B, A);
            }
            catch (thrown)
            {
                // this.console.info(thrown)
                typeError= thrown;
            }
            
            assertInstanceOf('If #extends second argument is not Funciton , TypeError is thrown', TypeError, typeError)
        }
    }
)
