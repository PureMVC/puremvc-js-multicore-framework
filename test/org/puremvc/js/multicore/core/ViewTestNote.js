ViewTestNote.prototype= new Notification(null, null, null);
ViewTestNote.prototype.constructor= ViewTestNote;

ViewTestNote.NAME= "ViewTestNote";
ViewTestNote.create= function (body)
{
    return new ViewTestNote(ViewTestNote.NAME, body);   
};

function ViewTestNote(name, body)
{
    Notification.call(this, ViewTestNote.NAME, body);    
};
