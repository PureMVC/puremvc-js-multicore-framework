(function(n)
{
    function j(a, e)
    {
        this.setNotifyMethod(a);
        this.setNotifyContext(e)
    }

    function k(a, e, b)
    {
        this.name= a;
        this.body= e;
        this.type= b
    }

    function h()
    {
    }

    function m()
    {
    }

    function l()
    {
        this.subCommands= [];
        this.initializeMacroCommand()
    }

    function g(a, e)
    {
        this.mediatorName= a || this.constructor.NAME;
        this.viewComponent= e
    }

    function i(a, e)
    {
        this.proxyName= a || this.constructor.NAME;
        null != e && this.setData(e)
    }

    function b(a)
    {
        if(null != b.instanceMap[a])
            throw Error(b.MULTITON_MSG);
        this.initializeNotifier(a);
        b.instanceMap[a]= this;
        this.initializeFacade()
    }

    function c(a)
    {
        if(null != c.instanceMap[a])
            throw Error(c.MULTITON_MSG);
        this.multitonKey= a;
        c.instanceMap[this.multitonKey]= this;
        this.mediatorMap= [];
        this.observerMap= [];
        this.initializeView()
    }

    function d(a)
    {
        if(d.instanceMap[a])
            throw Error(d.MULTITON_MSG);
        this.multitonKey= a;
        d.instanceMap[a]= this;
        this.proxyMap= [];
        this.initializeModel()
    }

    function f(a)
    {
        if(null != f.instanceMap[a])
            throw Error(f.MULTITON_MSG);
        this.multitonKey= a;
        f.instanceMap[this.multitonKey]= this;
        this.commandMap= [];
        this.initializeController()
    }null == n && ( n= window);
    if(!n.puremvc)
        j.prototype.setNotifyMethod= function(a)
        {
            this.notify= a
        }, j.prototype.setNotifyContext= function(a)
        {
            this.context= a
        }, j.prototype.getNotifyMethod= function()
        {
            return this.notify
        }, j.prototype.getNotifyContext= function()
        {
            return this.context
        }, j.prototype.notifyObserver= function(a)
        {
            this.getNotifyMethod().call(this.getNotifyContext(), a)
        }, j.prototype.compareNotifyContext= function(a)
        {
            return a === this.context
        }, j.prototype.notify= null, j.prototype.context= null, k.prototype.getName= function()
        {
            return this.name
        }, k.prototype.setBody= function(a)
        {
            this.body= a
        }, k.prototype.getBody= function()
        {
            return this.body
        }, k.prototype.setType= function(a)
        {
            this.type= a
        }, k.prototype.getType= function()
        {
            return this.type
        }, k.prototype.toString= function()
        {
            var a= "Notification Name: " + this.getName(), a= a + ("\nBody:" + (null == this.body ? "null" : this.body.toString()));
            return a+= "\nType:" + (null == this.type ? "null" : this.type)
        }, k.prototype.name= null, k.prototype.type= null, k.prototype.body= null, h.prototype.sendNotification= function(a, e, b)
        {
            var c= this.getFacade();
            c && c.sendNotification(a, e, b)
        }, h.prototype.initializeNotifier= function(a)
        {
            this.multitonKey= "" + a;
            this.facade= this.getFacade()
        }, h.prototype.getFacade= function()
        {
            if(null == this.multitonKey)
                throw Error(h.MULTITON_MSG);
            return b.getInstance(this.multitonKey)
        }, h.prototype.multitonKey= null, h.prototype.facade= null, h.MULTITON_MSG= "multitonKey for this Notifier not yet initialized!", m.prototype= new h, m.prototype.constructor= m, m.prototype.execute= function()
        {
        }, l.prototype= new h, l.prototype.constructor= l, l.prototype.subCommands= null, l.prototype.initializeMacroCommand= function()
        {
        }, l.prototype.addSubCommand= function(a)
        {
            this.subCommands.push(a)
        }, l.prototype.execute= function(a)
        {
            for(; 0 < this.subCommands.length; )
            {
                var e= new (this.subCommands.shift());
                e.initializeNotifier(this.multitonKey);
                e.execute(a)
            }
        }, g.NAME= "Mediator", g.prototype= new h, g.prototype.constructor= g, g.prototype.getMediatorName= function()
        {
            return this.mediatorName
        }, g.prototype.setViewComponent= function(a)
        {
            this.viewComponent= a
        }, g.prototype.getViewComponent= function()
        {
            return this.viewComponent
        }, g.prototype.listNotificationInterests= function()
        {
            return []
        }, g.prototype.handleNotification= function()
        {
        }, g.prototype.onRegister= function()
        {
        }, g.prototype.onRemove= function()
        {
        }, g.prototype.mediatorName= null, g.prototype.viewComponent= null, i.NAME= "Proxy", i.prototype= new h, i.prototype.constructor= i, i.prototype.getProxyName= function()
        {
            return this.proxyName
        }, i.prototype.setData= function(a)
        {
            this.data= a
        }, i.prototype.getData= function()
        {
            return this.data
        }, i.prototype.onRegister= function()
        {
        }, i.prototype.onRemove= function()
        {
        }, i.prototype.proxyName= null, i.prototype.data= null, b.prototype.initializeFacade= function()
        {
            this.initializeModel();
            this.initializeController();
            this.initializeView()
        }, b.getInstance= function(a)
        {null == b.instanceMap[a] && (b.instanceMap[a]= new b(a));
            return b.instanceMap[a]
        }, b.prototype.initializeController= function()
        {
            if(null == this.controller)
                this.controller= f.getInstance(this.multitonKey)
        }, b.prototype.initializeModel= function()
        {
            if(null == this.model)
                this.model= d.getInstance(this.multitonKey)
        }, b.prototype.initializeView= function()
        {
            if(null == this.view)
                this.view= c.getInstance(this.multitonKey)
        }, b.prototype.registerCommand= function(a, e)
        {
            this.controller.registerCommand(a, e)
        }, b.prototype.removeCommand= function(a)
        {
            this.controller.removeCommand(a)
        }, b.prototype.hasCommand= function(a)
        {
            return this.controller.hasCommand(a)
        }, b.prototype.registerProxy= function(a)
        {
            this.model.registerProxy(a)
        }, b.prototype.retrieveProxy= function(a)
        {
            return this.model.retrieveProxy(a)
        }, b.prototype.removeProxy= function(a)
        {
            var e= null;
            null != this.model && ( e= this.model.removeProxy(a));
            return e
        }, b.prototype.hasProxy= function(a)
        {
            return this.model.hasProxy(a)
        }, b.prototype.registerMediator= function(a)
        {null != this.view && this.view.registerMediator(a)
        }, b.prototype.retrieveMediator= function(a)
        {
            return this.view.retrieveMediator(a)
        }, b.prototype.removeMediator= function(a)
        {
            var e= null;
            null != this.view && ( e= this.view.removeMediator(a));
            return e
        }, b.prototype.hasMediator= function(a)
        {
            return this.view.hasMediator(a)
        }, b.prototype.sendNotification= function(a, e, b)
        {
            this.notifyObservers(new k(a, e, b))
        }, b.prototype.notifyObservers= function(a)
        {null != this.view && this.view.notifyObservers(a)
        }, b.prototype.initializeNotifier= function(a)
        {
            this.multitonKey= a
        }, b.hasCore= function(a)
        {
            return null != b.instanceMap[a]
        }, b.removeCore= function(a)
        {null != b.instanceMap[a] && (d.removeModel(a), c.removeView(a), f.removeController(a),
            delete b.instanceMap[a])
        }, b.prototype.controller= null, b.prototype.model= null, b.prototype.view= null, b.prototype.multitonKey= null, b.instanceMap= [], b.MULTITON_MSG= "Facade instance for this Multiton key already constructed!", c.prototype.initializeView= function()
        {
        }, c.getInstance= function(a)
        {null == c.instanceMap[a] && (c.instanceMap[a]= new c(a));
            return c.instanceMap[a]
        }, c.prototype.registerObserver= function(a, e)
        {null != this.observerMap[a] ? this.observerMap[a].push(e) : this.observerMap[a]= [e]
        }, c.prototype.notifyObservers= function(a)
        {
            if(null != this.observerMap[a.getName()])
            {
                for(var e= this.observerMap[a.getName()], b= [], c, d= 0; d < e.length; d++) c= e[d], b.push(c);
                for( d= 0; d < b.length; d++) c= b[d], c.notifyObserver(a)
            }
        }, c.prototype.removeObserver= function(a, e)
        {
            for(var b= this.observerMap[a], c= 0; c < b.length; c++)
            if(!0 == b[c].compareNotifyContext(e))
            {
                b.splice(c, 1);
                break
            }0 == b.length &&
            delete this.observerMap[a]
        }, c.prototype.registerMediator= function(a)
        {
            if(null == this.mediatorMap[a.getMediatorName()])
            {
                a.initializeNotifier(this.multitonKey);
                this.mediatorMap[a.getMediatorName()]= a;
                var b= a.listNotificationInterests();
                if(0 < b.length)
                    for(var c= new j(a.handleNotification, a), d= 0; d < b.length; d++)
                    this.registerObserver(b[d], c);
                a.onRegister()
            }
        }, c.prototype.retrieveMediator= function(a)
        {
            return this.mediatorMap[a]
        }, c.prototype.removeMediator= function(a)
        {
            var b= this.mediatorMap[a];
            if(b)
            {
                for(var c= b.listNotificationInterests(), d= 0; d < c.length; d++)
                this.removeObserver(c[d], b);
                delete this.mediatorMap[a];
                b.onRemove()
            }
            return b
        }, c.prototype.hasMediator= function(a)
        {
            return null != this.mediatorMap[a]
        }, c.removeView= function(a)
        {
            delete c.instanceMap[a]
        }, c.prototype.mediatorMap= null, c.prototype.observerMap= null, c.instanceMap= [], c.prototype.multitonKey= null, c.MULTITON_MSG= "View instance for this Multiton key already constructed!", d.prototype.initializeModel= function()
        {
        }, d.getInstance= function(a)
        {null == d.instanceMap[a] && (d.instanceMap[a]= new d(a));
            return d.instanceMap[a]
        }, d.prototype.registerProxy= function(a)
        {
            a.initializeNotifier(this.multitonKey);
            this.proxyMap[a.getProxyName()]= a;
            a.onRegister()
        }, d.prototype.retrieveProxy= function(a)
        {
            return this.proxyMap[a]
        }, d.prototype.hasProxy= function(a)
        {
            return null != this.proxyMap[a]
        }, d.prototype.removeProxy= function(a)
        {
            var b= this.proxyMap[a];
            b && (this.proxyMap[a]= null, b.onRemove());
            return b
        }, d.removeModel= function(a)
        {
            delete d.instanceMap[a]
        }, d.prototype.proxyMap= null, d.instanceMap= [], d.MULTITON_MSG= "Model instance for this Multiton key already constructed!", f.prototype.initializeController= function()
        {
            this.view= c.getInstance(this.multitonKey)
        }, f.getInstance= function(a)
        {null == this.instanceMap[a] && (this.instanceMap[a]= new this(a));
            return this.instanceMap[a]
        }, f.prototype.executeCommand= function(a)
        {
            var b= this.commandMap[a.getName()];
            null != b && ( b= new b, b.initializeNotifier(this.multitonKey), b.execute(a))
        }, f.prototype.registerCommand= function(a, b)
        {null == this.commandMap[a] && this.view.registerObserver(a, new j(this.executeCommand, this));
            this.commandMap[a]= b
        }, f.prototype.hasCommand= function(a)
        {
            return null != this.commandMap[a]
        }, f.prototype.removeCommand= function(a)
        {this.hasCommand(a) && (this.view.removeObserver(a, this), this.commandMap[a]= null)
        }, f.removeController= function(a)
        {
            delete this.instanceMap[a]
        }, f.prototype.view= null, f.prototype.commandMap= null, f.prototype.multitonKey= null, f.instanceMap= [], f.MULTITON_MSG= "controller key for this Multiton key already constructed", n.puremvc=
        {
            View: c,
            Model: d,
            Controller: f,
            SimpleCommand: m,
            MacroCommand: l,
            Facade: b,
            Mediator: g,
            Observer: j,
            Notification: k,
            Notifier: h,
            Proxy: i
        }
})(this);
