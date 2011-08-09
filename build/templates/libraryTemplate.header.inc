/**
 * @fileOverview
 * @author David Foley | david.foley@puremvc.org
 */

/**
 * An anonymous object scope is used to protect against
 * global variable leakage while we export the library classes
 * to the org.puremvc.js.multicore namespace
 * 
 * @constructor
 * @param {Object} scope
 */
new function (scope)
{
	// create the org.puremvc.js object hierarchy
	// if the hierarchy does not yet exist
	if (null == scope['org'])
	{
		scope.org= {};
	}
	
	if (null == scope['org']['puremvc'])
	{
		scope['org']['puremvc']= {};
	}
	
	if (null == scope['org']['puremvc']['js'])
	{
		scope['org']['puremvc']['js']= {};
	}
	
	// we have now established that at least the org.puremvc.js namespace
	// exists. Before continuing further, we test for the presence of the 
	// org.puremvc.js.multicore namespace to determine if the library has 
	// already been exported. If it has, we avoid exporting it again by 
	// exiting now.
	if (scope['org']['puremvc']['js']['multicore'])
	{
		return;	
	}

 	/* implementation begin */
	
	
