
var COMBO_DATA = null;
function OnComboMouseDown(e){
    // check if click item
    var item = e.target;
    var items = COMBO_DATA.querySelectorAll('.combo_item');
    for(var i in items){
        if(items[i] == item){
            var p = COMBO_DATA.parentNode;
            var a = p.querySelector('a');
            a.textContent = items[i].textContent;
            a.value = items[i].value
            if(items[i].hasOwnProperty('callback'))
            {
                items[i].callback();
            }
        }
    }
    if(COMBO_DATA){
        COMBO_DATA.parentNode.removeChild(COMBO_DATA);
    }
    COMBO_DATA = null;
    window.removeEventListener('mousedown', OnComboMouseDown);
    window.removeEventListener('touchend', OnComboMouseDown)
}

function Combo_t(parent, items){
    this.elem = document.createElement('div');
    this.elem.className = 'combo_menu';

    this.selector = document.createElement('a');
    this.selector.className = 'combo_item';
    this.selector.href = '#';
    this.selector.onmouseover = this.OnMouseOver;
    this.selector.onclick = this.OnClick;
    
    this.selector.textContent = items[0]['label'];
    this.selector.dateID = items[0]['id'];
    this.selector.items = items;
    this.elem.appendChild(this.selector);
    parent.appendChild(this.elem);
}

Combo_t.prototype.SetItems = function(items, defaultValue){
    this.selector.items = items;
    this.selector.textContent = defaultValue;
}

Combo_t.prototype.SetValue = function(dateID){
    for(var i in this.selector.items){
        if(this.selector.items[i].value = dateID){
            this.selector.textContent = this.selector.items[i].label;
            this.selector.value = this.selector.items[i].value;
            break;
        }
    }
}

Combo_t.prototype.OnClick = function(e){
    e.preventDefault();
    var items = e.target.items;
    var container = document.createElement('div');
    for(var i in items){
        var item = document.createElement('div');
        item.className = 'combo_item';
        item.textContent = items[i].label;
        item.value = items[i].value;
        item.callback = items[i].callback;
        container.appendChild(item);
    }

    container.style.position = 'absolute';
    container.style.left = window.scrollX + e.target.getBoundingClientRect().left;
    container.style.top = window.scrollY + e.target.getBoundingClientRect().top;
    container.style.zIndex = 999999;
    e.target.parentNode.appendChild(container);

    COMBO_DATA = container;
    window.addEventListener('mousedown', OnComboMouseDown);
    window.addEventListener('touchend', OnComboMouseDown);
}