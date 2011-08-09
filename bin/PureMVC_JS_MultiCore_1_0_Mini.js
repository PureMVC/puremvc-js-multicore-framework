new function(l){function i(a,e){this.setNotifyMethod(a);this.setNotifyContext(e)}function j(a,e,b){this.name=a;this.body=e;this.type=b}function k(){}function n(){}function m(){this.subCommands=[];this.initializeMacroCommand()}function g(a,e){this.mediatorName=a||this.constructor.NAME;this.viewComponent=e;this.interests=[]}function h(a,e){this.proxyName=a||this.constructor.NAME;e!=null&&this.setData(e)}function b(a){if(b.instanceMap[a]!=null)throw Error(b.MULTITON_MSG);this.initializeNotifier(a);b.instanceMap[a]=
this;this.initializeFacade()}function c(a){if(c.instanceMap[a]!=null)throw Error(c.MULTITON_MSG);this.multitonKey=a;c.instanceMap[this.multitonKey]=this;this.mediatorMap=[];this.observerMap=[];this.initializeView()}function d(a){if(d.instanceMap[a])throw Error(d.MULTITON_MSG);this.multitonKey=a;d.instanceMap[a]=this;this.proxyMap=[];this.initializeModel()}function f(a){if(f.instanceMap[a]!=null)throw Error(f.MULTITON_MSG);this.multitonKey=a;f.instanceMap[this.multitonKey]=this;this.commandMap=[];
this.initializeController()}if(null==l.org)l.org={};null==l.org.puremvc&&(l.org.puremvc={});null==l.org.puremvc.js&&(l.org.puremvc.js={});if(!l.org.puremvc.js.multicore)i.prototype.setNotifyMethod=function(a){this.notify=a},i.prototype.setNotifyContext=function(a){this.context=a},i.prototype.getNotifyMethod=function(){return this.notify},i.prototype.getNotifyContext=function(){return this.context},i.prototype.notifyObserver=function(a){this.getNotifyMethod().apply(this.getNotifyContext(),[a])},i.prototype.compareNotifyContext=
function(a){return a===this.context},i.prototype.notify=null,i.prototype.context=null,j.prototype.getName=function(){return this.name},j.prototype.setBody=function(a){this.body=a},j.prototype.getBody=function(){return this.body},j.prototype.setType=function(a){this.type=a},j.prototype.getType=function(){return this.type},j.prototype.toString=function(){var a="Notification Name: "+this.getName();a+="\nBody:"+(this.body==null?"null":this.body.toString());a+="\nType:"+(this.type==null?"null":this.type);
return a},j.prototype.name=null,j.prototype.type=null,j.prototype.body=null,k.prototype.sendNotification=function(a,e,b){var c=this.getFacade();c&&c.sendNotification(a,e,b)},k.prototype.initializeNotifier=function(a){this.multitonKey=a},k.prototype.getFacade=function(){if(this.multitonKey==null)throw Error(k.MULTITON_MSG);return b.getInstance(this.multitonKey)},k.prototype.multitonKey=null,k.MULTITON_MSG="multitonKey for this Notifier not yet initialized!",n.prototype=new k,n.prototype.constructor=
n,n.prototype.execute=function(){},m.prototype=new k,m.prototype.constructor=m,m.prototype.subCommands=null,m.prototype.initializeMacroCommand=function(){},m.prototype.addSubCommand=function(a){this.subCommands.push(a)},m.prototype.execute=function(a){for(;this.subCommands.length>0;){var e=new (this.subCommands.shift());e.initializeNotifier(this.multitonKey);e.execute(a)}},g.NAME="Mediator",g.prototype=new k,g.prototype.constructor=g,g.prototype.getMediatorName=function(){return this.mediatorName},
g.prototype.setViewComponent=function(a){this.viewComponent=a},g.prototype.getViewComponent=function(){return this.viewComponent},g.prototype.listNotificationInterests=function(){return this.interests},g.prototype.handleNotification=function(){},g.prototype.onRegister=function(){},g.prototype.onRemove=function(){},g.prototype.mediatorName=null,g.prototype.viewComponent=null,h.prototype=new k,h.prototype.constructor=h,h.prototype.getProxyName=function(){return this.proxyName},h.prototype.setData=function(a){this.data=
a},h.prototype.getData=function(){return this.data},h.prototype.onRegister=function(){},h.prototype.onRemove=function(){},h.prototype.proxyName=null,h.prototype.data=null,h.NAME="Proxy",b.prototype.initializeFacade=function(){this.initializeModel();this.initializeController();this.initializeView()},b.getInstance=function(a){b.instanceMap[a]==null&&(b.instanceMap[a]=new b(a));return b.instanceMap[a]},b.prototype.initializeController=function(){if(this.controller==null)this.controller=f.getInstance(this.multitonKey)},
b.prototype.initializeModel=function(){if(this.model==null)this.model=d.getInstance(this.multitonKey)},b.prototype.initializeView=function(){if(this.view==null)this.view=c.getInstance(this.multitonKey)},b.prototype.registerCommand=function(a,e){this.controller.registerCommand(a,e)},b.prototype.removeCommand=function(a){this.controller.removeCommand(a)},b.prototype.hasCommand=function(a){return this.controller.hasCommand(a)},b.prototype.registerProxy=function(a){this.model.registerProxy(a)},b.prototype.retrieveProxy=
function(a){return this.model.retrieveProxy(a)},b.prototype.removeProxy=function(a){var e=null;this.model!=null&&(e=this.model.removeProxy(a));return e},b.prototype.hasProxy=function(a){return this.model.hasProxy(a)},b.prototype.registerMediator=function(a){this.view!=null&&this.view.registerMediator(a)},b.prototype.retrieveMediator=function(a){return this.view.retrieveMediator(a)},b.prototype.removeMediator=function(a){var e=null;this.view!=null&&(e=this.view.removeMediator(a));return e},b.prototype.hasMediator=
function(a){return this.view.hasMediator(a)},b.prototype.sendNotification=function(a,e,b){this.notifyObservers(new j(a,e,b))},b.prototype.notifyObservers=function(a){this.view!=null&&this.view.notifyObservers(a)},b.prototype.initializeNotifier=function(a){this.multitonKey=a},b.hasCore=function(a){return b.instanceMap[a]!=null},b.removeCore=function(a){b.instanceMap[a]!=null&&(d.removeModel(a),c.removeView(a),f.removeController(a),delete b.instanceMap[a])},b.prototype.controller=null,b.prototype.model=
null,b.prototype.view=null,b.prototype.multitonKey=null,b.instanceMap=[],b.MULTITON_MSG="Facade instance for this Multiton key already constructed!",c.prototype.initializeView=function(){},c.getInstance=function(a){c.instanceMap[a]==null&&(c.instanceMap[a]=new c(a));return c.instanceMap[a]},c.prototype.registerObserver=function(a,e){this.observerMap[a]!=null?this.observerMap[a].push(e):this.observerMap[a]=[e]},c.prototype.notifyObservers=function(a){if(this.observerMap[a.getName()]!=null){for(var e=
this.observerMap[a.getName()],b=[],c,d=0;d<e.length;d++)c=e[d],b.push(c);for(d=0;d<b.length;d++)c=b[d],c.notifyObserver(a)}},c.prototype.removeObserver=function(a,e){for(var b=this.observerMap[a],c=0;c<b.length;c++)if(b[c].compareNotifyContext(e)==!0){b.splice(c,1);break}b.length==0&&delete this.observerMap[a]},c.prototype.registerMediator=function(a){if(this.mediatorMap[a.getMediatorName()]==null){a.initializeNotifier(this.multitonKey);this.mediatorMap[a.getMediatorName()]=a;var b=a.listNotificationInterests();
if(b.length>0)for(var c=new i(a.handleNotification,a),d=0;d<b.length;d++)this.registerObserver(b[d],c);a.onRegister()}},c.prototype.retrieveMediator=function(a){return this.mediatorMap[a]},c.prototype.removeMediator=function(a){var b=this.mediatorMap[a];if(b){for(var c=b.listNotificationInterests(),d=0;d<c.length;d++)this.removeObserver(c[d],b);delete this.mediatorMap[a];b.onRemove()}return b},c.prototype.hasMediator=function(a){return this.mediatorMap[a]!=null},c.removeView=function(a){delete c.instanceMap[a]},
c.prototype.mediatorMap=null,c.prototype.observerMap=null,c.instanceMap=[],c.prototype.multitonKey=null,c.MULTITON_MSG="View instance for this Multiton key already constructed!",d.prototype.initializeModel=function(){},d.getInstance=function(a){d.instanceMap[a]==null&&(d.instanceMap[a]=new d(a));return d.instanceMap[a]},d.prototype.registerProxy=function(a){a.initializeNotifier(this.multitonKey);this.proxyMap[a.getProxyName()]=a;a.onRegister()},d.prototype.retrieveProxy=function(a){return this.proxyMap[a]},
d.prototype.hasProxy=function(a){return this.proxyMap[a]!=null},d.prototype.removeProxy=function(a){var b=this.proxyMap[a];b&&(this.proxyMap[a]=null,b.onRemove());return b},d.removeModel=function(a){delete d.instanceMap[a]},d.prototype.proxyMap=null,d.instanceMap=[],d.MULTITON_MSG="Model instance for this Multiton key already constructed!",f.prototype.initializeController=function(){this.view=c.getInstance(this.multitonKey)},f.getInstance=function(a){null==this.instanceMap[a]&&(this.instanceMap[a]=
new this(a));return this.instanceMap[a]},f.prototype.executeCommand=function(a){var b=this.commandMap[a.getName()];b!=null&&(b=new b,b.initializeNotifier(this.multitonKey),b.execute(a))},f.prototype.registerCommand=function(a,b){this.commandMap[a]==null&&this.view.registerObserver(a,new i(this.executeCommand,this));this.commandMap[a]=b},f.prototype.hasCommand=function(a){return this.commandMap[a]!=null},f.prototype.removeCommand=function(a){this.hasCommand(a)&&(this.view.removeObserver(a,this),this.commandMap[a]=
null)},f.removeController=function(a){delete this.instanceMap[a]},f.instanceMap=[],f.MULTITON_MSG="controller key for this Multiton key already constructed",l.org.puremvc.js.multicore={core:{View:c,Model:d,Controller:f},patterns:{command:{SimpleCommand:n,MacroCommand:m},facade:{Facade:b},mediator:{Mediator:g},observer:{Observer:i,Notification:j,Notifier:k},proxy:{Proxy:h}}}}(this);