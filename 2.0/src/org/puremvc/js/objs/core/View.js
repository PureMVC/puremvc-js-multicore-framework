/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");

	/**
	 * @classDescription
	 * The <code>View</code> class in PureMVC.
	 * 
	 * <P>
	 * A singleton <code>View</code> implementation. In PureMVC, the
	 * <code>View</code> class assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Maintain a cache of <code>Mediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing
	 * <code>IMediator</code>s.
	 * <LI>Notifiying <code>Mediator</code>s when they are registered or removed.
	 * <LI>Managing the <code>Observer</code> lists for each
	 * <code>Notification</code> in the application.
	 * <LI>Providing a method for attaching <code>Observer</code>s to an
	 * <code>INotification</code>'s <code>Observer</code> list.
	 * <LI>Providing a method for broadcasting a <code>Notification</code>.
	 * <LI>Notifying the <code>Observer</code>s of a given
	 * <code>Notification</code> when it broadcasts.
	 *
	 * @see puremvc.Mediator Mediator
	 * @see puremvc.Observer Observer
	 * @see puremvc.Notification Notification
	 * 
	 * @constructor
	 */
	var View = Objs
	(
		"puremvc.View",
		{
			/**
			 * @private
			 *
			 * Mapping of <code>Mediator</code> names to <code>Mediator</code>
			 * instances.
			 *
			 * @type {Object}
			 */
			mediatorMap: null,
			
			/**
			 * @private
			 * 
			 * Mapping of <code>Notification</code> names to
			 * <code>Observers</code> lists.
			 *
			 * @type {Object}
			 */
			observerMap: null,
			
			/**
			 * Initialize a <code>View</code> instance.
			 * 
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already
			 * 		been constructed.
			 */
			initialize: function()
			{
				if( View.instance )
					throw Error( View.SINGLETON_MSG );
			
				this.mediatorMap = {};
				this.observerMap = {};
				this.initializeView();
			},
			
			/**
			 * Initialize the singleton <code>View</code> instance.
			 *
			 * <P>
			 * Called automatically by the constructor. This
			 * is the opportunity to initialize the singleton
			 * instance in a subclass without overriding the
			 * constructor.
			 */
			initializeView: function() {},
			
			/**
			 * Register an <code>Observer</code> to be notified of
			 * <code>Notifications</code> with a given name.
			 *
			 * @param {String} name
			 * The name of the <code>Notification</code>s to notify this
			 * <code>Observer</code> of.
			 * 
			 * @param {Observer} observer
			 * 		The <code>Observer</code> to register.
			 */
			registerObserver: function( name, observer )
			{
				var observers/*Array*/ = this.observerMap[name];
				if( observers )
					observers.push(observer);
				else
					this.observerMap[name] = [observer];
			},
			
			/**
			 * Notify the <code>Observer</code>s for a particular
			 * <code>Notification</code>.
			 *
			 * <P>
			 * All previously attached <code>Observer</code>s for this
			 * <code>Notification</code>'s list are notified and are passed a reference
			 * to the <code>Notification</code> in the order in which they were
			 * registered.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> to notify <code>Observer</code>s
			 * 		of.
			 */
			notifyObservers: function( note )
			{
				var name/*String*/ = note.getName();
			
				var observersRef/*Array*/ = this.observerMap[name];
				if( observersRef )
				{
					// Copy the array.
					var observers/*Array*/ = observersRef.slice(0);
					var len/*Number*/ = observers.length;
					for( var i/*Number*/=0; i<len; i++ )
					{
						var observer/*Observer*/ = observers[i];
						observer.notifyObserver(note);
					}
				}
			},
			
			/**
			 * Remove the <code>Observer</code> for a given <i>notifyContext</i>
			 * from an <code>Observer</code> list for a given
			 * <code>Notification</code> name.
			 *
			 * @param {String} name
			 * 		Which <code>Observer</code> list to remove from.
			 *
			 * @param {Object} notifyContext
			 * 		Remove the <code>Observer</code> with this object as its
			 *		<i>notifyContext</i>.
			 */
			removeObserver: function( name, notifyContext )
			{
				var observers/*Array*/ = this.observerMap[name];
				var i/*Number*/ = observers.length;
			
				while( i-- )
				{
					var observer/*Observer*/ = observers[i];
					if( observer.compareNotifyContext(notifyContext) )
					{
						observers.splice( i, 1 );
						break;
					}
				}
			
				// Remove empty observer lists.
				if( observers.length == 0 )
					delete this.observerMap[name];
			},
			
			/**
			 * Register an <code>IMediator</code> instance with the <code>View</code>.
			 *
			 * <P>
			 * Registers the <code>IMediator</code> so that it can be retrieved by name,
			 * and further interrogates the <code>IMediator</code> for its
			 * <code>INotification</code> interests.
			 *
			 * <P>
			 * If the <code>IMediator</code> returns any <code>INotification</code>
			 * names to be notified about, an <code>Observer</code> is created to
			 * encapsulate the <code>IMediator</code> instance's
			 * <code>handleNotification</code> method and register it as an
			 * <code>Observer</code> for all <code>INotification</code>s the
			 * <code>IMediator</code> is interested in.
			 *
			 * @param {Mediator} mediator
			 * 		A reference to the <code>Mediator</code> instance.
			 */
			registerMediator: function( mediator )
			{
				var name/*String*/ = mediator.getMediatorName();
				
				// Do not allow re-registration (you must removeMediator first)
				if( this.mediatorMap[name] )
					return;
			
				// Register the Mediator for retrieval by name
				this.mediatorMap[name] = mediator;
				
				// Register Mediator as an observer for each of its notification interests
				var interests/*Array*/ = mediator.listNotificationInterests();
				var len/*Number*/ = interests.length;
				if( len )
				{
			    	// Register Mediator as Observer for its list of Notification interests
					var observer/*Observer*/ = new Observer( mediator.handleNotification, mediator );
					for( var i/*Number*/=0; i<len; i++ )
						this.registerObserver( interests[i], observer );
				}
			
				mediator.onRegister();
			},
			
			/**
			 * Retrieve a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		The name of the <code>IMediator</code> instance to retrieve.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> instance previously registered with
			 *		the given <i>mediatorName</i> or an explicit <code>null</code>
			 *		if it doesn't exists.
			 */
			retrieveMediator: function( mediatorName )
			{
				//Return a strict null when the mediator doesn't exist
				return this.mediatorMap[mediatorName] || null;
			},
			
			/**
			 * Check if a <code>Mediator</code> is registered or not.
			 *
			 * @param {String} mediatorName
			 *		Name of the <code>Mediator</code> instance to verify the
			 *		existence of its registration.
			 *
			 * @return {Boolean}
			 *		A <code>Mediator</code> is registered with the given
			 *		<i>mediatorName</i>.
			 */
			hasMediator: function( mediatorName )
			{
				return this.mediatorMap[mediatorName] ? true : false;
			},
			
			/**
			 * Remove a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		Name of the <code>IMediator</code> instance to be removed.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> that was removed from the
			 		<code>View</code> or a strict <code>null</null> if the
			 		<code>Mediator</code> didn't exist.
			 */
			removeMediator: function( mediatorName )
			{
				var mediator/*Mediator*/ = this.mediatorMap[mediatorName];
				if( !mediator )
					return null;
			
				var interests/*Array*/ = mediator.listNotificationInterests();
				var i/*Number*/ = interests.length;
				while (i--) 
					this.removeObserver( interests[i], mediator );
				
				delete this.mediatorMap[mediatorName];
				mediator.onRemove();
				return mediator;	
			}
		}
	);
	
	/**
	 * @constant
	 * @type {String}
	 * @private
	 */
	View.SINGLETON_MSG = "View Singleton already constructed!";
	
	/**
	 * @type {View}
	 * @private
	 */
	View.instance = null;
	
	/**
	 * Retrieve the singleton instance of the <code>View</code>.
	 * 
	 * @return {View}
	 * 		The singleton instance of the <code>View</code>.
	 */
	View.getInstance = function()
	{
		if( !View.instance )
			View.instance = new View();
	
		return View.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	View = Objs("puremvc.View");