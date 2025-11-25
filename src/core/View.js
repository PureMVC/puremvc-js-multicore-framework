/*
 *  View.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
 */

import { Observer } from "../patterns/observer/Observer.js";

/**
 * A Multiton `View` implementation.
 *
 * <P>In PureMVC, the `View` class assumes these responsibilities:</P>
 *
 * <UL>
 * <LI>Maintain a cache of `Mediator` instances.</LI>
 * <LI>Provide methods for registering, retrieving, and removing `Mediators`.</LI>
 * <LI>Notifying `Mediators` when they are registered or removed.</LI>
 * <LI>Managing the observer lists for each `Notification` in the application.</LI>
 * <LI>Providing a method for attaching `Observers` to a `Notification`'s observer list.</LI>
 * <LI>Providing a method for broadcasting a `Notification`.</LI>
 * <LI>Notifying the `Observers` of a given `Notification` when it broadcast.</LI>
 * </UL>
 *
 * @see Mediator Mediator
 * @see Observer Observer
 * @see Notification Notification
 *
 * @class View
 */
class View {
  /**
   * Constructor.
   *
   * <P>This `View` implementation is a Multiton,
   * so you should not call the constructor
   * directly, but instead call the static Multiton
   * Factory method `View.getInstance( multitonKey )`
   *
   * @constructor
   * @param {string} key
   *
   * @throws {Error} Error if instance for this Multiton key has already been constructed
   */
  constructor(key) {
    if (View.instanceMap.get(key) != null) throw new Error(View.MULTITON_MSG);
    /** @protected
     * @type {string} */
    this.multitonKey = key;
    View.instanceMap.set(this.multitonKey, this);
    /** @protected
     * @type {Map<string, Mediator>} */
    this.mediatorMap = new Map();
    /** @protected
     * @type {Map.<string, Array.<Observer>>} */
    this.observerMap = new Map();
    this.initializeView();
  }

  /**
   * <P>Initialize the Multiton View instance.</P>
   *
   * <P>Called automatically by the constructor, this
   * is your opportunity to initialize the Multiton
   * instance in your subclass without overriding the
   * constructor.</P>
   */
  initializeView() {}

  /**
   * View Multiton factory method.
   *
   * @static
   * @param {string} key
   * @param {function(string):View} factory
   * @returns {View} the Multiton instance of `View`
   */
  static getInstance(key, factory) {
    if (View.instanceMap == null)
      /** @static
       * @type {Map<string, View>} */
      View.instanceMap = new Map();
    if (View.instanceMap.get(key) == null)
      View.instanceMap.set(key, factory(key));
    return View.instanceMap.get(key);
  }

  /**
   * <P>Register an `Observer` to be notified
   * of `Notifications` with a given name.</P>
   *
   * @param {string} notificationName the name of the `Notifications` to notify this `Observer` of
   * @param {Observer} observer the `Observer` to register
   */
  registerObserver(notificationName, observer) {
    if (this.observerMap.get(notificationName) != null) {
      let observers = this.observerMap.get(notificationName);
      observers.push(observer);
    } else {
      this.observerMap.set(notificationName, new Array(observer));
    }
  }

  /**
   * <P>Notify the `Observers` for a particular `Notification`.</P>
   *
   * <P>All previously attached `Observers` for this `Notification`'s
   * list are notified and are passed a reference to the `Notification` in
   * the order in which they were registered.</P>
   *
   * @param {Notification} notification the `Notification` to notify `Observers` of.
   */
  notifyObservers(notification) {
    if (this.observerMap.has(notification.name)) {
      // Copy observers from reference array to working array,
      // since the reference array may change during the notification loop
      let observers = this.observerMap.get(notification.name).slice();

      // Notify Observers from the working array
      for (let i = 0; i < observers.length; i++) {
        observers[i].notifyObserver(notification);
      }
    }
  }

