/**
 * @fileOverview
 * PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau 
 * Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 * Reuse governed by Creative Commons Attribution 3.0 
 * http://creativecommons.org/licenses/by/3.0/us/
 * @author david.foley@puremvc.org 
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
	
	
