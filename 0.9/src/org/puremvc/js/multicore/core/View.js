/**
 * @fileOverview
 * @author David Foley
 * @exports View as org.puremvc.js.multicore.core.View
 */

/**
 * 
 * @param {string} key
 * @constructor
 * @see org.puremvc.js.multicore.core.View#getInstance
 * @see org.puremvc.js.multicore.patterns.IView
 */
function View (key)
{
    if (View.instanceMap[key] != null)
    {
        throw new Error(View.MULTITON_MSG);
    };
    
    this.multitonKey= key;
    View.instanceMap[this.multitonKey]= this;
    this.mediatorMap= [];
    this.observerMap= [];
    this.initializeView();
};

/**
 * @return {void}
 */
View.prototype.initializeView= function ()
{
    return;
};

/**
 * @static
 * @param {string} key
 * @return {org.puremvc.js.multicore.core.View}
 */
View.getInstance= function (key)
{
    if (View.instanceMap[key] == null)
    {
        View.instanceMap[key]= new View(key);
    };
    
    return View.instanceMap[key];
};


/**
 * @param {string} notificationName
 * @param {org.puremvc.js.multicore.patterns.observer.Observer}
 * @return {void}
 */
View.prototype.registerObserver= function (notificationName, observer)
{
    if (this.observerMap[notificationName] != null)
    {
        this.observerMap[notificationName].push(observer);
    }
    else
    {
        this.observerMap[notificationName]= [observer];
    }
};

/**
 * @param {Object} notification
 * @return {void}
 */
View.prototype.notifyObservers= function (notification)
{
    // SIC
    if (this.observerMap[notification.getName()] != null)
    {
        var observers_ref= this.observerMap[notification.getName()]
        ,   observers= []
        ,   observer
        
        for (var i= 0; i < observers_ref.length; i++)
        {
            observer= observers_ref[i];
            observers.push(observer);
        }
        
        for (var i= 0; i < observers.length; i++)
        {
            observer= observers[i];
            observer.notifyObserver(notification);
        }
    }
};

/**
 * @param {string} notificationName
 * @param {Object} notifyContext
 * @return {void}
 */
View.prototype.removeObserver= function (notificationName, notifyContext)
{
    // SIC
    var observers= this.observerMap[notificationName];
    for (var i= 0; i < observers.length; i++)
    {
        if (observers[i].compareNotifyContext(notifyContext) == true)
        {
            observers.splice(i, 1);
            break;
        }
    }
    
    if (observers.length == 0)
    {
        delete this.observerMap[notificationName];
    }
};

/**
 * @return {void}
 */
View.prototype.registerMediator= function (mediator)
{
    if (this.mediatorMap[mediator.getMediatorName()] != null)
    {
        return;
    }

    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()]= mediator;
    
    // get notification interests if any
    var interests= mediator.listNotificationInterests();
    
    // register mediator as an observer for each notification
    if (interests.length > 0)
    {
        // create observer referencing this mediators handleNotification method
        var observer= new Observer(mediator.handleNotification, mediator);
        for (var i= 0; i < interests.length; i++)
        {
            this.registerObserver(interests[i], observer);
        }
    }
    
    mediator.onRegister();
}

/**
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 */
View.prototype.retrieveMediator= function (mediatorName)
{
    return this.mediatorMap[mediatorName];    
};

/**
 * @return {org.puremvc.js.multicore.patterns.mediator.Mediator|null}
 */
View.prototype.removeMediator= function (mediatorName)
{
    var mediator= this.mediatorMap[mediatorName];
    if (mediator)
    {
        // for every notification the mediator is interested in...
        var interests= mediator.listNotificationInterests();
        for (var i= 0; i < interests.length; i++)
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
 * 
 * @param {string} mediatorName
 * @return {boolean}
 */
View.prototype.hasMediator= function (mediatorName)
{
    return this.mediatorMap[mediatorName] != null;
};

/**
 * Remove an IView instance.
 * 
 * @param {string} key
 * @return {void}
 */
View.removeView= function (key)
{
    delete View.instanceMap[key];    
};

/**
 * Mapping of mediator names to mediator instances
 * 
 * @type Array
 * @protected
 */
View.prototype.mediatorMap= null;

/**
 * Mapping of Notification names to Observer lists
 * 
 * @type Array
 * @protected
 */
View.prototype.observerMap= null;

/**
 * Singleton instance
 * 
 * @type Array
 * @protected
 */
View.instanceMap= [];

/**
 * The multiton key for this Core
 * 
 * @type string
 * @protected
 */
View.prototype.multitonKey= null;

/**
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG= "View instance for this Multiton key already constructed!";
