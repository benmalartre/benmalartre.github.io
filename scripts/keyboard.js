var KEY_EVENTS_MAP = new Map();

function KeyEvent(key, callback){
    this.callback = callback;
    KEY_EVENTS_MAP.set(key, this);
};

document.addEventListener('keydown', function(event) {
    if(KEY_EVENTS_MAP.has(event.code )) 
    {
        KEY_EVENTS_MAP.get(event.code).callback();
    }
/*
    switch(event.code){
        case 'ArrowLeft':
            console.log('LAFT');
            break;
        case 'ArrowRight':
            console.log('RAGT');
            break;
        case 'ArrowUp':
            console.log('AP');
            break;
        case 'ArrowDown':
            console.log('DAWN');
            break;
        case 'Space':
            console.log('JAMP!!!');
            break;
        default:
            console.log('DEFALT ---> '+ event.code);
            break;
    }
    
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
      alert('Undo!')
    }
    */
});