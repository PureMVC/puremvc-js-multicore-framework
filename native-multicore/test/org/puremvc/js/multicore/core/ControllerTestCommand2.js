require: 'org/puremvc/js/multicore/patterns/command/SimpleCommand';

ControllerTestCommand2.prototype= new SimpleCommand();
ControllerTestCommand2.prototype.constructor= ControllerTestCommand2;


/** @override */
ControllerTestCommand2.prototype.execute= function (note)
{
    var vo= note.getBody();
    console.log("vo.result was " + vo.result);
    vo.result= vo.result + (2 * vo.input);
    console.log("vo.result is now " + vo.result + " (a difference of " + vo.input + ")");
        
};

/**
 * @constructor
 * @extends {SimpleCommand}
 */
function ControllerTestCommand2 () { };
