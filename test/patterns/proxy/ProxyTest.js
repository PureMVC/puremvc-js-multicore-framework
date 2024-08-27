//
//  ProxyTest.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import chai from "chai"
import {Proxy} from "../../../src/index.js";

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
        let proxy = new Proxy("TestProxy", null);

        // test assertions
        chai.assert(proxy.proxyName === "TestProxy", "Expecting proxy.getProxyName() == 'TestProxy'");

        let proxy2 = new Proxy();

        // test assertions
        chai.assert.isTrue(proxy2.proxyName === Proxy.NAME, "Expecting proxy.getProxyName() == 'Proxy'");
    });

    /**
     * Tests setting and getting the data using Proxy class accessor methods.
     */
    it("should testDataAccessors", () => {
        // Create a new Proxy and use accessors to set the data
        let proxy = new Proxy("colors", null);
        proxy.data = ["red", "green", "blue"];
        let data = proxy.data

        // test assertions
        chai.assert.equal(data.length, 3, "Expecting data.length == 3");
        chai.assert.equal(data[0], "red", "Expecting data[0] == 'red'");
        chai.assert.equal(data[1], "green", "Expecting data[1] == 'green'");
        chai.assert.equal(data[2], "blue", "Expecting data[2] == 'blue'");
    });

    /**
     * Tests setting the name and body using the Notification class Constructor.
     */
    it("should testConstructor", () => {
        // Create a new Proxy using the Constructor to set the name and data
        let proxy = new Proxy("colors", ["red", "green", "blue"]);
        let data = proxy.data;

        // test assertions
        chai.assert.equal(proxy.proxyName, "colors", "Expecting proxy.getProxyName() == 'colors'");
        chai.assert.equal(data.length, 3, "Expecting data.length == 3");
        chai.assert.equal(data[0], "red", "Expecting data[0] == 'red'");
        chai.assert.equal(data[1], "green", "Expecting data[1] == 'green'");
        chai.assert.equal(data[2], "blue", "Expecting data[2] == 'blue'");
    });

});
