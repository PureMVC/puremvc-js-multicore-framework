/**
 * @fileOverview
 * @author David Foley
 * @exports View as org.puremvc.js.multicore.core.View
 */

/**
 * View
 * 
 * 
 * @param {string} key
 * @constructor
 * @see org.puremvc.js.multicore.core.View#getInstance
 */
function View(key)
{
    if(View.instanceMap[key] != null)
    {
        throw new Error(View.MULTITON_MSG);
    };

    this.multitonKey = key;
    View.instanceMap[this.multitonKey] = this;
    this.mediatorMap = [];
    this.observerMap = [];
    this.initializeView();
};

/**
 * The Views proteted initialization method. Though you will probably never
 * subclass View, you can override thie method to implementation your own View
 * initialization logic here.
 *
 * @return {void}
 */
View.prototype.initializeView = function()
{
    return;
};

/**
 * Retrieve a previously instantiated View using the multiton key to look it up. If
 * no View exits with they key, a new one will be instantiated automaticlly.
 * 
 * @static
 * @param {string} key
 *  A Views multiton key
 * @return {org.puremvc.js.multicore.core.View}
 */
View.getInstance = function(key)
{
    if(View.instanceMap[key] == null)
    {
        View.instanceMap[key] = new View(key);
    };

    return View.instanceMap[key];
};

/**
 * @param {string} notificationName
 * @param {org.puremvc.js.multicore.patterns.observer.Observer}
 * @return {void}
 */
View.prototype.registerObserver = function(notificationName, observer)
{
    if(this.observerMap[notificationName] != null)
    {
        this.observerMap[notificationName].push(observer);
    }
    else
    {
        this.observerMap[notificationName] = [observer];
    }
};

/**
 * Dispatch a Notification through the core
 *
 * @param {org.puremvc.js.multicore.patterns.observer.Notification} notification
 * @return {void}
 */
View.prototype.notifyObservers = function(notification)
{
    // SIC
    if(this.observerMap[notification.getName()] != null)
    {
        var observers_ref = this.observerMap[notification.getName()], observers = [], observer

        for(var i = 0; i < observers_ref.length; i++)
        {
            observer = observers_ref[i];
            observers.push(observer);
        }

        for(var i = 0; i < observers.length; i++)
        {
            observer = observers[i];
            observer.notifyObserver(notification);
        }
    }
};

/**
 * Remove an Observer from the View.
 *
 * @param {string} notificationName
 *  The name of a notification that the observer is currently observing
 * @param {Observer} notifyContext
 *  The observer to remove.
 * @return {void}
 */
View.prototype.removeObserver = function(notificationName, notifyContext)
{
    // SIC
    var observers = this.observerMap[notificationName];
    for(var i = 0; i < observers.length; i++)
    {
        if(observers[i].compareNotifyContext(notifyContext) == true)
        {
            observers.splice(i, 1);
            break;
        }
    }

    if(observers.length == 0)
    {
        delete this.observerMap[notificationName];
    }
};

/**
 * Register a Mediator with the View. If the Mediator is already registered,
 * no action is taken, Otherwise, the return value of Mediators#getMediatorName
 * is used to reference the Mediator, and the Mediators#onRegister method is
 * invoked.
 *
 * You will most likely use this method indirectly via Facade, rather than on
 * View instances.
 *
 * @param {org.puremvc.js.multicore.patterns.mediator.Mediator} mediator
 *  The Mediator to register.
 * @return {void}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#registerMediator
 * @see org.puremvc.js.multicore.patterns.mediator.Mediator#getMediatorName
 * @see org.puremvc.js.multicore.patterns.mediator.Mediator#onRegister
 */
View.prototype.registerMediator = function(mediator)
{
    if(this.mediatorMap[mediator.getMediatorName()] != null)
    {
        return;
    }

    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()] = mediator;

    // get notification interests if any
    var interests = mediator.listNotificationInterests();

    // register mediator as an observer for each notification
    if(interests.length > 0)
    {
        // create observer referencing this mediators handleNotification method
        var observer = new Observer(mediator.handleNotification, mediator);
        for(var i = 0; i < interests.length; i++)
        {
            this.registerObserver(interests[i], observer);
        }
    }

    mediator.onRegister();
}

/**
 * Retrieve a Mediator from the View. If a Mediator with the name provided is
 * registered with the View, it is returned, otherwise, the method will return
 * null.
 *
 * You will most likely use this method indirectly via Facade, and not directly
 * on View instances.
 *
 * @param {string} mediatorName
 *  The name of a Mediator
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#retreiveMediator
 */
View.prototype.retrieveMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName];
};

/**
 * Remove a Mediator from the View by its name. No action is taken if the View
 * does not have a Mediator with that name. Otherwise, the Mediators #onRemove
 * method is invoked and the Mediator is unregistered with the view.
 *
 * You will most likely use this method indirectly via Facade, and not directly
 * on View instances.
 *
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 * @see org.puremvc.js.multicore.patterns.facade.Facade#removeMediator
 * @see org.puremvc.js.multicore.patterns.mediator.Mediator#onRemove
 */
View.prototype.removeMediator = function(mediatorName)
{
    var mediator = this.mediatorMap[mediatorName];
    if(mediator)
    {
        // for every notification the mediator is interested in...
        var interests = mediator.listNotificationInterests();
        for(var i = 0; i < interests.length; i++)
        {
            // remove the observer linking the mediator to the notification
            // interest
            this.removeObserver(interests[i], mediator);
        }

        // remove the mediator from the map
        delete this.mediatorMap[mediatorName];

        // alert the mediator that it has been removed
        mediator.onRemove();
    }

    return mediator;
};

/**
 * Determine if a Mediator has been registered with this View
 *
 * @param {string} mediatorName
 *  The name of a Mediator
 * @return {boolean}
 *  True if the View has a Mediator with that name, otherwise false
 */
View.prototype.hasMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName] != null;
};

/**
 * Dispose of a View instance.
 *
 * @param {string} key
 * @return {void}
 */
View.removeView = function(key)
{
    delete View.instanceMap[key];
};

/**
 * The Views internal mapping of mediator names to mediator instances
 *
 * @type Array
 * @protected
 */
View.prototype.mediatorMap = null;

/**
 * The Views internal mapping of Notification names to Observer lists
 *
 * @type Array
 * @protected
 */
View.prototype.observerMap = null;

/**
 * The internal map used to store multiton View instances
 *
 * @type Array
 * @protected
 */
View.instanceMap = [];

/**
 * The Views internal multiton key.
 *
 * @type string
 * @protected
 */
View.prototype.multitonKey = null;

/**
 * The error message used if an attempt is made to instantiate View directly
 *
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
