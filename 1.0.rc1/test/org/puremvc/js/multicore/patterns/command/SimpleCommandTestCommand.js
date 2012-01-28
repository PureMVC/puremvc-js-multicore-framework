SimpleCommandTestCommand.prototype= new SimpleCommand;
SimpleCommandTestCommand.prototype.constructor= SimpleCommandTestCommand;

SimpleCommandTestCommand.prototype.execute= function (note)
{
    var vo= note.getBody();
    
    // fabricate a result
    vo.result= 2 * vo.input;
};

function SimpleCommandTestCommand ()
{
    
};
