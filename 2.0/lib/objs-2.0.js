/**
 * @classDescription
 * A minimalistic library intended to help in using namespaces and class
 * inheritance in JavaScript.
 * 
 * @author   Frederic Saunier - www.tekool.net
 * @version 2.0
 *
 * @license
 * Copyright (C) 2011 Frederic Saunier
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/.
 *
 */
var Objs;
new function()
{
	/**
	 * Create or retrieve a class constructor using its unique classpath.
	 * 
	 * <P>
	 * If a class is associated twice with the same namespace, only the last
	 * call will be taken into account if it defines a protobject or a
	 * superclass.
	 *
	 * @param {String} classpath
	 * 		The classpath of the class to create or retrieve.
	 * 
	 * 		<P>Retrieve:
	 * 		If <code>classpath</code> is the only parameter passed when calling
	 * 		Objs, the class constructor corresponding to the given classpath is
	 * 		returned. A new class constructor is returned if no constructor for
	 * 		the given classpath first exists.
	 * 
	 * 	 	<P>Create:
	 * 		If <code>classpath</code> parameter is followed by one or two valid
	 * 		parameters it will create a class.
	 *
	 * @param {Function} superclass
	 * 		(optional) A superclass to inherit from.
	 * 
	 * @param {Object} protobject
	 * 		(optional) The object used to declare class methods.
	 * 		
	 * 		<P>
	 * 		This can be the second or third argument. The method will
	 * 		automatically detect if the argument is a superclass of a
	 * 		protobject declaration.
	 *
	 * @return {Function}
	 * 		The constructor method of the class corresponding to the given
	 * 		classpath.
	 */
	Objs = function( classpath, superclass, protobject )
	{
		var 
			func/*Function*/,
			superclassType/*String*/ = typeof superclass,
			propName/*String*/,
			i/*Number*/,
			arr/*Array*/
		;



		// --------------------------------------------------------------------
		// Overloading:
		//

		/*
		 * Calling Objs with something else than a String as first parameter
		 * throws an error.
		 */
		if( typeof classpath != Tstring )
			throw Error( $InvalidClassPath + classpath );

		/*
		 * If the 2nd argument is a superclass classpath.
		 */
		if( superclassType == Tstring )
		{
			/*
			 * If the developer try to inherit from an unregistered class
			 * it is really important for him to be informed of the error.
			 */
			if( !map[superclass] ) 
				throw Error( $UnexistentSuperClass + superclass );
			
			superclass = map[superclass];
		}

		else
		
		/*
		 * If the 2nd argument is "protobject" not "superclass".
		 */
		if( superclassType == "object" )
		{
			protobject = superclass;
			superclass = null;
		}



		// --------------------------------------------------------------------
		// Retrieve
		//

		/*
		 * If <code>classpath</code> was the only parameter passed to Objs, the
		 * developer only wants to get the class constructor corresponding to
		 * the given classpath.
		 */
		if( !superclass && !protobject && map[classpath] )		
			return map[classpath];



		// --------------------------------------------------------------------
		// Create
		//
		
		func = map[classpath] = function()
		{
			/*
			 * The constructor is not called during the extend phase:
			 * myClass.prototype = new MySuperClass().
			 */
			if( !func[$extending] )
			{
				//A superclass is registered.
				if( func[$superclass] )
				{
					func[$superclass][$constructing] = 1;
					func[$superclass].call( this );
					delete func[$superclass][$constructing];
				}
	
				/*
				 * The initialize method must only be called automatically on the
				 * first called constructor in the inheritance chain.
				 */
				if
				(
					!func[$constructing]
					&&
					func[$prototype][$initialize]
				)
					func[$prototype][$initialize].apply( this, arguments );
			}
		}

		//There is superclass to extend from.
		if( superclass )
		{
			superclass[$extending] = 1;
			func[$prototype] = new superclass();
			delete superclass[$extending];
						
			/*
			 * Each class in Objs have a "$super" shortcut to its superclass
			 * prototype and a "$superclass" shortcut to its superclass
			 * constructor.
			 */
			func[$superclass] = superclass;
			func[$super] = superclass[$prototype];
		}
			
		/*
		 * Protobject properties and methods are copied into the prototype of
		 * the returned constructor.
		 */
		if( protobject )
		{			
			//Some Object methods are not enumerable in some browsers
			arr = nonEnumerable.slice(0);
			for( propName in protobject)
				if( protobject.hasOwnProperty(propName) )
					arr.push(propName);

			for( i=0; i<arr.length; i++ )
			{
				propName = arr[i];
				func[$prototype][propName] = protobject[propName];
			}
		}

		return func;
	}

	//----------------------------------------------------------------------
	// Private properties
	//
	
	var

	//Dictionnary of strings used to reduce the generated file size.
	Tstring/*String*/ = "string",
	$super/*String*/ = "$super",
	$class/*String*/ = "class",
	$superclass/*String*/ = $super + $class,
	$prototype/*String*/ = "prototype",
	$initialize/*String*/ = "initialize",
	$prefix/*String*/ = "$Objs$",
	$constructing/*String*/ = $prefix + "c",
	$extending/*String*/ = $prefix + "e",
	$UnexistentSuperClass/*String*/ = "Unexistent super" + $class + ": ",
	$InvalidClassPath/*String*/ = "Invalid " + $class + "path: ",
	
	/**
	 * A map of <code>ClassInfo</code> objects used to manage classes
	 * registrations.
	 * 
	 * @type {Object}
	 * @private
	 */
	 map/*Object*/ = {},
	
	/**
	 * A list of non enumerable <code>Object</code> methods
	 * (Internet Explorer).
	 * 
	 * @type {Array}
	 * @private
	 */
	nonEnumerable = [ "toString", "valueOf", "toLocaleString" ]	;
}
