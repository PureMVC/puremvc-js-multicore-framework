import {puremvc} from "../../../bin/puremvc.js";
import chai from "chai"
import {FacadeTestCommand} from "./FacadeTestCommand.js";
import {FacadeTestVO} from "./FacadeTestVO.js";

/**
 * Test the PureMVC Facade class.
 *
 * @see FacadeTestVO
 * @see FacadeTestCommand
 */
describe("FacadeTest", () => {

    /**
     * Tests the Facade Multiton Factory Method
     */
    it("should testGetInstance", () => {
        // Test Factory Method
       let facade = puremvc.Facade.getInstance("FacadeTestKey1", key => new puremvc.Facade(key));

        // test assertions
        chai.assert.isTrue(facade != null, "");
    });

    /**
     * Tests Command registration and execution via the Facade.
     *
     * <P>This test gets a Multiton Facade instance
     * and registers the FacadeTestCommand class
     * to handle 'FacadeTest' Notifications.<P>
     *
     * <P>It then sends a notification using the Facade.
     * Success is determined by evaluating
     * a property on an object placed in the body of
     * the Notification, which will be modified by the Command.</P>
     */
    it("should testRegisterCommandAndSendNotification", () => {
        // Create the Facade, register the FacadeTestCommand to
        // handle 'FacadeTest' notifications
        let facade = puremvc.Facade.getInstance("FacadeTestKey2", key => new puremvc.Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());

        // Send notification. The Command associated with the event
        // (FacadeTestCommand) will be invoked, and will multiply
        // the vo.input value by 2 and set the result on vo.result
        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        // test assertions
        chai.assert.isTrue(vo.result === 64, "Expecting vo.result == 64");
    });

    /**
     * Tests Command removal via the Facade.
     *
     * <P>This test gets a Multiton Facade instance
     * and registers the FacadeTestCommand class
     * to handle 'FacadeTest' Notifications. Then it removes the command.<P>
     *
     * <P>It then sends a Notification using the Facade.
     * Success is determined by evaluating
     * a property on an object placed in the body of
     * the Notification, which will NOT be modified by the Command.</P>
     */
    it("should testRegisterAndRemoveCommandAndSendNotification", () => {
        // Create the Facade, register the FacadeTestCommand to
        // handle 'FacadeTest' events
        let facade = puremvc.Facade.getInstance("FacadeTestKey3", key => new puremvc.Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());
        facade.removeCommand("FacadeTestNote");

        // Send notification. The Command associated with the event
        // (FacadeTestCommand) will NOT be invoked, and will NOT multiply
        // the vo.input value by 2
        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo, "");

        // test assertions
        chai.assert.isTrue(vo.result !== 64, "Expecting vo.result != 64")
    });

    /**
     * Tests the regsitering and retrieving Model proxies via the Facade.
     *
     * <P>Tests `registerProxy` and `retrieveProxy` in the same test.
     * These methods cannot currently be tested separately
     * in any meaningful way other than to show that the
     * methods do not throw exception when called.</P>
     */
    it("should testRegisterAndRetrieveProxy", () => {
        // register a proxy and retrieve it.
        let facade = puremvc.Facade.getInstance("FacadeTestKey4", key => new puremvc.Facade(key));
        facade.registerProxy(new puremvc.Proxy("colors", ["red", "green", "blue"]));
        let proxy = facade.retrieveProxy("colors");

        // test assertions
        chai.assert.isNotNull(proxy, "Expecting proxy is not null");

        // retrieve data from proxy
        let data = proxy.data;

        // test assertions
        chai.assert.isNotNull(data, "Expecting data not null");
        chai.assert.isTrue(data.length === 3, "Expecting data.length == 3");
        chai.assert.isTrue(data[0] === "red", "Expecting data[0] == 'red'");
        chai.assert.isTrue(data[1] === "green", "Expecting data[1] == 'green'");
        chai.assert.isTrue(data[2] === "blue", "Expecting data[2] == 'blue'");
    });

    /**
     * Tests the removing Proxies via the Facade.
     */
    it("should testRegisterAndRemoveProxy", () => {
        // register a proxy, remove it, then try to retrieve it
        let facade = puremvc.Facade.getInstance("FacadeTestKey5", key => new puremvc.Facade(key));
        let proxy = new puremvc.Proxy("sizes", [7, 13, 21]);
        facade.registerProxy(proxy);

        // remove the proxy
        let removedProxy = facade.removeProxy("sizes");

        // assert that we removed the appropriate proxy
        chai.assert.isTrue(removedProxy.proxyName === "sizes", "Expecting removedProxy.getProxyName() == 'sizes'");

        // make sure we can no longer retrieve the proxy from the model
        proxy = facade.retrieveProxy("sizes");

        // test assertions
        chai.assert.isNull(proxy, "Expecting proxy is null");
    });

    /**
     * Tests registering, retrieving and removing Mediators via the Facade.
     */
    it("should testRegisterRetrieveAndRemoveMediator", () => {
        // register a mediator, remove it, then try to retrieve it
        let facade = puremvc.Facade.getInstance("FacadeTestKey6", key => new puremvc.Facade(key));
        facade.registerMediator(new puremvc.Mediator(puremvc.Mediator.NAME, {}));

        // retrieve the mediator
        chai.assert.isNotNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting mediator is not null");

        // remove the mediator
        let removedMediator = facade.removeMediator(puremvc.Mediator.NAME);

        // assert that we have removed the appropriate mediator
        chai.assert.isTrue(removedMediator.mediatorName === puremvc.Mediator.NAME, "Expecting removedMediator.getMediatorName() == Mediator.NAME");

        // assert that the mediator is no longer retrievable
        chai.assert.isTrue(facade.retrieveMediator(puremvc.Mediator.NAME) == null, "Expecting facade.retrieveMediator( Mediator.NAME ) == null )")
    });

    /**
     * Tests the hasProxy Method
     */
    it("should testHasProxy", () => {
        // register a Proxy
        let facade = puremvc.Facade.getInstance("FacadeTestKey7", key => new puremvc.Facade(key));
        facade.registerProxy(new puremvc.Proxy("hasProxyTest", [1, 2, 3]));

        // assert that the model.hasProxy method returns true
        // for that proxy name
        chai.assert.isTrue(facade.hasProxy("hasProxyTest"), "Expecting facade.hasProxy('hasProxyTest') == true");
    });

    /**
     * Tests the hasMediator Method
     */
    it("should testHasMediator", () => {
        // register a Mediator
        let facade = puremvc.Facade.getInstance("FacadeTestKey8", key => new puremvc.Facade(key));
        facade.registerMediator(new puremvc.Mediator("facadeHasMediatorTest", {}));

        // assert that the facade.hasMediator method returns true
        // for that mediator name
        chai.assert.isTrue(facade.hasMediator("facadeHasMediatorTest"), "Expecting facade.hasMediator('facadeHasMediatorTest') == true");

        facade.removeMediator("facadeHasMediatorTest");

        // assert that the facade.hasMediator method returns false
        // for that mediator name
        chai.assert.isFalse(facade.hasMediator("facadeHasMediatorTest"), "Expecting facade.hasMediator('facadeHasMediatorTest') == false");
    });

    /**
     * Test hasCommand method.
     */
    it("should testHasCommand", () => {
        // register the ControllerTestCommand to handle 'hasCommandTest' notes
        let facade = puremvc.Facade.getInstance("FacadeTestKey10", key => new puremvc.Facade(key));
        facade.registerCommand("facadeHasCommandTest", () => new FacadeTestCommand());

        // test that hasCommand returns true for hasCommandTest notifications
        chai.assert.isTrue(facade.hasCommand("facadeHasCommandTest"), "Expecting facade.hasCommand('facadeHasCommandTest') == true");

        // Remove the Command from the Controller
        facade.removeCommand("facadeTestCommand");

        // test that hasCommand returns false for hasCommandTest notifications
        chai.assert.isFalse(facade.hasCommand("facadeTestCommand"), "Expecting facade.hasCommand('facadeHasCommandTest') == false");
    });

    /**
     * Tests the hasCore and removeCore methods
     */
    it("should testHasCoreAndRemoveCore", () => {
        // assert that the Facade.hasCore method returns false first
        chai.assert.isFalse(puremvc.Facade.hasCore("FacadeTestKey11"), "Expecting facade.hasCore('FacadeTestKey11') == false");

        // register a Core
        puremvc.Facade.getInstance("FacadeTestKey11", key => new puremvc.Facade(key));

        // assert that the Facade.hasCore method returns true now that a Core is registered
        chai.assert.isTrue(puremvc.Facade.hasCore("FacadeTestKey11"), "Expecting facade.hasCore('FacadeTestKey11') == true");

        // remove the Core
        puremvc.Facade.removeCore("FacadeTestKey11");

        // assert that the Facade.hasCore method returns false now that the core has been removed.
        chai.assert.isFalse(puremvc.Facade.hasCore("FacadeTestKey11"), "Expecting facade.hasCore('FacadeTestKey11') == false");
    });

});
