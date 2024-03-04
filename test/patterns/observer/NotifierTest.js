import {puremvc} from "../../../bin/puremvc.js";
import chai from "chai"
import {FacadeTestVO} from "../facade/FacadeTestVO.js";
import {FacadeTestCommand} from "../facade/FacadeTestCommand.js";

/**
 * Test the PureMVC Notifier class.
 *
 * @see Facade
 */
describe("NotifierTest", () => {

    it("test", () => {
        const facade = puremvc.Facade.getInstance("notifierTest", (key) => new puremvc.Facade(key));

        chai.assert.isTrue(puremvc.Facade.hasCore("notifierTest"))

        let vo = new FacadeTestVO(5);
        facade.registerCommand("testCommand", () => new FacadeTestCommand());

        let notifier = new puremvc.Notifier();
        notifier.initializeNotifier("notifierTest");
        notifier.sendNotification("testCommand", vo);

        // test assertions
        chai.assert.isTrue(vo.result === 10, "Expecting vo.result == 10");
    });

});