  /**
   * <P>Remove the observer for a given notifyContext from an observer list for a given Notification name.</P>
   *
   * @param {string} notificationName which observer list to remove from
   * @param {Object} notifyContext remove the observer with this object as its notifyContext
   */
  removeObserver(notificationName, notifyContext) {
    // the observer list for the notification under inspection
    let observers = this.observerMap.get(notificationName);

    // find the observer for the notifyContext
    for (let i = 0; i < observers.length; i++) {
      if (observers[i].compareNotifyContext(notifyContext) === true) {
        // there can only be one Observer for a given notifyContext
        // in any given Observer list, so remove it and break
        observers.splice(i, 1);
        break;
      }
    }

    // Also, when a Notification's Observer list length falls to
    // zero, delete the notification key from the observer map
    if (observers.length === 0) {
      this.observerMap.delete(notificationName);
    }
  }

  /**
   * Register a `Mediator` instance with the `View`.
   *
   * <P>Registers the `Mediator` so that it can be retrieved by name,
   * and further interrogates the `Mediator` for its
   * `Notification` interests.</P>
   *
   * <P>If the `Mediator` returns any `Notification`
   * names to be notified about, an `Observer` is created encapsulating
   * the `Mediator` instance's `handleNotification` method
   * and registering it as an `Observer` for all `Notifications` the
   * `Mediator` is interested in.</p>
   *
   * @param {Mediator} mediator a reference to the `Mediator` instance
   */
  registerMediator(mediator) {
    // do not allow re-registration (you must to removeMediator fist)
    if (this.mediatorMap.has(mediator.mediatorName) !== false) return;

    mediator.initializeNotifier(this.multitonKey);

    // Register the Mediator for retrieval by name
    this.mediatorMap.set(mediator.mediatorName, mediator);

    // Get Notification interests, if any.
    let interests = mediator.listNotificationInterests();

    // Register Mediator as an observer for each notification of interests
    if (interests.length > 0) {
      // Create Observer referencing this mediator's handleNotification method
      let observer = new Observer(
        mediator.handleNotification.bind(mediator),
        mediator,
      ); // check bind

      // Register Mediator as Observer for its list of Notification interests
      for (let i = 0; i < interests.length; i++) {
        this.registerObserver(interests[i], observer);
      }
    }

    // alert the mediator that it has been registered
    mediator.onRegister();
  }

  /**
   * Retrieve a `Mediator` from the `View`.
   *
   * @param {string} mediatorName the name of the `Mediator` instance to retrieve.
   * @returns {Mediator} the `Mediator` instance previously registered with the given `mediatorName`.
   */
  retrieveMediator(mediatorName) {
    return this.mediatorMap.get(mediatorName) || null;
  }

  /**
   * Remove a `Mediator` from the `View`.
   *
   * @param {string} mediatorName name of the `Mediator` instance to be removed.
   * @returns {Mediator} the `Mediator` that was removed from the `View`
   */
  removeMediator(mediatorName) {
    // Retrieve the named mediator
    let mediator = this.mediatorMap.get(mediatorName);

    if (mediator) {
      // for every notification this mediator is interested in...
      let interests = mediator.listNotificationInterests();
      for (let i = 0; i < interests.length; i++) {
        // remove the observer linking the mediator
        // to the notification interest
        this.removeObserver(interests[i], mediator);
      }

      // remove the mediator from the map
      this.mediatorMap.delete(mediatorName);

      // alert the mediator that it has been removed
      mediator.onRemove();
    }

    return mediator;
  }

  /**
   * Check if a Mediator is registered or not
   *
   * @param {string} mediatorName
   * @returns {boolean} whether a Mediator is registered with the given `mediatorName`.
   */
  hasMediator(mediatorName) {
    return this.mediatorMap.has(mediatorName);
  }

  /**
   * Remove a View instance
   *
   * @static
   * @param key multitonKey of View instance to remove
   */
  static removeView(key) {
    this.instanceMap.delete(key);
  }

  /**
   * Message Constants
   *
   * @static
   * @type {string}
   */
  static get MULTITON_MSG() {
    return "View instance for this Multiton key already constructed!";
  }
}
export { View };
