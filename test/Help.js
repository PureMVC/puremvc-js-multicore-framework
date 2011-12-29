/**
 * A helper object used to assert interface implementation. This object is
 * used only to assist tests. The Help object is not a dependency of the
 * puremvc implementation.
 * 
 * @author David Foley | david@objectkit.com
 */
Help=
{
    /**
     * @type {string}
     * @const
     */
    TYPE_ERROR: "TypeError"
    
    /**
     * @type {string}
     * @const
     */
,   INTERFACE_METHOD_NOT_IMPLEMENTED: "InterfaceError- method not implemented"

    /**
     * @type {string}
     * @const
     */
,   INTERFACE_BAD_METHOD_SIGNATURE: "InterfaceError- invalid method signature"
    
    /**
     * Raise an error, optionally decorating it with properties.
     * 
     * @param {Object} message
     * @param {Object} properties
     * @return {void}
     * @throws {Error}
     * @private
     */
,   raiseError: function (message, properties)
    {
        var error= new Error(message || '');
        if (properties)
        {
            this.decorate(error, properties, true);
        }
        
        throw error;
    } 
    
    /**
     * Decorate one object with the properties of another
     * @param {Object} subject
     * @param {Object} properties
     * @param {boolean}
     * @return {void}
     */
,   decorate: function (subject, properties, allowOverride)
    {
        for (var accessor in properties)
        {
            if (allowOverride || false === accessor in subject)
            {
                subject[accessor]= properties[accessor];
            }
        }
    }
    
    /**
     * Assert that a value is of a certain type.
     * 
     * @param {Function|null|undefined} ctor
     *  The expected type.
     * @param {*} value
     *  Any value.
     * @param {string} [description]
     *  An optional description of the assertion.
     * @return {void}
     * @throws {Error}
     */
,   assertType: function (description, ctor, value)
    {
        var error;
        
        if (null == ctor)
        {
            if (ctor === value)
                return;
            
            error= new TypeError(ctor + " expected, " + value + " provided");
            error.type= Help.TYPE_ERROR;
            throw error;
        }
        
        if ('function' != typeof ctor)
        {
            throw new TypeError("Function expected as first argument to Help.assertType")
        }

        if (null != value && Object(value) instanceof ctor)
            return;
            
        var error= new TypeError(description);    
        error.type= Help.TYPE_ERROR;
        throw error;
    }
};
