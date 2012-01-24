TestCase
(
	'org.puremvc.js.multicore.help.ImplementClassTest'
	
,	{

        /** @private */
        console: jstestdriver.console
        
        /** @private */
    ,   global: new Function('return this')()
    
    ,   setUp: function ()
        {
            this.namespace= 'testns'
        }
        
    ,   tearDown: function ()
        {
            if (this.global.testns)
            {
                delete this.global.testns
            } 
        }
        
        /**
         * The first Object supplied to the method is a class descriptor
         * detailing the classes name, parent and constructor.
         * 
         */
    ,   testClassInfoNameCanBeSimple: function ()
        {
            var global= this.global
            ,   classInfo= {name: 'UserObject'}
            ,   returned
            
            
            assertUndefined('There is no class in global scope called UserObject', global.UserObject);
            
            returned= implementClass(classInfo);
            
            assertInstanceOf('The UserObject constructor was exported to global scope', Function, global.UserObject);
            assertSame('The method returned a reference to UserObject', global.UserObject, returned);
            delete global.UserObject
        }
        
    ,   testClassInfoWithoutNameDoesNotExportClass: function ()
        {
            var nativeConstructor= Array
            ,   nativeInstance= new nativeConstructor
            ,   toString= Object.prototype.toString
            ,   nativeName= toString.call(nativeInstance)
            ,   nonNativeName= null
            ,   isNativeArray= '[object Array]' === nativeName
            ,   fakeConstructor= new Function
            ,   global= this.global
            ,   returned
            
            
            assertTrue('Array is native and not overridden', isNativeArray); 
            
            // some environments will actually let you do this!
            global.Array= fakeConstructor;
            
            
            
            assertSame('Global array was shadowed', fakeConstructor, Array);
            
            nonNativeName= toString.call(new Array);
            
            //this.console.info(nonNativeName);
            
            if ('[object Object]' !== nonNativeName)
            {
                // the environment this test is running in is not letting you
                // shadow native constructors- no point in proceeding with this
                // test
                
                this.console.info('Exiting test- native constructors cannot be shadowed');
                return;
            }
            
            
            returned= implementClass
            (
                {
                    constructor: function Array ()
                    {
                        
                    }
                }
            );
            
            
            
            
            
            
            
            
            
            
            
            global.Array= nativeConstructor;
        }
        
    ,   testClassInfoParentWillExtend: function ()
        {
             function Parent ()
             {
                 
             };
             
             function Child ()
             {
                 
             };
             
             
             assertFalse('new Child is not an instance of Parent', new Child instanceof Parent);
             
             implementClass
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
            
            var Classlet= implementClass
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
        
    ,   testClassInfoConstructor: function ()
        {
            var constructor= new Function
            ,   classInfo=
                {
                    constructor: constructor
                }
            ,   returned= implementClass(classInfo)
            
            assertSame('The user constructor property was used correctly', constructor, returned);
            
            // a named Function- defining user class constructors as named
            // constructors is encouraged, as many browsers will be able to
            // correctly report the name of your class in stack traces
            function NamedConstructor () {};
            
            
            // override
            classInfo.constructor= NamedConstructor;
            returned= implementClass(classInfo);
            
            assertSame('The named constructor was returned', NamedConstructor, returned);
        }
        
        
        /**
         * An optional scope attribute can be added to ClassInfo. This serves
         * advanced cases whereby users may want to define classes in private
         * scopes or in other window scopes. This parameter will generally
         * not be used in the majority of cases
         */
    ,   testClassInfoScope: function ()
        {
            var scope= {}
            ,   name= 'TestClass'
            ,   info= {name:name, scope: scope}
            ,   global= this.global
            ,   returned
            
            
            assertFalse('TestClass does not exist in scope', name in scope);
            returned= implementClass(info);
            assertTrue('TestClass has been exported to the scope', name in scope);
            
            assertUndefined('TestClass has not been exported to global scope', global.TestClass);
            
            assertInstanceOf('TestClass is a constructor', Function, scope[name]);
            assertSame('TestClass constructor was returned correctly', scope[name], returned);
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
            ,   Classlet= implementClass
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
            assertInstanceOf('The method used without any arguments is equivalent to new Function', Function ,implementClass());
        }
        
        
    ,   testImplementClassReturnsConstructor: function ()
        {
            var global= (function (){return this})()
            ,   returned
            
            assertUndefined('There is no xyz namespace in global scope', global.xyz)
            
            returned= implementClass
            (
                {
                    name: 'xyz.Abc'
                }
            )
            
            assertInstanceOf('The xyz namespace was created', Object, xyz);
            assertInstanceOf('xyz.Abc refers to an automatically created constructor Function', Function, xyz.Abc);
            assertSame('The returned object is the xzy.Abc constructor', xyz.Abc, returned);
            
            delete global.xyz;
            
            
            var classConstructor= new Function
            ,   className= 'Constructor'
            
            returned= implementClass
            (
                {
                    name: className
                    
                ,   constructor: classConstructor
                }
            )
            
            assertSame('The class constructor was returned', classConstructor, returned);
            assertSame('The class constructor was exported', classConstructor, global[className]);
            
            delete global[className];
            
            assertInstanceOf('the method always returned a Function', Function, implementClass());
        }
        
    ,   testImplementClassWithDefaultConstructor: function ()
        {
            
            var global= new Function('return this')()
            ,   name= 'qwerty'
            ,   expected= 'zxcvbnm'
            ,   returned
            ,   A
            ,   B
            ,   a
            ,   b

            returned= implementClass({name: name});
            
            assertSame('A default constructor ws created and returned', global[name], returned);

            delete global[name];

            implementClass
            (
                {
                    name: 'test.A' 
                    
                ,   constructor: function (id)
                    {
                        this.id= id
                    }   
                }
            )
            
            implementClass
            (
                {
                    name: 'test.B'
                ,   parent: test.A
                }
            )   
            
            b= new test.B(expected)
            
            assertSame('The parent constructor was invoked', expected, b.id);
            
            delete test.A;
            delete test.B;
            delete global.test
        }
        
     ,  testPrototypePropertiesAreDefined: function ()
        {
            var method= new Function
            ,   instance
            
            implementClass
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
            
            implementClass
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