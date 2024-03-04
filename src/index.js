/*
 *  index.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import { Controller } from "./core/Controller.js"
import { Model } from "./core/Model.js"
import { View } from "./core/View.js"
import { MacroCommand } from "./patterns/command/MacroCommand.js"
import { SimpleCommand } from "./patterns/command/SimpleCommand.js"
import { Facade } from "./patterns/facade/Facade.js"
import { Mediator } from "./patterns/mediator/Mediator.js"
import { Notification } from "./patterns/observer/Notification"
import { Notifier } from "./patterns/observer/Notifier.js"
import { Observer } from "./patterns/observer/Observer.js"
import { Proxy } from "./patterns/proxy/Proxy.js"

const puremvc = {
    Controller, Model, View,
    SimpleCommand, MacroCommand, Facade,
    Mediator, Notification, Notifier, Observer, Proxy
}

export { puremvc }