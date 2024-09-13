//
//  MediatorTest.js
//  PureMVC JavaScript Multicore
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import {Mediator} from "../../../src/index.js";
import chai from "chai"

/**
 * Test the PureMVC Mediator class.
 *
 * @see IMediator
 * @see Mediator
 */
describe("MediatorTest", () => {

    /**
     * Tests getting the name using Mediator class accessor method.
     */
    it("should testNameAccessor", () => {
        // Create a new Mediator and use accessors to set the mediator name
        let mediator = new Mediator();

        // test assertions
        chai.assert.equal(mediator.mediatorName, Mediator.NAME, "Expecting mediator.getMediatorName() == Mediator.NAME");
    });

    /**
     * Tests getting the name using Mediator class accessor method.
     */
    it("should testViewAccessor", () => {
        // Create a view object
        let view = {};

        // Create a new Proxy and use accessors to set the proxy name
        let mediator = new Mediator(Mediator.NAME, view);

        // test assertions
        chai.assert.isNotNull(mediator)
    });

});
