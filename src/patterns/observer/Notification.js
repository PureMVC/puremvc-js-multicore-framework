/*
 *  Notification.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
 */

/**
 * A base `Notification` implementation.
 *
 * <P>PureMVC does not rely upon underlying event models such
 * as the one provided with Flash, and ActionScript 3 does
 * not have an inherent event model.</P>
 *
 * <P>The Observer Pattern as implemented within PureMVC exists
 * to support event-driven communication between the
 * application and the actors of the MVC triad.</P>
 *
 * <P>Notifications are not meant to be a replacement for Events
 * in Flex/Flash/Apollo. Generally, `Mediator` implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of `Notification`s to
 * trigger `Command`s or to communicate with other `Mediators`. `Proxy` and `Command`
 * instances communicate with each other and `Mediator`s
 * by broadcasting `Notification`s.</P>
 *
 * <P>A key difference between Flash `Event`s and PureMVC
 * `Notification`s is that `Event`s follow the
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy
 * until some parent component handles the `Event`, while
 * PureMVC `Notification`s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a
 * parent/child relationship in order to communicate with one another
 * using `Notification`s.</P>
 *
 * @class Notification
 */
class Notification {
  /**
   * Constructor.
   *
   * @constructor
   * @param {string} name - The name of the notification.
   * @param {Object|null} [body=null] - The body of the notification, defaults to `null`.
   * @param {string} [type=""] - The type of the notification, defaults to an empty string.
   */
  constructor(name, body = null, type = "") {
    this._name = name;
    this._body = body;
    this._type = type;
  }

  /**
   * Get the name of the `Notification` instance.
   *
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Get the body of the `Notification` instance.
   *
   * @returns {Object | null}
   */
  get body() {
    return this._body;
  }

  /**
   * Set the body of the `Notification` instance.
   *
   * @param {Object|null} body
   */
  set body(body) {
    this._body = body;
  }

  /**
   * Get the type of the `Notification` instance.
   *
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Set the type of the `Notification` instance.
   *
   * @param {string} type
   */
  set type(type) {
    this._type = type;
  }

  /**
   * Get the string representation of the `Notification` instance.
   *
   * @returns {string}
   */
  toString() {
    let str = "Notification Name: " + this.name;
    str += "\nBody:" + (this.body == null ? "null" : this.body.toString());
    str += "\nType:" + (this.type == null ? "null" : this.type);
    return str;
  }
}
export { Notification };
