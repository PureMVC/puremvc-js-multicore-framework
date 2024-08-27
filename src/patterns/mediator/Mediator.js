/*
 *  Mediator.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import {Notifier} from "../observer/Notifier.js";

/**
 * A base `Mediator` implementation.
 *
 * @see View View
 *
 * @class Mediator
 */
class Mediator extends Notifier {

    /**
     * Constructor.
     *
     * @constructor
     * @param {string | null} [mediatorName=null]
     * @param {Object | null} [viewComponent=null]
     */
    constructor(mediatorName = null, viewComponent = null) {
        super();
        this._mediatorName = mediatorName || Mediator.NAME;
        this._viewComponent = viewComponent;
    }

    /**
     * Called by the View when the Mediator is registered
     */
    onRegister() {

    }

    /**
     * Called by the View when the Mediator is removed
     */
    onRemove() {

    }

    /**
     * List the `Notification` names this
     * `Mediator` is interested in being notified of.
     *
     * @returns {string[]}
     */
    listNotificationInterests() {
        return [];
    }

    /**
     * Handle `Notification`s.
     *
     * <P>
     * Typically this will be handled in a switch statement,
     * with one 'case' entry per `Notification`
     * the `Mediator` is interested in.
     *
     * @param {Notification} notification
     */
    handleNotification(notification) {

    }

    /**
     * the mediator name
     *
     * @returns {string}
     */
    get mediatorName() {
        return this._mediatorName;
    }

    /**
     * Get the `Mediator`'s view component.
     *
     * <P>
     * Additionally, an implicit getter will usually
     * be defined in the subclass that casts the view
     * object to a type, like this:</P>
     *
     * @returns {Object | null}
     */
    get viewComponent() {
        return this._viewComponent;
    }

    /**
     * Set the `Mediator`'s view component.
     *
     * @param {Object} viewComponent
     */
    set viewComponent(viewComponent) {
        this._viewComponent = viewComponent;
    }

    /**
     * The name of the `Mediator`.
     *
     * <P>Typically, a `Mediator` will be written to serve
     * one specific control or group controls and so,
     * will not have a need to be dynamically named.</P>
     *
     * @static
     * @returns {string}
     */
    static get NAME() { return "Mediator" }
}
export { Mediator }
