/**
 * Note that this test only runs with uncompiled source, as the compiled library
 * hides the help object from client code
 */
TestCase
(
    'org.puremvc.js.multicore.help.OopTest'
    
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
        
        /** @private */
    ,   tearDown: function ()
        {
            if (this.global.testns)
            {
                delete this.global.testns
            } 
        }
        
        /**
         * Ensures the helper is in scope during source unit tests and all
         * methods are available.
         */
    ,   testHelpIsDefinedInSourceScope: function ()
        {
            assertInstanceOf('helper is available in source scope', Object, OopHelp);
            assertInstanceOf('#decorate is defined', Function, OopHelp.decorate);  
            assertInstanceOf('#declare is defined', Function, declare);   
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

            returned= declare(testNs);
            
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
            
            returned= declare(testNs, null, scope)
            
            assertSame('If scope is provided, it becomes the namespace scope', scope.puremvctest.ns, returned);
            assertFalse('object is not the referennt of the namespace', object === returned);
            
            returned= declare(testNs, object, scope);
            
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
            returned= declare('namespace', null, scope);
            assertInstanceOf('The namespace was declared', Object, scope.namespace);
            
            ref= scope.namespace;
            returned= declare('namespace', null, scope);
            assertSame('The namespace was not overridden as it already exists and no new value was supplied as second argument', returned, ref);

            declare('namespace.object', object, scope);
            
            assertSame('object is the referent of the namesapce', object, scope.namespace.object);
            
            declare('namespace.object', newObject, scope);
            
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
            
            assertSame('The namespace was not overridden', declare('one.two', null, scope), scope.one.two);
            
            assertSame('Suppliying the object as second object, it becomes one.two', declare('one.two', object, scope), scope.one.two);
            
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
        
        /**
         * In all cases, the return value of #define is the constructor
         * of the class defined, even if the constructor is automatically created.
         * This means that if defining a class without a class name, its possible
         * to retrieve a reference to the classes constructor.
         */
    ,   testImplementClassReturnsConstructor: function ()
        {
            var global= (function (){return this})()
            ,   returned
            
            
            assertInstanceOf('Default constructor is returned', Function, define())
            
            assertUndefined('There is no xyz namespace in global scope', global.xyz);
            
            returned= define
            (
                {
                    name: 'xyz.Abc'
                }
            )
            
            assertInstanceOf('The xyz namespace was created', Object, xyz);
            assertInstanceOf('xyz.Abc refers to an automatically created constructor Function', Function, xyz.Abc);
            assertSame('The returned object is the xzy.Abc constructor', xyz.Abc, returned);
            
            global.xyz = null;
            
            
            var classConstructor= new Function
            ,   className= 'Constructor'
            
            returned= define
            (
                {
                    name: className
                    
                ,   constructor: classConstructor
                }
            )
            
            assertSame('The class constructor was returned', classConstructor, returned);
            assertSame('The class constructor was exported', classConstructor, global[className]);
            
            global[className] = null;
            
            assertInstanceOf('the method always returned a Function', Function, define());
        }        
        
        /**
         * Class names can have simple names.
         */
    ,   testClassInfoNameCanBeSimple: function ()
        {
            var global= this.global
            ,   classInfo= {name: 'UserObject'}
            ,   returned
            
            
            assertUndefined('There is no class in global scope called UserObject', global.UserObject);
            
            returned= define(classInfo);
            
            assertInstanceOf('The UserObject constructor was exported to global scope', Function, global.UserObject);
            assertSame('The method returned a reference to UserObject', global.UserObject, returned);
            global.UserObject = null;
        }
        
        /**
         * Classes can be defined without class names. Classes defined this
         * way are not exported to any scope and are retrieved by referencing
         * the return value of the factory method.
         */
    ,   testClassInfoWithoutNameDoesNotExportClass: function ()
        {
            // not implemented
            
            
            
            
        }
        
        /**
         * The parent property of the class info Object, if supplied, will
         * become the classes super class.
         */
    ,   testClassInfoParentWillExtend: function ()
        {
             function Parent () {};
             
             function Child () {};
             
             assertFalse('new Child is not an instance of Parent', new Child instanceof Parent);
             
             define
             (
                {
                    parent: Parent
                ,   constructor: Child
                }
             )
             
             assertTrue('new Child is now an instance of Parent', new Child instanceof Parent);   
        }
        
        /**
         * Ensures that if classInfo defines a parent, but not a constructor,
         * that the automatically created constructor will invoke the
         * superconstructor, delegating all arguments to it.
         */
    ,   testDefaultConstructorWithClassInfoParentInvokesParent: function ()
        {
            function ValueObject (value)
            {
                this.setValue(value);
            }
            
            ValueObject.prototype.setValue= function (value)
            {
                this.value= value;
            };
            
            var Classlet= define
                (
                    {
                        parent: ValueObject
                    }
                    
                ,   {
                        /** @override */
                        setValue: function (value)
                        {
                            // invoke the super method
                            ValueObject.prototype.setValue.call(this, value);
                            this.invoked= true;
                        }
                    }
                )
                
            ,   value= {}
            ,   instance= new Classlet(value)
            
            assertInstanceOf('The setValue method was inherited by Classlet', Function, Classlet.prototype.setValue);
            assertTrue('The invoked property was set', instance.invoked);
            assertSame('The super constructor was invoked as setValue was called on Classlet when Classlet instantiated', value, instance.value);
        }
        
        /**
         * You can can specify your own constructors. When doing so, this
         * it is this constructor prototype that traits are applied to,
         * and static traits are added to directly.
         */
    ,   testClassInfoWithUserConstructor: function ()
        {
            var constructor= new Function
            ,   classInfo=
                {
                    constructor: constructor
                }
            ,   returned= define(classInfo)
            
            assertSame('The user constructor property was used correctly', constructor, returned);
            
            // a named Function- defining user class constructors as named
            // constructors is encouraged, as many browsers will be able to
            // correctly report the name of your class in stack traces
            function NamedConstructor () {};

            // override
            classInfo.constructor= NamedConstructor;
            returned= define(classInfo);
            
            assertSame('The named constructor was returned', NamedConstructor, returned);
        }
        
        /**
         * If customer constructors are not defined in the class info object,
         * one will be created for you automatically.
         */
    ,   testImplementClassWithDefaultConstructor: function ()
        {
            
            var global= this.global
            ,   name= 'qwerty'
            ,   expected= 'zxcvbnm'
            ,   returned
            ,   A
            ,   B
            ,   a
            ,   b

            returned= define({name: name});
            
            assertSame('A default constructor ws created and returned', global[name], returned);

            global[name] = null;

            define
            (
                {
                    name: 'test.A' 
                    
                ,   constructor: function (id)
                    {
                        this.id= id
                    }   
                }
            )
            
            define
            (
                {
                    name: 'test.B'
                ,   parent: test.A
                }
            )   
            
            b= new test.B(expected)
            
            assertSame('The parent constructor was invoked', expected, b.id);
            
            test.A = null;
            test.B = null;
            global.test = null;
        }

        /**
         * An optional scope attribute can be added to ClassInfo. This serves
         * advanced cases whereby users may want to define classes in private
         * scopes or in other window scopes. This parameter will generally
         * not be used in the majority of cases.
         */
    ,   testClassInfoScope: function ()
        {
            var localScope= {}
            ,   name= 'TestClass'
            ,   info= {name:name, scope: localScope}
            ,   global= this.global
            ,   returned
            
            
            assertFalse('TestClass does not exist in scope', name in localScope);
            returned= define(info);
            assertTrue('TestClass has been exported to the scope', name in localScope);
            assertUndefined('TestClass has not been exported to global scope', global.TestClass);
            assertInstanceOf('TestClass is a constructor', Function, localScope[name]);
            assertSame('TestClass constructor was returned correctly', localScope[name], returned);
        }
        
        /**
         * The properties of the class descriptor are not copied to any classes
         * produced, leaving the JavaScript object model intact.
         */
    ,   testClassInfoPropertiesAreNotCopiedToClassletsExceptForConstructor: function ()
        {
            var scope= {}
            ,   Parent= new Function
            ,   Child= new Function
            ,   Classlet= define
                (
                    {
                        name: 'test.Classlet'
                    ,   scope: scope
                    ,   parent: Parent
                    ,   constructor: Child
                    }
                )
            ,   prototype= Child.prototype
                
            assertSame('The class was created', Child, Classlet);
            assertSame('The class was exported to scope', Child, scope.test.Classlet);
            assertFalse('The classinfo name property was not copied to Child.prototype', 'name' in prototype);
            assertFalse('The classinfo scope property was not copied to Child.prototype', 'scope' in prototype);
            assertFalse('The classinfo parent property was not copied to Child.prototype', 'parent' in prototype);
            assertSame('The Child.prototype.constructor reference was maintained', Child, prototype.constructor);
        }
        
        /**
         * Although essentially useless, the method can be invoked without
         * supplying any arguments. The behaviour of the method is to
         * simply return a new Function (an automatically created constructor)
         */
    ,   testAllArgumentsAreOptional: function ()
        {
            assertInstanceOf('The method used without any arguments is equivalent to new Function', Function ,define());
        }

        /**
         * Ensure that the properties of the second object supplied as an 
         * argument to #define are correctly added to the constructors
         * prototype
         */
     ,  testPrototypePropertiesAreDefined: function ()
        {
            var method= new Function
            ,   instance
            
            define
            (
                {
                    name: 'test.A'
                }
                
            ,   {
                    method: method
                }
            )
            
            assertTrue('The global test namespace is defined', test != null);
            assertTrue('The global test.A namespace is defined', test.A != null);
            assertSame('The Function "method" was defined on test.A.prototype', method, test.A.prototype.method);
            
            instance= new test.A
            
            assertSame('The Function "method" was defined on test.A instance', method, instance.method);
            
            delete test.A
        }
        
        /**
         * Ensure that static properties are copied to the constructor
         * correctly
         */
    ,   testConstructorPropertiesAreDefined: function ()
        {
            var localScope= {}
            ,   method= new Function
            ,   property= {}
            
            define
            (
                {
                    scope: localScope
                ,   name: 'TestClass'
                }
                
            ,   null // no need to define prototype properties here
            
            ,   {
                    staticMethod: method
                ,   staticProperty: property
                }
            )
            
            assertSame('The static method was defined', method, localScope.TestClass.staticMethod);
            assertSame('The static property was defined', property, localScope.TestClass.staticProperty);
        }
    }
)
