	
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
