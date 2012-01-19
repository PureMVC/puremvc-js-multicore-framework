Ext.data.JsonP.puremvc_Model({"requires":[],"aliases":{},"component":false,"inheritable":false,"subclasses":[],"alternateClassNames":[],"mixedInto":[],"tagname":"class","extends":null,"uses":[],"statics":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[{"owner":"puremvc.Model","tagname":"method","name":"removeModel","id":"static-method-removeModel","meta":{"static":true}}],"event":[]},"files":[{"href":"Model.html#puremvc-Model","filename":"Model.js"}],"allMixins":[],"singleton":false,"code_type":"function","members":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[{"owner":"puremvc.Model","tagname":"method","name":"constructor","id":"method-constructor","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"getInstance","id":"method-getInstance","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"hasProxy","id":"method-hasProxy","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"initializeModel","id":"method-initializeModel","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"registerProxy","id":"method-registerProxy","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"removeProxy","id":"method-removeProxy","meta":{}},{"owner":"puremvc.Model","tagname":"method","name":"retrieveProxy","id":"method-retrieveProxy","meta":{}}],"event":[]},"superclasses":[],"private":false,"name":"puremvc.Model","mixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Model.html#puremvc-Model' target='_blank'>Model.js</a></div></pre><div class='doc-contents'><p>A Multiton Model implementation.</p>\n\n<p>In PureMVC, the Model class provides\naccess to model objects (Proxies) by named lookup.</p>\n\n<p>The Model assumes these responsibilities:</p>\n\n<ul>\n<li>Maintain a cache of <a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">Proxy</a>\ninstances.</li>\n<li>Provide methods for registering, retrieving, and removing\n<a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">Proxy</a> instances.</li>\n</ul>\n\n\n<p>Your application must register\n<a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">Proxy</a> instances with the Model.\nTypically, you use a\n<a href=\"#!/api/puremvc.SimpleCommand\" rel=\"puremvc.SimpleCommand\" class=\"docClass\">SimpleCommand</a>\nor\n<a href=\"#!/api/puremvc.MacroCommand\" rel=\"puremvc.MacroCommand\" class=\"docClass\">MacroCommand</a>\nto create and register Proxy instances once the Facade has initialized the\n<em>Core</em> actors.</p>\n\n<p>This Model implementation is a Multiton, so you should not call the\nconstructor directly, but instead call the\n<a href=\"#!/api/puremvc.Model-method-getInstance\" rel=\"puremvc.Model-method-getInstance\" class=\"docClass\">static Multiton Factory method</a></p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/puremvc.Model-method-constructor' class='name expandable'>puremvc.Model</a>( <span class='pre'>string key</span> ) : Object</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : string<div class='sub-desc'><p>The Models multiton key\n@throws {Error}\n An error is thrown if this multitons key is already in use by another instance</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getInstance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-getInstance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-getInstance' class='name expandable'>getInstance</a>( <span class='pre'>string key</span> ) : <a href=\"#!/api/puremvc.Model\" rel=\"puremvc.Model\" class=\"docClass\">puremvc.Model</a></div><div class='description'><div class='short'>Model Multiton Factory method. ...</div><div class='long'><p>Model Multiton Factory method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : string<div class='sub-desc'><p>The multiton key for the Model to retrieve</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/puremvc.Model\" rel=\"puremvc.Model\" class=\"docClass\">puremvc.Model</a></span><div class='sub-desc'><p>the instance for this Multiton key</p>\n</div></li></ul></div></div></div><div id='method-hasProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-hasProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-hasProxy' class='name expandable'>hasProxy</a>( <span class='pre'>string proxyName</span> ) : boolean</div><div class='description'><div class='short'>Check if a Proxy is registered ...</div><div class='long'><p>Check if a Proxy is registered</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>proxyName</span> : string<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>boolean</span><div class='sub-desc'><p>whether a Proxy is currently registered with the given proxyName.</p>\n</div></li></ul></div></div></div><div id='method-initializeModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-initializeModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-initializeModel' class='name expandable'>initializeModel</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Initialize the Model instance. ...</div><div class='long'><p>Initialize the Model instance.</p>\n\n<p>Called automatically by the constructor, this\nis your opportunity to initialize the Singleton\ninstance in your subclass without overriding the\nconstructor.</p>\n</div></div></div><div id='method-registerProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-registerProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-registerProxy' class='name expandable'>registerProxy</a>( <span class='pre'><a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a> proxy</span> )</div><div class='description'><div class='short'>Register a Proxy with the Model ...</div><div class='long'><p>Register a Proxy with the Model</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>proxy</span> : <a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-removeProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-removeProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-removeProxy' class='name expandable'>removeProxy</a>( <span class='pre'>string proxyName</span> ) : <a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a></div><div class='description'><div class='short'>Remove a Proxy from the Model. ...</div><div class='long'><p>Remove a Proxy from the Model.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>proxyName</span> : string<div class='sub-desc'><p>The name of the Proxy instance to remove</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a></span><div class='sub-desc'><p>The Proxy that was removed from the Model</p>\n</div></li></ul></div></div></div><div id='method-retrieveProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-method-retrieveProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-method-retrieveProxy' class='name expandable'>retrieveProxy</a>( <span class='pre'>string proxyName</span> ) : <a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>proxyName</span> : string<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/puremvc.Proxy\" rel=\"puremvc.Proxy\" class=\"docClass\">puremvc.Proxy</a></span><div class='sub-desc'><p>The Proxy instance previously registered with the provided proxyName</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-removeModel' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='puremvc.Model'>puremvc.Model</span><br/><a href='source/Model.html#puremvc-Model-static-method-removeModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/puremvc.Model-static-method-removeModel' class='name expandable'>removeModel</a>( <span class='pre'>string key</span> ) : void<strong class='static signature'>static</strong></div><div class='description'><div class='short'>Remove a Model instance. ...</div><div class='long'><p>Remove a Model instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : string<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","id":"class-puremvc.Model","meta":{},"inheritdoc":null});