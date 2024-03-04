import {puremvc} from "../../bin/puremvc.js";
import chai from "chai"
import { ModelTestProxy } from "./ModelTestProxy.js"

/**
 * Test the PureMVC Model class.
 */
describe("ModelTest", () => {

    /**
     * Tests the Model Multiton Factory Method
     */
    it("should testGetInstance", () => {
        // Test Factory Method
        let model = puremvc.Model.getInstance("ModelTestKey1", key => new puremvc.Model(key));

        // test assertions
        chai.assert.isNotNull(model, "Expecting instance not null");
    });

    /**
     * Tests the proxy registration and retrieval methods.
     *
     * <P>
     * Tests `registerProxy` and `retrieveProxy` in the same test.
     * These methods cannot currently be tested separately
     * in any meaningful way other than to show that the
     * methods do not throw exception when called. </P>
     */
    it("should testRegisterAndRetrieveProxy", () => {
        // register a proxy and retrieve it.
        let model = puremvc.Model.getInstance("ModelTestKey2", key => new puremvc.Model(key));
        model.registerProxy(new puremvc.Proxy("colors", ["red", "green", "blue"]));
        let proxy = model.retrieveProxy("colors");
        let data = proxy.data

        // test assertions
        chai.assert.isNotNull(data, "Expecting data not null");
        chai.assert.isTrue(data.length === 3, "Expecting data.length === 3");
        chai.assert.isTrue(data[0] === "red", "Expecting data[0] === 'red'");
        chai.assert.isTrue(data[1] === "green", "Expecting data[1] === 'green'");
        chai.assert.isTrue(data[2] === "blue", "Expecting data[2] === 'blue'");
    });

    /**
     * Tests the proxy removal method.
     */
    it("should testRegisterAndRemoveProxy", () => {
        // register a proxy, remove it, then try to retrieve it
        let model = puremvc.Model.getInstance("ModelTestKey3", key => new puremvc.Model(key));
        model.registerProxy(new puremvc.Proxy("sizes", [7, 13, 21]));

        // remove the proxy
        let removedProxy = model.removeProxy("sizes");

        // assert that we removed the appropriate proxy
        chai.assert.isTrue(removedProxy.proxyName === "sizes", "Expecting removedProxy.proxyName === 'sizes'");

        // ensure that the proxy is no longer retrievable from the model
        let proxy = model.retrieveProxy("sizes");

        // test assertions
        chai.assert.isNull(proxy);
    });

    /**
     * Tests the hasProxy Method
     */
    it("should testHasProxy", () => {
        // register a proxy
        let model = puremvc.Model.getInstance("ModelTestKey4", key => new puremvc.Model(key));
        let proxy = new puremvc.Proxy("aces", ["clubs", "spades", "hearts", "diamonds"]);
        model.registerProxy(proxy);

        // assert that the model.hasProxy method returns true
        // for that proxy name
        chai.assert.isTrue(model.hasProxy("aces"), "Expecting model.hasProxy('aces') === true");

        // remove the proxy
        model.removeProxy("aces");

        // assert that the model.hasProxy method returns false
        // for that proxy name
        chai.assert.isFalse(model.hasProxy("aces"), "Expecting model.hasProxy('aces') === false")
    });

    /**
     * Tests that the Model calls the onRegister and onRemove methods
     */
    it("should testOnRegisterAndOnRemove", () => {
        // Get a Multiton Model instance
        let model = puremvc.Model.getInstance("ModelTestKey5", key => new puremvc.Model(key));

        // Create and register the test proxy
        let proxy = new ModelTestProxy();
        model.registerProxy(proxy);

        // assert that onRegister was called, and the proxy responded by setting its data accordingly
        chai.assert.isTrue(proxy.data === ModelTestProxy.ON_REGISTER_CALLED, "Expecting proxy.data === ModelTestProxy.ON_REGISTER_CALLED");

        // Remove the component
        model.removeProxy(ModelTestProxy.NAME);

        // assert that onRemove was called, and the proxy responded by setting its data accordingly
        chai.assert.isTrue(proxy.data === ModelTestProxy.ON_REMOVE_CALLED, "Expecting proxy.data === ModelTestProxy.ON_REMOVE_CALLED");
    });

});
