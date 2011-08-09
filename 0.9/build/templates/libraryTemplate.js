/**
 * @fileOverview
 * @author David Foley | david@objectkit.com
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
 	
 	// @include org/puremvc/js/patterns/observer/Notification.js 
	// @include org/puremvc/js/patterns/observer/Observer.js 
	// @include org/puremvc/js/patterns/observer/Notifier.js 
	// @include org/puremvc/js/help/adapters/NotifierAdapter.js 
	// @include org/puremvc/js/patterns/command/SimpleCommand.js 
	// @include org/puremvc/js/patterns/command/MacroCommand.js 
	// @include org/puremvc/js/patterns/proxy/Proxy.js 
	// @include org/puremvc/js/patterns/mediator/Mediator.js 
	// @include org/puremvc/js/patterns/facade/Facade.js 
	// @include org/puremvc/js/core/Controller.js 
	// @include org/puremvc/js/core/Model.js 
	// @include org/puremvc/js/core/View.js 
	// @include org/puremvc/js/help/adapters/NotifierAdapter.js 
	// @include org/puremvc/js/help/adapters/FacadeAdapter.js 
	// @include org/puremvc/js/help/adapters/SimpleCommandAdapter.js 
	// @include org/puremvc/js/help/adapters/MacroCommandAdapter.js 
	// @include org/puremvc/js/help/adapters/MediatorAdapter.js 
	// @include org/puremvc/js/help/adapters/ProxyAdapter.js 	 
	
 	/* implementation end */
 	 
	// export the library classes to the
	// org.puremvc.js.multicore namespace
	scope['org']['puremvc']['js']['multicore']=
	{
		'core':
		{
			'View': View
		,	'Model': Model
		,	'Controller': Controller
		}
		
	,	'patterns':
		{
			'command':
			{
				'SimpleCommand': SimpleCommand
			,	'MacroCommand': MacroCommand
			}
		,
			'facade':
			{
				'Facade': Facade
			}
			
		,	'mediator':
			{
				'Mediator': Mediator
			}
			
		,	'observer':
			{
				'Observer': Observer
			,	'Notification': Notification
			,	'Notifier': Notifier
			}
			
		,	'proxy':
			{
				'Proxy': Proxy
			}
		}
	};
}(this); // the 'this' parameter will resolve to global scope in all environments
