"use strict";
var LASTX = 0;
var LASTY = 0;
var OFFSETX = 0;
var OFFSETY = 0;
var DRAG = false;
var NEWX = 0;
var NEWY = 0;

var INFO_SELECT_DATE = 'Choisissez une date :'

function Content_t(elem){
    this.parentElement = elem;
    this.elem = document.createElement('div');
    this.elem.id = 'content_slider';
    this.elem.style.position = 'relative';
    this.elem.style.background = 'black';
    this.elem.style.display = 'block';  
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    this.elem.style.touchAction = 'none';
    elem.appendChild(this.elem);

    this.drag = false;
    this.data = null;
    /*
    elem.addEventListener('mousedown', this.OnMouseDown);
    elem.addEventListener('mousemove', this.OnMouseMove);
    elem.addEventListener('mouseup', this.OnMouseUp);

    elem.addEventListener('touchstart', this.OnMouseDown);
    elem.addEventListener('touchmove', this.OnMouseMove);
    elem.addEventListener('touchend', this.OnMouseUp);
    */
};

Content_t.prototype.OnMouseDown = function(ev){
    DRAG = true;
    if(ev.type === 'touchstart'){
        LASTX = ev.touches[0].clientX - OFFSETX;
        LASTY = ev.touches[0].clientY - OFFSETY;
    }
    else{
        LASTX = ev.clientX - OFFSETX;
        LASTY = ev.clientY - OFFSETY;
    }
};

Content_t.prototype.OnMouseUp = function(ev){
    DRAG = false;
    OFFSETX = NEWX;
    OFFSETY = NEWY;
};

Content_t.prototype.OnMouseMove = function(ev){
    ev.preventDefault();
    if(DRAG){
        var win = document.querySelector('#content');
        var elem = document.querySelector('#content_slider');
        if(ev.type === 'touchmove'){
            NEWX = ev.touches[0].clientX - LASTX;
            NEWY = ev.touches[0].clientY - LASTY;
        }
        else{
            NEWX = ev.screenX - LASTX;
            NEWY = ev.screenY - LASTY;
        }
        
        var maxX = -(elem.offsetWidth-win.offsetWidth);
        var maxY = -(elem.offsetHeight-win.offsetHeight)
        if(NEWX > 0)NEWX = 0;
        else if(NEWX<maxX)NEWX = maxX;
        if(NEWY > 0)NEWY = 0;
        else if(NEWY<maxY)NEWY = maxY;

        elem.style.left = NEWX;
        elem.style.top = NEWY;
    }
};

Content_t.prototype.Clear = function(){
    for(var i=this.elem.childNodes.length-1;i>=0;i--){
        this.elem.removeChild(this.elem.childNodes[i]);
    }
};

Content_t.prototype.Mount = function(elem){
    this.elem.appendChild(elem);
    this.elem.style.width = elem.offsetWidth;
    this.elem.style.wheightidth = elem.offsetHeight;
    this.elem.top = '0px';
    this.elem.left = '0px';
};

Content_t.prototype.Scroll = function(newX, newY){
    this.parentElement.scrollLeft = newX;
    this.parentElement.scrollTop = newY;
};

function PanelOnSelectShow(ev){
    UpdateShowTablePosition();
    alert(ev.target+':'+ev.target.show_id);
    var newY = SHOW_TABLE_POSITION[ev.target.show_id]['y'];
    app.content.Scroll(0, newY);
}

function PanelOnSelectPlace(ev){
    alert('PANEL SELECT PLACE !!!');
}

function Panel_t(elem){
    elem.innerHTML = '';
    this.elem = document.createElement('div');
    this.elem.style.postion = 'absolute';
    this.elem.style.width = '100%';
    this.elem.style.height = '100%';
    elem.appendChild(this.elem);
    this.SetMode(APP_MODE);
}

Panel_t.prototype.BuildShowsList = function(){
    for(var s in DATA_DATAS['spectacle']){
        var show = DATA_DATAS['spectacle'][s];
        var row = document.createElement('div');
        var a = document.createElement('a');
        a.textContent = show['name'];
        a.style.backgroundColor = COLOR_TABLE[show['id']%32];
        a.href = '#';
        a.onclick = PanelOnSelectShow;
        a.show_id = show['id'];
        row.appendChild(a);
        this.elem.appendChild(row);
    }
}

