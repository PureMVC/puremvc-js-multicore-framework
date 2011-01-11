/**
 * @lends Puremvc.core.View.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.View = Ext.extend(Object, {
  /**
   * @private
   *
   * Mapping of <code>Mediator</code> names to <code>Mediator</code>
   * instances.
   *
   * @type Object
   */
  mediatorMap: {},

  /**
   * @private
   * 
   * Mapping of <code>Notification</code> names to
   * <code>Observers</code> lists.
   *
   * @type Object
   */
  observerMap: {},

  /**
   * @class <P>The <code>View</code> class in PureMVC.<p>
   *  A singleton <code>View</code> implementation. In PureMVC, the
   *  <code>View</code> class assumes these responsibilities:
   *  <UL>
   *  <LI>Maintain a cache of <code>Mediator</code> instances.</LI>
   *  <LI>Provide methods for registering, retrieving, and removing
   *  <code>IMediator</code>s.</LI>
   *  <LI>Notifiying <code>Mediator</code>s when they are registered or
   *  removed.</LI>
   *  <LI>Managing the <code>Observer</code> lists for each <code>Notification</code>
   *  in the application.</LI>
   *  <LI>Providing a method for attaching <code>Observer</code>s to an
   *  <code>INotification</code>'s <code>Observer</code> list.</LI>
   *  <LI>Providing a method for broadcasting a <code>Notification</code>.</LI>
   *  <LI>Notifying the <code>Observer</code>s of a given
   *  <code>Notification</code> when it broadcasts.</LI>
   *  </UL>
   *
   * @see Puremvc.patterns.Mediator
   * @see Puremvc.patterns.Observer
   * @see Puremvc.patterns.Notification
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.View._instance != null) {
      throw Error(Puremvc.core.View._SINGLETON_MSG);
    }
    this.initializeView();
    Puremvc.core.View._instance = this;
  },
  
  /**
   * Initialize the singleton <code>View</code> instance.
   *
   * <P>
   * Called automatically by the constructor. This
   * is the opportunity to initialize the singleton
   * instance in a subclass without overriding the
   * constructor.</P>
   */
  initializeView: function() {},

  /**
   * Register an <code>Observer</code> to be notified of
   * <code>Notifications</code> with a given name.
   *
   * @param {String} notificationName The name of the <code>Notification</code>s to
   * notify this <code>Observer</code> of.
   * @param {Puremvc.patterns.Observer} observer The <code>Observer</code> to register.
   */
  registerObserver: function(notificationName /* String */, observer /* Observer */) {
    var observers = this.observerMap[notificationName];
    if (observers) {
      observers.push(observer);
    }
    else {
      this.observerMap[notificationName] = [observer];
    }
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
   * </P>
   *
   * @param {Puremvc.patterns.Notification}
   *          notification The <code>Notification</code> to notify
   *          <code>Observer</code>s of.
   */
  notifyObservers: function(notification /* Notification */) {
    var name = notification.getName();
    if (this.observerMap[name] != null) {
      // Copy the array.
      var observers = this.observerMap[name].concat();
      var len = observers.length;
      for (var i = 0; i < len; i++) {
        var observer = observers[i];
        observer.notifyObserver(notification);
      }
    }
  },

  /**
   * Remove the <code>Observer</code> for a given <i>notifyContext</i> from an <code>Observer</code>
   * list for a given <code>Notification</code> name.
   *
   * @param {String}
   *          notificationName which <code>Observer</code> list to remove from.
   * @param {Object}
   *          notifyContext remove the <code>Observer</code> with this object as its
   *          <i>notifyContext</i>.
   */
  removeObserver: function(notificationName /* String */, notifyContext /* Object */) {
    var observers = this.observerMap[notificationName];
    var i = observers.length;
    while (i--) {
      var observer = observers[i];
      if (observer.compareNotifyContext(notifyContext)) {
        observers.splice(i, 1);
        break;
      }
    }
    // Remove empty observer lists.
    if (!observers.length) {
      delete this.observerMap[notificationName];
    }
  },

  /**
   * Register an <code>IMediator</code> instance with the <code>View</code>.
   *
   * <P>
   * Registers the <code>IMediator</code> so that it can be retrieved by name,
   * and further interrogates the <code>IMediator</code> for its
   * <code>INotification</code> interests.
   * </P>
   * <P>
   * If the <code>IMediator</code> returns any <code>INotification</code>
   * names to be notified about, an <code>Observer</code> is created to
   * encapsulate the <code>IMediator</code> instance's
   * <code>handleNotification</code> method and register it as an
   * <code>Observer</code> for all <code>INotification</code>s the
   * <code>IMediator</code> is interested in.
   * </p>
   *
   * @param {Puremvc.patterns.Mediator}
   *          mediator a reference to the <code>Mediator</code> instance.
   */
  registerMediator: function(mediator /* Mediator */) {
    var name = mediator.getMediatorName();
    if (!this.mediatorMap[name]) {
      this.mediatorMap[name] = mediator;
      var interests = mediator.listNotificationInterests();
      var len = interests.length;
      if (len) {
        var observer = new Puremvc.patterns.Observer(mediator.handleNotification, mediator);
        for (var i = 0; i < len; i++) {
          this.registerObserver(interests[i], observer);
        }
      }
      mediator.onRegister();
    }
  },

  /**
   * Retrieve a <code>Mediator</code> from the <code>View</code>.
   *
   * @param {String}
   *          mediatorName the name of the <code>IMediator</code> instance to
   *          retrieve.
   * @return the <code>Mediator</code> instance previously
   *         registered with the given <i>mediatorName</i>.
   * @type Puremvc.patterns.Mediator
   */
  retrieveMediator: function(mediatorName /* String */) {
    return this.mediatorMap[mediatorName];
  },

  /**
   * Remove a <code>Mediator</code> from the <code>View</code>.
   *
   * @param {String}
   *          mediatorName name of the <code>IMediator</code> instance to be
   *          removed.
   * @return the <code>Mediator</code> that was removed from the <code>View</code>.
   * @type Puremvc.patterns.Mediator
   */
  removeMediator: function(mediatorName /* String */) {
    var mediator = this.mediatorMap[mediatorName];
    if (mediator) {
      var interests = mediator.listNotificationInterests();
      var i = interests.length;
      while (i--) {
        this.removeObserver(interests[i], mediator);
      }

      delete this.mediatorMap[mediatorName];
      mediator.onRemove();
    }
    return mediator;
  },

  /**
   * Check if a <code>Mediator</code> is registered or not.
   *
   * @param {String}
   *          mediatorName name of the <code>IMediator</code> instance to verify
   * the existence of its registration.
   * @return true if a <code>Mediator</code> is registered with the given
   *         <i>mediatorName</i>, false otherwise.
   * @type Boolean
   */
  hasMediator: function(mediatorName /* String */) {
    return this.mediatorMap[mediatorName] != null;
  }
});

Ext.apply(Puremvc.core.View,
/** @lends Puremvc.core.View# */
{
  /**
   * @constant
   * @memberof Puremvc.core.View
   * @private
   */
  _SINGLETON_MSG: "View Singleton already constructed!",

  /**
   * @memberof Puremvc.core.View
   * @private
   */
  _instance: new Puremvc.core.View(),

  /**
   * Retrieve the singleton instance of the <code>View</code>.
   * @memberof Puremvc.core.View
   */
  getInstance: function() {
    return Puremvc.core.View._instance;
  }
});
