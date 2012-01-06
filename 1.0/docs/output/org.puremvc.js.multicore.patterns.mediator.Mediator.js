Ext.data.JsonP.org_puremvc_js_multicore_patterns_mediator_Mediator({"requires":[],"aliases":{},"component":false,"inheritable":false,"subclasses":[],"alternateClassNames":[],"mixedInto":[],"tagname":"class","extends":"org.puremvc.js.multicore.patterns.observer.Notifier","uses":[],"statics":{"property":[{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"property","name":"NAME","id":"static-property-NAME","meta":{"static":true}}],"css_var":[],"css_mixin":[],"cfg":[],"method":[],"event":[]},"files":[{"href":"Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator","filename":"Mediator.js"}],"allMixins":[],"singleton":false,"code_type":"function","members":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"constructor","id":"method-constructor","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.observer.Notifier","tagname":"method","name":"getFacade","id":"method-getFacade","meta":{"protected":true}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"getMediatorName","id":"method-getMediatorName","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"getViewComponent","id":"method-getViewComponent","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"handleNotification","id":"method-handleNotification","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.observer.Notifier","tagname":"method","name":"initializeNotifier","id":"method-initializeNotifier","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"listNotificationInterests","id":"method-listNotificationInterests","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"onRegister","id":"method-onRegister","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"onRemove","id":"method-onRemove","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.observer.Notifier","tagname":"method","name":"sendNotification","id":"method-sendNotification","meta":{}},{"owner":"org.puremvc.js.multicore.patterns.mediator.Mediator","tagname":"method","name":"setViewComponent","id":"method-setViewComponent","meta":{}}],"event":[]},"superclasses":["org.puremvc.js.multicore.patterns.observer.Notifier","org.puremvc.js.multicore.patterns.mediator.Mediator"],"private":false,"name":"org.puremvc.js.multicore.patterns.mediator.Mediator","mixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier' rel='org.puremvc.js.multicore.patterns.observer.Notifier' class='docClass'>org.puremvc.js.multicore.patterns.observer.Notifier</a><div class='subclass '><strong>org.puremvc.js.multicore.patterns.mediator.Mediator</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator' target='_blank'>Mediator.js</a></div></pre><div class='doc-contents'><p>A base Mediator implementation.</p>\n\n<p>In PureMVC, Mediator classes are used to mediate communication between a view\ncomponent and the rest of the application.</p>\n\n<p>A Mediator should listen to its view components for events, and handle them\nby sending notifications (to be handled by other Mediators,\n<a href=\"#!/api/org.puremvc.js.multicore.patterns.command.SimpleCommand\" rel=\"org.puremvc.js.multicore.patterns.command.SimpleCommand\" class=\"docClass\">SimpleCommands</a>\nor\n<a href=\"#!/api/org.puremvc.js.multicore.patterns.command.MacroCommand\" rel=\"org.puremvc.js.multicore.patterns.command.MacroCommand\" class=\"docClass\">MacroCommands</a>)\nor passing data from the view component directly to a\n<a href=\"#!/api/org.puremvc.js.multicore.patterns.proxy.Proxy\" rel=\"org.puremvc.js.multicore.patterns.proxy.Proxy\" class=\"docClass\">Proxy</a>, such as submitting\nthe contents of a form to a service.</p>\n\n<p>Mediators should not perform business logic, maintain state or other\ninformation for its view component, or break the encapsulation of the view\ncomponent by manipulating the view component's children. It should only call\nmethods or set properties on the view component.</p>\n\n<p>The view component should encapsulate its own behavior and implementation by\nexposing methods and properties that the Mediator can call without having to\nknow about the view component's children.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Properties</h3><div id='static-property-NAME' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-static-property-NAME' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-static-property-NAME' class='name expandable'>NAME</a><span> : string</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The name of the Mediator. ...</div><div class='long'><p>The name of the Mediator.</p>\n\n<p>Typically, a Mediator will be written to serve one specific control or group\nof controls and so, will not have a need to be dynamically named.</p>\n<p>Defaults to: <code>&quot;Mediator&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-constructor' class='name expandable'>org.puremvc.js.multicore.patterns.mediator.Mediator</a>( <span class='pre'>[string mediatorName], [Object viewComponent]</span> ) : Object</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mediatorName</span> : string (optional)<div class='sub-desc'><p>The Mediators name. The Mediators static <a href=\"#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-static-property-NAME\" rel=\"org.puremvc.js.multicore.patterns.mediator.Mediator-static-property-NAME\" class=\"docClass\">NAME</a> value is used by default</p>\n</div></li><li><span class='pre'>viewComponent</span> : Object (optional)<div class='sub-desc'><p>The Mediators <a href=\"#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-setViewComponent\" rel=\"org.puremvc.js.multicore.patterns.mediator.Mediator-method-setViewComponent\" class=\"docClass\">viewComponent</a>.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getFacade' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier' rel='org.puremvc.js.multicore.patterns.observer.Notifier' class='defined-in docClass'>org.puremvc.js.multicore.patterns.observer.Notifier</a><br/><a href='source/Notifier.html#org-puremvc-js-multicore-patterns-observer-Notifier-method-getFacade' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier-method-getFacade' class='name expandable'>getFacade</a>( <span class='pre'></span> ) : <a href=\"#!/api/org.puremvc.js.multicore.patterns.facade.Facade\" rel=\"org.puremvc.js.multicore.patterns.facade.Facade\" class=\"docClass\">org.puremvc.js.multicore.patterns.facade.Facade</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Retrieve the Multiton Facade instance ...</div><div class='long'><p>Retrieve the Multiton Facade instance</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/org.puremvc.js.multicore.patterns.facade.Facade\" rel=\"org.puremvc.js.multicore.patterns.facade.Facade\" class=\"docClass\">org.puremvc.js.multicore.patterns.facade.Facade</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getMediatorName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-getMediatorName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-getMediatorName' class='name expandable'>getMediatorName</a>( <span class='pre'></span> ) : string</div><div class='description'><div class='short'>Get the name of the Mediator ...</div><div class='long'><p>Get the name of the Mediator</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>string</span><div class='sub-desc'><p>The Mediator name</p>\n</div></li></ul></div></div></div><div id='method-getViewComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-getViewComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-getViewComponent' class='name expandable'>getViewComponent</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Get the Mediators view component. ...</div><div class='long'><p>Get the Mediators view component.</p>\n\n<p>Additionally, an optional explicit getter can be\nbe defined in the subclass that defines the\nview components, providing a more semantic interface\nto the Mediator.</p>\n\n<p>This is different from the AS3 implementation in\nthe sense that no casting is required from the\nobject supplied as the view component.</p>\n\n<pre><code>MyMediator.prototype.getComboBox= function ()\n{\n    return this.viewComponent;  \n}\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The view component</p>\n</div></li></ul></div></div></div><div id='method-handleNotification' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-handleNotification' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-handleNotification' class='name expandable'>handleNotification</a>( <span class='pre'><a href=\"#!/api/org.puremvc.js.multicore.patterns.observer.Notification\" rel=\"org.puremvc.js.multicore.patterns.observer.Notification\" class=\"docClass\">org.puremvc.js.multicore.patterns.observer.Notification</a> notification</span> ) : void</div><div class='description'><div class='short'>Handle Notifications. ...</div><div class='long'><p>Handle Notifications.</p>\n\n<p>Typically this will be handled in a switch statement\nwith one 'case' entry per Notification the Mediator\nis interested in</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>notification</span> : <a href=\"#!/api/org.puremvc.js.multicore.patterns.observer.Notification\" rel=\"org.puremvc.js.multicore.patterns.observer.Notification\" class=\"docClass\">org.puremvc.js.multicore.patterns.observer.Notification</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initializeNotifier' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier' rel='org.puremvc.js.multicore.patterns.observer.Notifier' class='defined-in docClass'>org.puremvc.js.multicore.patterns.observer.Notifier</a><br/><a href='source/Notifier.html#org-puremvc-js-multicore-patterns-observer-Notifier-method-initializeNotifier' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier-method-initializeNotifier' class='name expandable'>initializeNotifier</a>( <span class='pre'>string key</span> ) : void</div><div class='description'><div class='short'>Initialize this Notifier instance. ...</div><div class='long'><p>Initialize this Notifier instance.</p>\n\n<p>This is how a Notifier gets its multitonKey.\nCalls to <a href=\"#!/api/org.puremvc.js.multicore.patterns.observer.Notifier-method-sendNotification\" rel=\"org.puremvc.js.multicore.patterns.observer.Notifier-method-sendNotification\" class=\"docClass\">sendNotification</a> or to access the\nfacade will fail until after this method\nhas been called.</p>\n\n<p>Mediators, Commands or Proxies may override\nthis method in order to send notifications\nor access the Multiton Facade instance as\nsoon as possible. They CANNOT access the facade\nin their constructors, since this method will not\nyet have been called.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : string<div class='sub-desc'><p>The Notifiers multiton key;</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-listNotificationInterests' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-listNotificationInterests' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-listNotificationInterests' class='name expandable'>listNotificationInterests</a>( <span class='pre'></span> ) : Array.<string></div><div class='description'><div class='short'>List the Notification names this Mediator is interested\nin being notified of. ...</div><div class='long'><p>List the Notification names this Mediator is interested\nin being notified of.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array.<string></span><div class='sub-desc'><p>The list of Notification names.</p>\n</div></li></ul></div></div></div><div id='method-onRegister' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-onRegister' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-onRegister' class='name expandable'>onRegister</a>( <span class='pre'></span> ) : void</div><div class='description'><div class='short'>Called by the View when the Mediator is registered ...</div><div class='long'><p>Called by the View when the Mediator is registered</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onRemove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-onRemove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-onRemove' class='name expandable'>onRemove</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Called by the View when the Mediator is removed ...</div><div class='long'><p>Called by the View when the Mediator is removed</p>\n</div></div></div><div id='method-sendNotification' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier' rel='org.puremvc.js.multicore.patterns.observer.Notifier' class='defined-in docClass'>org.puremvc.js.multicore.patterns.observer.Notifier</a><br/><a href='source/Notifier.html#org-puremvc-js-multicore-patterns-observer-Notifier-method-sendNotification' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.observer.Notifier-method-sendNotification' class='name expandable'>sendNotification</a>( <span class='pre'>string notificationName, [Object body], [string type]</span> ) : void</div><div class='description'><div class='short'>Create and send a Notification. ...</div><div class='long'><p>Create and send a Notification.</p>\n\n<p>Keeps us from having to construct new Notification instances in our\nimplementation code.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>notificationName</span> : string<div class='sub-desc'><p>A notification name</p>\n</div></li><li><span class='pre'>body</span> : Object (optional)<div class='sub-desc'><p>The body of the notification</p>\n</div></li><li><span class='pre'>type</span> : string (optional)<div class='sub-desc'><p>The notification type</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setViewComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='org.puremvc.js.multicore.patterns.mediator.Mediator'>org.puremvc.js.multicore.patterns.mediator.Mediator</span><br/><a href='source/Mediator.html#org-puremvc-js-multicore-patterns-mediator-Mediator-method-setViewComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/org.puremvc.js.multicore.patterns.mediator.Mediator-method-setViewComponent' class='name expandable'>setViewComponent</a>( <span class='pre'>Object the</span> ) : void</div><div class='description'><div class='short'>Set the Mediators view component. ...</div><div class='long'><p>Set the Mediators view component. This could\nbe a HTMLElement, a bespoke UiComponent wrapper\nclass, a MooTools Element, a jQuery result or a\ncss selector, depending on which DOM abstraction\nlibrary you are using.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>the</span> : Object<div class='sub-desc'><p>view component</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","id":"class-org.puremvc.js.multicore.patterns.mediator.Mediator","meta":{},"inheritdoc":null});