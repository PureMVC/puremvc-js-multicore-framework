/**
 * @lends Puremvc.core.Controller.prototype
 */
Ext.namespace('Puremvc.core');
Puremvc.core.Controller = Ext.extend(Object, {
  /**
   * The <code>View</code> singleton.
   * @type Puremvc.core.View
   * @private
   */
  view: null,

  /**
   * Mapping of <code>Notification<code> names to
   * <code>Command</code> class references.
   * @type Object
   */
  commandMap: {},

  /**
   * @class <P>The <code>Controller</code> class for PureMVC.</P>
   * <P>A singleton <code>Controller</code> implementation.</P>
   * <P>
   * In PureMVC, the <code>Controller</code> class follows the
   * 'Command and Controller' strategy, and assumes these
   * responsibilities:
   * <UL>
   * <LI>Remembering which <code>SimpleCommand</code>s
   * or <code>MacroCommand</code>s
   * are intended to handle which <code>Notification</code>s.</LI>
   * <LI>Registering itself as an <code>Observer</code> with
   * the <code>View</code> for each <code>Notification</code>
   * that it has a <code>SimpleCommand</code>
   * or <code>MacroCommand</code> mapping for.</LI>
   * <LI>Creating a new instance of the proper <code>SimpleCommand</code>
   * or <code>MacroCommand</code>
   * to handle a given <code>Notification</code> when notified by the <code>View</code>.</LI>
   * <LI>Calling the <code>SimpleCommand</code>'s
   * or <code>MacroCommand</code>'s  <code>execute</code>
   * method, passing in the <code>Notification</code>.</LI>
   * </UL>
   *
   * <P>
   * Your application must register <code>ICommand</code>s with the
   * <code>Controller</code>.</P>
   * <P>
   * The simplest way is to subclass </code>Facade</code>,
   * and use its <code>initializeController</code> method to add your
   * registrations.</P>
   *
   * @see Puremvc.core.View
   * @see Puremvc.patterns.Observer
   * @see Puremvc.patterns.Notification
   * @see Puremvc.patterns.SimpleCommand
   * @see Puremvc.patterns.MacroCommand
   *
   * @author Justin Wilaby
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    if (Puremvc.core.Controller._instance != null) {
      throw Error(Puremvc.core.Controller._SINGLETON_MSG);
    }
    this.initializeController();
    Puremvc.core.Controller._instance = this;
  },
  
  /**
   * Called automatically by the constructor.
   * Retains a reference to the <code>View</code> singleton.
   */
  initializeController: function() {
    this.view = Puremvc.core.View.getInstance();
  },

  /**
   * If a <code>SimpleCommand</code> or <code>MacroCommand</code>
   * has previously been registered to handle the given
   * <code>Notification</code>, then it is executed.
   *
   * @param {Puremvc.patterns.Notification} note a <code>Notification</code>.
   */
  executeCommand: function(note /* Notification */) {
    var commandClassRef = this.commandMap[note.getName()];
    if (commandClassRef) {
      var command = new commandClassRef();
      command.execute(note);
    }
  },

  /**
   * Register a particular <code>SimpleCommand</code> or
   * <code>MacroCommand</code> class as the handler
   * for a particular <code>Notification</code>.
   *
   * <P>
   * If a <code>Command</code> has already been registered to
   * handle <code>Notification</code>s with this name, it is no longer
   * used, the new <code>Command</code> is used instead.</P>
   *
   * The <code>Observer</code> for the new <code>Command</command> is only created if this is the
   * first time a <code>Command</code> has been regisered for this <code>Notification</code> name.
   *
   * @param {String} notificationName the name of the <code>Notification</code>.
   * @param {Class} commandClassRef the <code>Class</code> of the <code>Command</code>.
   */
  registerCommand: function(notificationName /* String */, commandClassRef /* Class */) {
    if (!this.commandMap[notificationName]) {
      this.view.registerObserver(notificationName, new Puremvc.patterns.Observer(this.executeCommand, this));
    }
    this.commandMap[notificationName] = commandClassRef;
  },

  /**
   * Check if a <code>Command</code> is registered for a given <code>Notification</code>.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to verify the existence of its registration.
   * 
   * @return true if a <code>Command</code> is currently registered for the given <i>notificationName</i>, otherwise false.
   * @type Boolean
   */
  hasCommand: function(notificationName /* String */) {
    return this.commandMap[notificationName] != null;
  },

  /**
   * Remove a previously registered <code>SimpleCommand</code>
   * or <code>MacroCommand</code> to <code>Notification</code> mapping.
   *
   * @param {String} notificationName the name of the <code>Notification</code> to remove the
   * <code>SimpleCommand</code> or <code>MacroCommand</code> mapping for.
   */
  removeCommand: function(notificationName /* String */) {
    if (this.hasCommand(notificationName)) {
      this.view.removeObserver(notificationName, this);
      delete this.commandMap[notificationName];
    }
  }
});

Ext.apply(Puremvc.core.Controller,
/** @lends Puremvc.core.Controller# */
{
  /**
   * @constant
   * @memberof Puremvc.core.Controller
   * @private
   */
  _SINGLETON_MSG: "Controller Singleton already constructed!",

  /**
   * @memberof Puremvc.core.Controller
   * @private
   */
  _instance: new Puremvc.core.Controller(),

  /**
   * Retrieve the singleton instance of the <code>Controller</code>.
   * @memberof Puremvc.core.Controller
   */
  getInstance: function() {
    return Puremvc.core.Controller._instance;
  }
});
