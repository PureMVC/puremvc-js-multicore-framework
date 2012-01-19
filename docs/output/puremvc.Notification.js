Ext.data.JsonP.puremvc_Notification({"requires":[],"aliases":{},"component":false,"inheritable":false,"subclasses":[],"alternateClassNames":[],"mixedInto":[],"tagname":"class","extends":null,"uses":[],"statics":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[],"event":[]},"files":[{"href":"Notification.html#puremvc-Notification","filename":"Notification.js"}],"allMixins":[],"singleton":false,"code_type":"function","members":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[{"owner":"puremvc.Notification","tagname":"method","name":"constructor","id":"method-constructor","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"getBody","id":"method-getBody","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"getName","id":"method-getName","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"getType","id":"method-getType","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"setBody","id":"method-setBody","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"setType","id":"method-setType","meta":{}},{"owner":"puremvc.Notification","tagname":"method","name":"toString","id":"method-toString","meta":{}}],"event":[]},"superclasses":[],"private":false,"name":"puremvc.Notification","mixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Notification.html#puremvc-Notification' target='_blank'>Notification.js</a></div></pre><div class='doc-contents'><p>A base Notification implementation.</p>\n\n<p>PureMVC does not rely upon underlying event models such as the one provided\nwith the DOM or other browser centric W3C event models.</p>\n\n<p>The Observer Pattern as implemented within PureMVC exists to support\nevent-driven communication between the application and the actors of the MVC\ntriad.</p>\n\n<p>Notifications are not meant to be a replacement for events in the browser.\nGenerally, Mediator implementors place event listeners on their view\ncomponents, which they then handle in the usual way. This may lead to the\nbroadcast of Notifications to trigger commands or to communicate with other\nMediators. <a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">Proxy</a>,\n<a href=\"#!/api/puremvc.SimpleCommand\" rel=\"puremvc.SimpleCommand\" class=\"docClass\">SimpleCommand</a>\nand <a href=\"#!/api/puremvc.MacroCommand\" rel=\"puremvc.MacroCommand\" class=\"docClass\">MacroCommand</a>\ninstances communicate with each other and\n<a href=\"#!/api/puremvc.Mediator\" rel=\"puremvc.Mediator\" class=\"docClass\">Mediator</a>s\nby broadcasting Notifications.</p>\n\n<p>A key difference between browser events and PureMVC Notifications is that\nevents follow the 'Chain of Responsibility' pattern, 'bubbling' up the\ndisplay hierarchy until some parent component handles the event, while\nPureMVC Notification follow a 'Publish/Subscribe' pattern. PureMVC classes\nneed not be related to each other in a parent/child relationship in order to\ncommunicate with one another using Notifications.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/puremvc.Notification-method-constructor' class='name expandable'>puremvc.Notification</a>( <span class='pre'>string name, [Object body], [Object type]</span> ) : Object</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : string<div class='sub-desc'><p>The Notification name</p>\n</div></li><li><span class='pre'>body</span> : Object (optional)<div class='sub-desc'><p>The Notification body</p>\n</div></li><li><span class='pre'>type</span> : Object (optional)<div class='sub-desc'><p>The Notification type</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getBody' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-getBody' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-getBody' class='name expandable'>getBody</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Get the Notification body. ...</div><div class='long'><p>Get the Notification body.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-getName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-getName' class='name expandable'>getName</a>( <span class='pre'></span> ) : string</div><div class='description'><div class='short'>Get the name of the Notification instance ...</div><div class='long'><p>Get the name of the Notification instance</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>string</span><div class='sub-desc'><p>The name of the Notification instance</p>\n</div></li></ul></div></div></div><div id='method-getType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-getType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-getType' class='name expandable'>getType</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Get the type of the Notification instance. ...</div><div class='long'><p>Get the type of the Notification instance.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setBody' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-setBody' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-setBody' class='name expandable'>setBody</a>( <span class='pre'>Object body</span> ) : void</div><div class='description'><div class='short'>Set this Notifications body. ...</div><div class='long'><p>Set this Notifications body.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>body</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-setType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-setType' class='name expandable'>setType</a>( <span class='pre'>Object type</span> ) : void</div><div class='description'><div class='short'>Set the type of the Notification instance. ...</div><div class='long'><p>Set the type of the Notification instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-toString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Notification'>puremvc.Notification</span><br/><a href='source/Notification.html#puremvc-Notification-method-toString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Notification-method-toString' class='name expandable'>toString</a>( <span class='pre'></span> ) : string</div><div class='description'><div class='short'>Get a string representation of the Notification instance ...</div><div class='long'><p>Get a string representation of the Notification instance</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>string</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","id":"class-puremvc.Notification","meta":{},"inheritdoc":null});