Panel_t.prototype.BuildPlacesList = function(){
    for(var p in DATA_DATAS['place']){
        var place = DATA_DATAS['place'][p];
        var row = document.createElement('div');
        var a = document.createElement('a');
        a.textContent = place['name'];
        a.style.backgroundColor = COLOR_TABLE[place['id']%32];
        a.href = '#';
        a.onclick = PanelOnSelectPlace;
        a.place_id = place['id'];
        row.appendChild(a);
        this.elem.appendChild(row);
    }
}

Panel_t.prototype.SetMode = function(mode){
    this.elem.innerHTML = '';
    switch(mode){
        case MODE_SHOWS:
            this.BuildShowsList();
            break;

        case MODE_CALENDAR:
            break;

        case MODE_HOME:
            break;

        case MODE_MAP:
            this.BuildPlacesList();
            break;
    }
}


function Infos_t(elem){
    this.elem = elem;
    this.grid = document.createElement('div');
    this.grid.style.display = 'grid';
    this.grid.style.gridGap = '0px';
    this.grid.style.gridTemplateColumns = '2% auto 25% 20% 20% 2%';
    this.grid.style.gridTemplateRows = '100%'
    this.grid.style.position = 'relative';
    this.grid.style.width = '100%';
    this.grid.style.height = '100%';
    this.grid.style.marginRight = '5%';

    this.cell1 = this.AddCell(this.grid, 2,1);
    this.cell2 = this.AddCell(this.grid, 3,1);
    this.cell3 = this.AddCell(this.grid, 4,1);
    this.cell4 = this.AddCell(this.grid, 5,1);
    
    this.show = this.AddShow(this.cell1);
    this.date = this.AddDate(this.cell2);
    this.tokens = this.AddTokens(this.cell3);
    this.validate = this.AddValidate(this.cell4);

    elem.appendChild(this.grid);
}

Infos_t.prototype.AddCell = function(parent, column, row){

    var cell = document.createElement('div');
    parent.appendChild(cell);
    cell.className = 'infos_cell';
    cell.style.position = 'relative';
    cell.style.width='100%';
    cell.style.height='100%';
    cell.style.gridColumn = column;
    cell.style.gridRow = row;
    return cell;

};

Infos_t.prototype.AddShow = function(parent){
    var container = document.createElement('div');
    var text = document.createElement('h4');
    text.textContent = 'Spectacle : ';
    container.appendChild(text);
    this.title = document.createElement('h3');
    this.title.className = 'infos_title';

    this.place = document.createElement('h5');
    this.place.className = 'infos_place';
    this.place.textContent = 'Lieu : ???';

    this.available = document.createElement('h5');
    this.available.className = 'infos_number';
    this.available.textContent = 'Disponibles : ???';

    container.appendChild(this.title);
    container.appendChild(this.place);
    container.appendChild(this.available);
    parent.appendChild(container);

};

Infos_t.prototype.OnChangeDate = function(){

    var showdate = GetDataByKeyValue('spectacledate', 'id', app.infos.dateCombo.selector.value);
    var placeID = showdate['place_id'];
    var place = GetDataByKeyValue('place', 'id', placeID);
    var capacity = place['capacity'];
    var nb = capacity - showdate['sold'];
    var available = document.querySelector('.infos_number');
    available.textContent = 'Disponibles : '+nb;
    var elem = document.querySelector('.infos_place');
    elem.textContent = 'Lieu : '+place['name'];

}

Infos_t.prototype.SetShow = function(showID){
    var show = GetDataByKeyValue('spectacle', 'id', showID);
    var title = this.title;
    title.textContent = show['name'];
    var place = this.place;
    place.textContent = 'Lieu : ???';
    var available = this.available;
    available.textContent = 'Disponibles : ???';
}

Infos_t.prototype.FormatDate = function(date, time){
    var D = new Date(date);
      
    var day = D.getDate();
    var month = D.getMonth();
      
    return DAYS[D.getDay()] + ' ' + day +'  '+ MONTHS[month] + '\n' + time;
}

Infos_t.prototype.SetDates =  function(showID){
    var items = new Array();
    for(var d in DATA_DATAS['spectacledate']){
        var dt = DATA_DATAS['spectacledate'][d];
        if(dt['show_id'] == showID)
            items.push({
                label: this.FormatDate(dt['date'], dt['time']),
                value: dt['id'],
                callback: this.OnChangeDate
            });
    }
    this.dateCombo.SetItems(items, INFO_SELECT_DATE);
}

