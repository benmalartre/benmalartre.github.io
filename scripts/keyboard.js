document.addEventListener('keydown', function(event) {
    switch(event.code){
        case 'ArrowLeft':
            console.log('LAFT');
        case 'ArrowRight':
            console.log('RAGT');
        case 'ArrowUp':
            console.log('AP');
        case 'ArrowDown':
            console.log('DAWN');
        case 'Space':
            console.log('JAMP!!!');
        default:
            console.log('DEFALT ---> '+ event.code);
    }
    /*
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
      alert('Undo!')
    }
    */
});