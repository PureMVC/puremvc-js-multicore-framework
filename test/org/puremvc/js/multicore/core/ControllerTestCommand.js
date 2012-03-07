require: 'org/puremvc/js/multicore/patterns/command/SimpleCommand';

/*
 PureMVC - Copyright(c) 2006-08 Futurecale, Inc., Some rights reserved.
 Your reuse is governed by Creative Commons Attribution 2.5 License
*/

ControllerTestCommand.prototype= new SimpleCommand;
ControllerTestCommand.prototype.constructor= ControllerTestCommand;

/*
 * Fabricate a result by multiplying the input by 2
 * 
 * @param note the note carrying the ControllerTestVO
 */
ControllerTestCommand.prototype.execute= function (note)
{
    var vo = note.getBody();
    
    // Fabricate a result
    vo.result = 2 * vo.input;
};

/**
 * @extends {SimpleCommand}
 */
function ControllerTestCommand () { };



        
