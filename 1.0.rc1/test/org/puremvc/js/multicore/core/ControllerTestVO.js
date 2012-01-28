
ControllerTestVO.prototype=
{
    /**
     * @type {number}
     */
    input: null
    
    /**
     * @type {number}
     */
,   result: null    
};

/**
 * 
 * @param {number} input
 * @constructor
 */
function ControllerTestVO (input)
{
    if ('number' !== typeof input)
        throw new TypeError("Number expected");
        
    this.input= input;
    this.result= 0;    
};
