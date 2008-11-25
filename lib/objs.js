/**
* @author   Frederic Saunier - www.tekool.net
* @since    2006/02/08
*
* @description
*   The class *Objs* is intended to
*   help you to use Javascript files as
*   classes files as you could do it with 
*   Actionscript, C#, Java, etc...
*
* @license
*
* Copyright (C) 2006 Frederic Saunier
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*
*/
if(typeof Objs == 'undefined')
{
	/**
	* Constructor
	*
	* @private The singleton is instanciated by calling any of
	* the static public method of the class.
	*/
	Objs = function()
	{
		this.__classes = new Object();
	};

	/**
	* Register the constructor method of a "class"
	* to make it accessible under the classpath passed
	* as the first method parameter.
	*
	* A class is only registered once.
	*
	* @param classpath
	*			The full classpath of the object to register,
    *			including the class name.
    * @param constructorMethod
    *			The constructor method to register with the given classpath.
    *
	* eg. : Objs.register('com.mywebsite.myclasspath',myConstructor)
	*/
	Objs.register = function(classpath,constructorMethod)
	{
		Objs._getInstance()._register(classpath,constructorMethod);
	}

	/**
	* Loads a Javascript class file identified by its classpath and evaluate
	* the code that it contains to declare the class.
	*
	* @param classPath
	* The fully qualified classPath of the class.
	* eg. : Objs.load('com.mywebsite.myclasspath.MyClass')
	*/
	Objs.load = function(classPath)
	{
		return Objs._getInstance()._load(classPath);
	}

	/**
	 * Mimics the way a class is extended in Java, C#, Actionscript
	 * with two <code>Function</code> objects as constructors and theirs
	 * own prototypes.
	 *
	 * @param constructorMethod
	 * The constructor method representing the class to extends.
	 *
	 * @param superConstructor
	 * The constructor method representing the super class to extends.
	 */
	Objs.extend = function(constructorMethod/*Function*/, superConstructor/*Function*/ )
	{
		if(superConstructor.toString().indexOf('Objs.extending') == -1)
			throw new Error('You have forgotten to avoid unwanted call to constructor while extending.');

		Objs.extending = true;
		constructorMethod.prototype = new superConstructor();
		Objs.extending = false;
	}

	/**
	* A flag passed to true when Objs is constructing a class.
	*
	* It is used by developpers to avoid unwanted call to the body of
	* constructors when using
	* <code>constructorMethod.prototype = new superConstructor();</code>.
	*/
	Objs.extending = false;

	/**
	 * Mimics the way an interface is implemented in Java, C#, Actionscript
	 * with two <code>Function</code> objects as constructors and theirs
	 * own prototypes.
	 *
	 * The interface, in reality, is a class constructed at runtime.
	 *
	 * @param constructorMethod
	 * The constructor method representing the class to extends.
	 *
	 * @param interfaceConstructor
	 * The constructor method representing the super class to extends.
	 */
	Objs.implement = function( constructorMethod/*Function*/, interfaceConstructor/*Function*/ )
	{
		Objs._getInstance()._implement( constructorMethod, interfaceConstructor );
	}

	//----------------------------------------------------------------------
	// Private properties
	//
	Objs.prototype.__classPathBase = null;
	Objs.prototype.__classes = null;

	//----------------------------------------------------------------------
	// ClassInfo object internal definition.
	//
	Objs.ClassInfo = function(){};

	/**
	* Constructor method of the class.
	*/
	Objs.ClassInfo.prototype.constructorMethod = null;

	/**
	* List of <code>ClassInfo</code>s objects refering to the interfaces
	* implemented by the class.
	*/
	Objs.ClassInfo.prototype.implementList = null;

	//----------------------------------------------------------------------
	// Private method
	//

	/**
	* Singleton pattern implementation.
	*/
	Objs._instance = null;
	Objs._getInstance = function()
	{
		if(Objs._instance == null)
			return Objs._instance = new Objs();

		return Objs._instance;
	}

	/**
	* Returns the ClassInfo object corresponding to a classpath.
	*/
	Objs.prototype._getClassInfo = function(classPath/*String*/)
	{
		var classInfo;
		try
		{
			classInfo = this.__classes[classPath];
		}
		catch(e)
		{
			return null;
		}

		return classInfo;
	}

	/**
	* Returns the ClassInfo object corresponding to a class constructor.
	*/
	Objs.prototype._getClassInfoFromConstructor = function(constructorMethod/*Function*/)
	{
		var classInfo;
		for(var sName in this.__classes)
			if(this.__classes[sName].constructorMethod === constructorMethod)
				return this.__classes[sName];

		return null;
	}

	/**
	* @private
	*/
	Objs.prototype._register = function(classPath,constructorMethod)
	{
		var classInfo = this._getClassInfo(classPath);
		if(classInfo == null)
		{
			classInfo = new Objs.ClassInfo();
			this.__classes[classPath] = classInfo;
		}

		/*
		* If a constructor is already registered with this classpath
		* we don't register it again, never.
		*/
		if(classInfo.constructorMethod != null)
			return;

		classInfo.constructorMethod = constructorMethod;
		classInfo.implementList = new Array();
	}

	/**
	* @private
	*/
	Objs.prototype._load = function(classPath)
	{
		var classInfo;
		
		classInfo = this._getClassInfo(classPath);
		if(classInfo != null && classInfo.constructorMethod != null)
			return classInfo.constructorMethod;

		var wrapperMethodName = 'class_' + classPath.split('.').join('_');
		var wrapperMethod = window[wrapperMethodName];

		if(wrapperMethod == null)
			throw new Error('Unexistent class wrapper method : "' + wrapperMethodName + '"');

		wrapperMethod();

		classInfo = this._getClassInfo(classPath);
		if(classInfo == null)
			throw new Error('Problem while registering : "' + wrapperMethodName + '". Mainly means that you forgive to register the constructor method.');

		this._checkImplementList(classInfo);

		/*
		* The *register* method of the evaluated class will have
		* registered the constructor method of the classInfo object.
		*/
		return classInfo.constructorMethod;
	}

	/**
	* @private
	*/
	Objs.prototype._implement = function(constructorMethod/*Function*/, interfaceConstructor/*Function*/)
	{
		var classClassInfo = this._getClassInfoFromConstructor(constructorMethod);
		if(classClassInfo == null)
			throw new Error('Attempting to implement the interface [' + interfaceConstructor + '] on the unregistered constructor [' + constructorMethod + ']');

		var interfaceClassInfo = this._getClassInfoFromConstructor(interfaceConstructor);
		if(interfaceClassInfo == null)
			throw new Error('Attempting to implement the unregistered interface [' + interfaceConstructor + '] on the constructor [' + constructorMethod + ']');

		/*
		* NOT TODO We could check if the implement list already have an
		* occurence of this interface definition, but there is no matter
		* not to do it either for optimization concerns.
		*/
		classClassInfo.implementList.push( interfaceClassInfo );
	}
	
	/**
	* Iterate over the "interface definition" to check that each defined
	* method is well implemented by the class.
	*/
	Objs.prototype._checkImplementList = function(classInfo)
	{
		if(classInfo.implementList.length==0)
			return;

		var len = classInfo.implementList.length;
		for(var i=0; i<len; i++)
			this._checkImplement(classInfo, classInfo.implementList[i]);
	}
	
	/**
	* Check that each defined method of an interface is well implemented by
	* the class.
	*/
	Objs.prototype._checkImplement = function(classClassInfo, interfaceClassInfo)
	{
		Objs.extending = true;
		var interClass/*Object*/ = new classClassInfo.constructorMethod();
		var interfaceClass/*Object*/ = new interfaceClassInfo.constructorMethod();
		Objs.extending = false;

		for( var methodName/*String*/ in interfaceClass )
		{
			var method/*Function*/ = interfaceClass[methodName];
			if(typeof method != 'function')
				continue;

			if(typeof interClass[methodName] != 'function')
				throw new Error('Method : "' + methodName + '" from [' + interfaceClassInfo.constructorMethod + '] is not implemented by [' + classClassInfo.constructorMethod + ']');
		}
	}
}