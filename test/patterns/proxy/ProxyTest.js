import {puremvc} from "../../../bin/puremvc-2.0.0.min.js";
import chai from "chai"

/**
 * Test the PureMVC Proxy class.
 *
 * @see IProxy
 * @see Proxy
 */
describe("ProxyTest", () => {

    /**
     * Tests getting the name using Proxy class accessor method. Setting can only be done in constructor.
     */
    it("should testNameAccessor", () => {
        // Create a new Proxy and use accessors to set the proxy name
        let proxy = new puremvc.Proxy("TestProxy", null);

        // test assertions
        chai.assert(proxy.proxyName === "TestProxy", "Expecting proxy.getProxyName() == 'TestProxy'");

        let proxy2 = new puremvc.Proxy();

        // test assertions
        chai.assert.isTrue(proxy2.proxyName === puremvc.Proxy.NAME, "Expecting proxy.getProxyName() == 'Proxy'");
    });

    it("should testDataAccessors", () => {
        // Create a new Proxy and use accessors to set the data
        let proxy = new puremvc.Proxy("colors", null);
        proxy.data = ["red", "green", "blue"];
        let data = proxy.data

        // test assertions
        chai.assert.equal(data.length, 3, "Expecting data.length == 3");
        chai.assert.equal(data[0], "red", "Expecting data[0] == 'red'");
        chai.assert.equal(data[1], "green", "Expecting data[1] == 'green'");
        chai.assert.equal(data[2], "blue", "Expecting data[2] == 'blue'");
    });

    it("should testConstructor", () => {
        // Create a new Proxy using the Constructor to set the name and data
        let proxy = new puremvc.Proxy("colors", ["red", "green", "blue"]);
        let data = proxy.data;

        // test assertions
        chai.assert.equal(proxy.proxyName, "colors", "Expecting proxy.getProxyName() == 'colors'");
        chai.assert.equal(data.length, 3, "Expecting data.length == 3");
        chai.assert.equal(data[0], "red", "Expecting data[0] == 'red'");
        chai.assert.equal(data[1], "green", "Expecting data[1] == 'green'");
        chai.assert.equal(data[2], "blue", "Expecting data[2] == 'blue'");
    });

});
