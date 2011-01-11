/*
 PureMVC Javascript port by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
* A Singleton <code>IView</code> implementation.
*
* <P>
* In PureMVC, the <code>View</code> class assumes these responsibilities:
* <UL>
* <LI>Maintain a cache of <code>IMediator</code> instances.</LI>
* <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.</LI>
* <LI>Notifiying <code>IMediators</code> when they are registered or removed.</LI>
* <LI>Managing the observer lists for each <code>INotification</code> in the application.</LI>
* <LI>Providing a method for attaching <code>IObservers</code> to an <code>INotification</code>'s observer list.</LI>
* <LI>Providing a method for broadcasting an <code>INotification</code>.</LI>
* <LI>Notifying the <code>IObservers</code> of a given <code>INotification</code> when it broadcast.</LI>
* </UL>
*
* @see org.puremvc.js.patterns.mediator.Mediator Mediator
* @see org.puremvc.js.patterns.observer.Observer Observer
* @see org.puremvc.js.patterns.observer.Notification Notification
*/
function class_org_puremvc_js_core_View()
{
	Objs.register("org.puremvc.js.core.View",View);

	var IView = Objs.load("org.puremvc.js.interfaces.IView");
	var IObserver = Objs.load("org.puremvc.js.interfaces.IObserver");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Observer = Objs.load("org.puremvc.js.patterns.observer.Observer");

	/**
	 * Constructor.
	 *
	 * <P>
	 * This <code>IView</code> implementation is a Singleton,
	 * so you should not call the constructor
	 * directly, but instead call the static Singleton
	 * Factory method <code>View.getInstance()</code>
	 *
	 * @throws Error Error if Singleton instance has already been constructed
	 *
	 */
	function View()
	{
		if(Objs.extending) return;

		if(View._instance != null)
			throw Error(View._SINGLETON_MSG);

		View._instance = this;

		this._mediatorMap = new Array();
		this._observerMap = new Array();
		this._initializeView();
	}

	/**
	 * <code>View</code> implements <code>IView</code>
	 */
	Objs.implement(View,IView);

	var o = View.prototype;

	/**
	 * Mapping of Mediator names to Mediator instances
	 */
	o._mediatorMap/*Array*/ = null;

	/**
	 * Mapping of Notification names to Observer lists
	 */
	o._observerMap/*Array*/ = null;

	/**
	 * Singleton instance
	 */
	View._instance/*IView*/ = null;

	/* Message Constants */
	View._SINGLETON_MSG/*String*/ = "View Singleton already constructed!";

	/**
	 * Initialize the Singleton View instance.
	 *
	 * <P>
	 * Called automatically by the constructor, this
	 * is your opportunity to initialize the Singleton
	 * instance in your subclass without overriding the
	 * constructor.</P>
	 *
	 * @return void
	 */
	o._initializeView = function()
	{
	}

	/**
	 * View Singleton Factory method.
	 *
	 * @return the Singleton instance of <code>View</code>
	 */
	View.getInstance =  function()/*IView*/
	{
		if(View._instance == null)
			View._instance  = new View();

		return View._instance;
	}

	/**
	 * Register an <code>IObserver</code> to be notified
	 * of <code>INotifications</code> with a given name.
	 *
	 * @param notificationName the name of the <code>INotifications</code> to notify this <code>IObserver</code> of
	 * @param observer the <code>IObserver</code> to register
	 */
	o.registerObserver = function( notificationName/*String*/, observer/*IObserver*/ )
	{
		var observers/*Array*/ = this._observerMap[ notificationName ];

		if( observers )
			observers.push( observer );
		else
			this._observerMap[ notificationName ] = [ observer ];
	}

	/**
	 * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
	 *
	 * <P>
	 * All previously attached <code>IObserver</code> for this <code>INotification</code>'s
	 * list are notified and are passed a reference to the <code>INotification</code> in
	 * the order in which they were registered.</P>
	 *
	 * @param notification the <code>INotification</code> to notify <code>IObserver</code> of.
	 */
	o.notifyObservers = function( notification/*INotification*/ )
	{
		if( this._observerMap[ notification.getName() ] != null )
		{
			var observers/*Array*/ = this._observerMap[ notification.getName() ];

			for(var i/*Number*/ = 0; i<observers.length; i++)
			{
				var observer/*IObserver*/ = observers[ i ];
				observer.notifyObserver( notification );
			}
		}
	}

	/**
	 * Remove the observer for a given notifyContext from an observer list for a given Notification name.
	 * <P>
	 * @param notificationName which observer list to remove from
	 * @param notifyContext remove the observer with this object as its notifyContext
	 */
	o.removeObserver = function( notificationName/*String*/, notifyContext/*Object*/ )
	{
		/*
		 * the observer list for the notification under inspection
		 */
		var observers/*Array*/ = this._observerMap[ notificationName ];

		/*
		 * find the observer for the notifyContext
		 */
		for( var i/*int*/=0; i<observers.length; i++ )
		{
			if( Observer(observers[i]).compareNotifyContext( notifyContext ) == true )
			{
				/*
				 * there can only be one Observer for a given notifyContext
				 * in any given Observer list, so remove it and break
				 */
				observers.splice(i,1);
				break;
			}
		}

		/*
		 * Also, when a Notification's Observer list length falls to
		 * zero, delete the notification key from the observer map
		 */
		if( observers.length == 0 )
			delete this._observerMap[ notificationName ];
	}

	/**
	 * Register an <code>IMediator</code> instance with the <code>View</code>.
	 *
	 * <P>
	 * Registers the <code>IMediator</code> so that it can be retrieved by name,
	 * and further interrogates the <code>IMediator</code> for its
	 * <code>INotification</code> interests.</P>
	 * <P>
	 * If the <code>IMediator</code> returns any <code>INotification</code>
	 * names to be notified about, an <code>Observer</code> is created encapsulating
	 * the <code>IMediator</code> instance's <code>handleNotification</code> method
	 * and registering it as an <code>Observer</code> for all <code>INotifications</code> the
	 * <code>IMediator</code> is interested in.</p>
	 *
	 * @param mediator a reference to the <code>IMediator</code> instance
	 */
	o.registerMediator = function( mediator/*IMediator*/ )
	{
		/*
		 * Register the Mediator for retrieval by name
		 */
		this._mediatorMap[ mediator.getMediatorName() ] = mediator;

		/*
		 * Get Notification interests, if any.
		 */
		var interests/*Array*/ = mediator.listNotificationInterests();

		/*
		 * Register Mediator as an observer for each of its notification interests
		 */
		if( interests.length>0 )
		{
			/*
			 * Create Observer referencing this mediator's handlNotification method
			 */
			var observer/*Observer*/ = new Observer( mediator.handleNotification, mediator );

			/*
			 * Register Mediator as Observer for its list of Notification interests
			 */
			for( var i/*Number*/=0; i<interests.length; i++ )
				this.registerObserver( interests[i],  observer );
		}

		/*
		 * alert the mediator that it has been registered
		 */
		mediator.onRegister();

	}

	/**
	 * Retrieve an <code>IMediator</code> from the <code>View</code>.
	 *
	 * @param mediatorName the name of the <code>IMediator</code> instance to retrieve.
	 * @return the <code>IMediator</code> instance previously registered with the given <code>mediatorName</code>.
	 */
	o.retrieveMediator = function( mediatorName/*String*/ )/*IMediator*/
	{
		return this._mediatorMap[ mediatorName ];
	}

	/**
	 * Remove an <code>IMediator</code> from the <code>View</code>.
	 *
	 * @param mediatorName name of the <code>IMediator</code> instance to be removed.
	 * @return the <code>IMediator</code> that was removed from the <code>View</code>
	 */
	o.removeMediator = function( mediatorName/*String*/ )/*IMediator*/
	{
		/*
		 * Retrieve the named mediator
		 */
		var mediator/*IMediator*/ = this._mediatorMap[ mediatorName ];

		if( mediator )
		{
			/*
			 * For every notification this mediator is interested in...
			 */
			var interests/*Array*/ = mediator.listNotificationInterests();
			for( var i/*Number*/=0; i<interests.length; i++ )
			{
				/*
				 * Remove the observer linking the mediator
				 * to the notification interest.
				 */
				this.removeObserver( interests[i], mediator );
			}

			/*
			 * Remove the mediator from the map.
			 */
			delete this._mediatorMap[ mediatorName ];

			/*
			 * Alert the mediator that it has been removed.
			 */
			mediator.onRemove();
		}

		return mediator;
	}

	/**
	 * Check if a Mediator is registered or not
	 *
	 * @param mediatorName
	 * @return whether a Mediator is registered with the given <code>mediatorName</code>.
	 */
	o.hasMediator = function( mediatorName/*String*/ )/*Boolean*/
	{
		return this._mediatorMap[ mediatorName ] != null;
	}
}