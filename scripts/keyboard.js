var KEY_EVENTS_MAP = new Map();

function KeyEvent(key, object, callback){
    this.object = object;
    this.callback = callback;
    KEY_EVENTS_MAP.set(key, this);
};

document.addEventListener('keydown', function(event) {
    if(KEY_EVENTS_MAP.has(event.code )) 
    {
        var keyEvent = KEY_EVENTS_MAP.get(event.code);
        keyEvent.object[keyEvent.callback]();
    }
});