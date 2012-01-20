/**
 * @fileOverview
 * PureMVC multicore native JavaScript port.
 * @author David Foley | david@objectkit.com
 */
(function (scope){
	
	if (null == scope)
	    scope= window;
	
	// if the global puremvc namespace already exists, turn back now
	if (scope.puremvc)
	{
		return;
	}

 	/* implementation begin */
	
	
