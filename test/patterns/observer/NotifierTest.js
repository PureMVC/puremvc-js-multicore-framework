//
//  NotifierTest.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import chai from "chai"
import {Facade, Notifier} from "../../../src/index.js";
import {FacadeTestVO} from "../facade/FacadeTestVO.js";
import {FacadeTestCommand} from "../facade/FacadeTestCommand.js";

/**
 * Test the PureMVC Notifier class.
 *
 * @see Facade
 */
describe("NotifierTest", () => {

    it("test", () => {
        const facade = Facade.getInstance("notifierTest", (key) => new Facade(key));

        chai.assert.isTrue(Facade.hasCore("notifierTest"))

        let vo = new FacadeTestVO(5);
        facade.registerCommand("testCommand", () => new FacadeTestCommand());

        let notifier = new Notifier();
        notifier.initializeNotifier("notifierTest");
        notifier.sendNotification("testCommand", vo);

        // test assertions
        chai.assert.isTrue(vo.result === 10, "Expecting vo.result == 10");
    });

});