Infos_t.prototype.SetDate =  function(dateID){
    var date = GetDataByKeyValue('spectacledate', 'id', dateID);
    this.dateCombo.selector.textContent = this.FormatDate(date['date'], date['time']);
    this.dateCombo.selector.value = dateID;
}

Infos_t.prototype.AddDate = function(parent){
    var items = [
        {
            label: INFO_SELECT_DATE,
            value: 0,
            callback: null
        }
    ]
    
    var container = document.createElement('div');
    var text = document.createElement('h4');
    text.textContent = 'Date : ';
    container.appendChild(text);
    this.dateCombo = new Combo_t(container, items);
    parent.appendChild(container);
    return container;
};

Infos_t.prototype.AddTokens = function(parent){
    var container = document.createElement('div');
    var text = document.createElement('h4');
    text.textContent = 'Nb places : ';
    container.appendChild(text);

    var column1 = document.createElement('div');
    column1.style.display = 'inline-block';
    column1.style.position = 'relative';
    column1.style.width = '60%';
    column1.style.height = '100%';
    column1.style.left = '0px';
    column1.style.top = '0px';

    var column2 = document.createElement('div');
    column2.style.position = 'relative';
    column2.style.display = 'inline-block';
    column2.style.width = '25%';
    column2.style.height = '100%';
    column2.style.left = '5%';
    column2.style.top = '0px';
    column2.style.verticalAlign = 'middle';

    var nb = document.createElement('div');
    nb.id = 'infos_num';
    nb.textContent = '0';
    nb.style.backgroundColor = 'white';
    nb.style.fontSize = '2em';
    nb.style.color = 'black';
    nb.style.width = '100%';
    nb.style.height = '100%';
    nb.style.textAlign = 'right';
    column2.appendChild(nb)

    this.AddButton(column1, 'infos_btn', '+', this.OnAdd);
    this.AddButton(column1, 'infos_btn', '-', this.OnSub);

    container.appendChild(column1);
    container.appendChild(column2);
    parent.appendChild(container);
    return container;
}

Infos_t.prototype.AddValidate = function(parent){
    var container = document.createElement('div');
    var text = document.createElement('h4');
    text.textContent = 'Le choix : ';
    container.appendChild(text);
    this.AddButton(container, 'infos_btn', 'Valider', this.OnReservate);
    this.AddButton(container, 'infos_btn', 'Abandonner', this.OnAbandonate);
    parent.appendChild(container);
}

Infos_t.prototype.GetDate = function(){
    return GetDataByKeyValue('spectacledate', 'id', app.infos.dateCombo.selector.value);
}
Infos_t.prototype.GetCurrentDate = function(){
    return this.dateCombo.selector.textContent;
}

Infos_t.prototype.GetCurrentShow = function(){
    return this.title.textContent;
}

Infos_t.prototype.OnReservate = function(){
    var num = document.querySelector('#infos_num');
    var N = parseInt(num.textContent);
    var currentDate = app.infos.GetCurrentDate() ;
    var currentShow = app.infos.GetCurrentShow();
    if(currentDate == INFO_SELECT_DATE){
        alert('Vous devez selectionnez une date!');
        return;
    }
    else if(N == 0){
        alert('Vous ne pouvez reservez ZERO places :) !');
        return;
    }
    alert(N+' places pour le spectacle \n'+currentShow+'\n ont été ajouté a votre panier\nVous pouvez maintenant réserver d\'autres places ou procéder a la validation du panier');
    var showdate = app.infos.GetDate();
    app.user.AddTokens(showdate['id'], N);
    OnHideInfos();
}

Infos_t.prototype.OnAbandonate = function(){
    OnHideInfos();
}

Infos_t.prototype.OnAdd = function(e){
    var num = document.querySelector('#infos_num');
    var value = parseInt(num.textContent);
    value += 1;
    if(value>5){
        alert('Vous ne pouvez reservez plus de 5 places pour un spectacle!');
        value = 5;
    }
    num.textContent = value;

}

Infos_t.prototype.OnSub = function(e){
    var num = document.querySelector('#infos_num');
    var value = parseInt(num.textContent);
    value -= 1;
    if(value<0){
        value = 0;
    }
    num.textContent = value;
};

Infos_t.prototype.AddButton = function(parent, className, label, callback){
    var btn = document.createElement('div');
    btn.href = "#";
    btn.onclick = callback;
    btn.textContent = label;
    btn.className = className;
    parent.appendChild(btn);
    return btn;
};

Infos_t.prototype.Mount = function(elem){
    this.elem.appendChild(elem);
    //this.addBtn = document.createElement('div');
};
