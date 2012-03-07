TestCase
(
	'org.puremvc.js.multicore.help.defineTest'
	
,	{

        /** @private */
        console: jstestdriver.console
        
        /** @private */
    ,   global: new Function('return this')()
    
    ,   namespace: 'testns'
        
    ,   tearDown: function ()
        {
            if (this.global.testns)
            {
                delete this.global.testns
            } 
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
);