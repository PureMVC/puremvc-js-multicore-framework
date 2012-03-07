
/**
 * @constructor
 * @extends {SimpleCommand}
 */
function FacadeTestCommand () 
{
    this.executed= false;
    //console.log("this.execute= " + this.execute);
};

FacadeTestCommand.prototype= new SimpleCommand;
FacadeTestCommand.prototype.constructor= FacadeTestCommand;

FacadeTestCommand.prototype.executed= false;
/** @override */
FacadeTestCommand.prototype.execute= function (note)
{
    var vo= note.getBody();
    this.executed= true;
    // fabricate a result
    vo.result= (2 * vo.input);
};


