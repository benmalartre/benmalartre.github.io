class Passive_t extends Object_t{
    constructor(type, x, y, width, height){
        elem = document.createElement('canvas');
        elem.style.position = 'absolute';
        elem.style.display = 'inline-block';
        elem.style.zIndex = 99;
        elem.width = width;
        elem.height = height;

        document.getElementById('GameContainer').appendChild(elem);

        super(type, x, y, 0, elem);
    }

}

