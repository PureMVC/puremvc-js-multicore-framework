/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* The interface definition for a PureMVC Model.
*
* <P>
* In PureMVC, <code>IModel</code> implementors provide
* access to <code>IProxy</code> objects by named lookup. </P>
*
* <P>
* An <code>IModel</code> assumes these responsibilities:</P>
*
* <UL>
* <LI>Maintain a cache of <code>IProxy</code> instances</LI>
* <LI>Provide methods for registering, retrieving, and removing <code>IProxy</code> instances</LI>
* </UL>
*/
function class_org_puremvc_js_interfaces_IModel()
{
	Objs.register("org.puremvc.js.interfaces.IModel",IModel);
	var o = IModel.prototype;

	/**
	* Constructor
	*/
	function IModel(){}

	/**
	 * Register an <code>IProxy</code> instance with the <code>Model</code>.
	 *
	 * @param proxy an object reference to be held by the <code>Model</code>.
	 */
	o.registerProxy = function( proxy/*IProxy*/ ){};

	/**
	 * Retrieve an <code>IProxy</code> instance from the Model.
	 *
	 * @param proxyName
	 * @return the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
	 */
	o.retrieveProxy = function( proxyName/*String*/ )/*IProxy*/{};

	/**
	 * Remove an <code>IProxy</code> instance from the Model.
	 *
	 * @param proxyName name of the <code>IProxy</code> instance to be removed.
	 * @return the <code>IProxy</code> that was removed from the <code>Model</code>
	 */
	o.removeProxy = function( proxyName/*String*/ )/*IProxy*/{};

	/**
	 * Check if a Proxy is registered
	 *
	 * @param proxyName
	 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
	 */
	o.hasProxy = function( proxyName/*String*/ )/*Boolean*/{};
}