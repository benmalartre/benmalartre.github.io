document.addEventListener('keydown', function(event) {
    switch(event.code){
        case 'KeyLeft':
            console.log('LAFT');
        case 'KeyRight':
            console.log('RAGT');
        case 'KeyUp':
            console.log('AP');
        case 'KeyDown':
            console.log('DAWN');
        case 'KeySpace':
            console.log('JAMP!!!');
        default:
            console.log('DEFALT');
    }
    /*
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
      alert('Undo!')
    }
    */
});