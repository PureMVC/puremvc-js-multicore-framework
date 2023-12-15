/*
 *  index.js
 *  PureMVC JavaScript Multicore
 *
 *  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
 *  Your reuse is governed by the BSD License
*/

import { Controller, Model, View,
    SimpleCommand, MacroCommand, Facade,
    Mediator, Notification, Notifier, Observer, Proxy } from "./src/index.js"

const puremvc = {
    Controller, Model, View,
    SimpleCommand, MacroCommand, Facade,
    Mediator, Notification, Notifier, Observer, Proxy
}

export { puremvc }