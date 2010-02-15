/**
* @misc
* The View class in PureMVC.
*
* @class A Singleton <code>View</code> implementation.
* In PureMVC, the <code>View</code> class assumes these responsibilities:
* <UL>
* <LI>Maintain a cache of <code>Mediator</code> instances.</LI>
* <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.</LI>
* <LI>Notifiying <code>Mediators</code> when they are registered or removed.</LI>
* <LI>Managing the observer lists for each <code>Notification</code> in the application.</LI>
* <LI>Providing a method for attaching <code>Observers</code> to an <code>INotification</code>'s observer list.</LI>
* <LI>Providing a method for broadcasting an <code>Notification</code>.</LI>
* <LI>Notifying the <code>Observers</code> of a given <code>Notification</code> when it broadcast.</LI>
* </UL>
*
* @see Mediator
* @see Observer
* @see Notification
* @author Justin Wilaby
*/
var View = function(){

    /**
     * Mapping of <code>Mediator</code> names to
     * <code>Mediator</code> instances
     * @type Object
     */
    this.mediatorMap = {}
    /**
     * Mapping of <code>Notification</code> names to
     * <code>Observers</code> lists
     * @type Object
     */
    this.observerMap = {}

    /**
    * Register an <code>Observer</code> to be notified
    * of <code>Notifications</code> with a given name.
    *
    * @param {String} notificationName The name of the <code>Notifications</code> to notify this <code>Observer</code> of
    * @param {Observer} observer The <code>Observer</code> to register.
    */
    this.registerObserver = function(notificationName /* String */, observer /* Observer */)
    {
	var observers = this.observerMap[notificationName];
	if (observers)
	    observers.push(observer);
	else
	    this.observerMap[notificationName] = [observer];
    }

    /**
    * Notify the <code>Observers</code> for a particular <code>Notification</code>.
    *
    * <P>
    * All previously attached <code>Observers</code> for this <code>Notification</code>'s
    * list are notified and are passed a reference to the <code>Notification</code> in
    * the order in which they were registered.</P>
    *
    * @param {Notification} notification The <code>Notification</code> to notify <code>Observers</code> of.
    */
    this.notifyObservers = function(notification /* Notification*/)
    {
	var name = notification.getName();
	if (this.observerMap[name] == null)
	    return;
	// Copy the array
	var observers = this.observerMap[name].concat();
	var len = observers.length;
	for (var i = 0; i < len; i++)
	{
	    var observer = observers[i];
	    observer.notifyObserver(notification);
	}
    }

    /**
    * Remove the observer for a given notifyContext from an observer list for a given Notification name.
    * <P>
    * @param {String} notificationName which observer list to remove from
    * @param {Object} notifyContext remove the observer with this object as its notifyContext
    */
    this.removeObserver = function(notificationName /* String */, notifyContext /* Object */)
    {
	var observers = this.observerMap[notificationName];
	var i = observers.length;
	while(i--)
	{
	    var observer = observers[i];
	    if (observer.compareNotifyContext(notifyContext))
	    {
		observers.splice(i, 1);
		break;
	    }
	}
	// Remove empty observer lists.
	if (!observers.length)
	    delete this.observerMap[notificationName];
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
    * @param {Mediator} mediator a reference to the <code>Mediator</code> instance
    */
    this.registerMediator = function(mediator /* Mediator */)
    {
	var name = mediator.getMediatorName();
	if (this.mediatorMap[name])
	    return;
	this.mediatorMap[name] = mediator;
	var interests = mediator.listNotificationInterests();
	var len = interests.length;
	if (len)
	{
	    var observer = new Observer(mediator.handleNotification, mediator);
	    for (var i = 0; i < len; i++)
		this.registerObserver(interests[i], observer);
	}
	mediator.onRegister();
    }

    /**
    * Retrieve a <code>Mediator</code> from the <code>View</code>.
    *
    * @param {String} mediatorName the name of the <code>IMediator</code> instance to retrieve.
    * @return {Mediator} the <code>Mediator</code> instance previously registered with the given <code>mediatorName</code>.
    */
    this.retrieveMediator = function(mediatorName /* String */)
    {
	return this.mediatorMap[mediatorName];
    }

    /**
    * Remove an <code>Mediator</code> from the <code>View</code>.
    *
    * @param {String} mediatorName name of the <code>IMediator</code> instance to be removed.
    * @return {Mediator} the <code>Mediator</code> that was removed from the <code>View</code>
    */
    this.removeMediator = function(mediatorName /* String */)
    {
	var mediator = this.mediatorMap[mediatorName];
	if (mediator)
	{
	    var interests = mediator.listNotificationInterests();
	    var i = interests.length;
	    while(i--)
		this.removeObserver(interests[i], mediator);

	    delete this.mediatorMap[mediatorName];
	    mediator.onRemove();
	}
	return mediator;
    }

    /**
    * Check if a Mediator is registered or not
    *
    * @param {String} mediatorName
    * @return {Boolean} whether a Mediator is registered with the given <code>mediatorName</code>.
    */
    this.hasMediator = function(mediatorName /* String */)
    {
	return this.mediatorMap[mediatorName] != null;
    }
}
/**
 * Singleton implementation for the <code>View</code>
 * @return {View} the Singleton instance of the <code>View</code>
 */
View.getInstance = function()
{
    if (View.instance == undefined)
    {
	var classFactory = new Class(new View());
	View.instance = new classFactory();
    }
    return View.instance;
}