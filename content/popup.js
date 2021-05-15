function OnCombo(){
    alert('ON COMBO :D');
}

var items = [
    {
        label: 'lundi 01 mai 2019',
        value: '01-05-2019',
        callback: OnCombo
    },
    {
        label: 'mardi 02 mai 2019',
        value: '02-05-2019',
        callback: OnCombo
    },
    {
        label: 'mercredi 03 mai 2019',
        value: '03-05-2019',
        callback: OnCombo
    }
]


var combo = new Combo_t(app.content.elem, items);
