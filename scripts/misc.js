//----------------------------------------------------------------------------
// make asynchronous request
function MAKE_REQUEST(method, url, args, type, callback) {
    var xhttp = new XMLHttpRequest();
    if(callback){
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };
        xhttp.open(method, url, true);
        if(type!=null)xhttp.overrideMimeType(type);
        xhttp.send(args);
    }
    else{
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var func = new Function(this.responseText);
                func();
            }
        };
        xhttp.open(method, url, true);
        if(type!=null)xhttp.overrideMimeType(type);
        xhttp.send(args);
    }
}

//----------------------------------------------------------------------------
// make asynchronous request
function loadJSON(object, callback, url, asynchronous=true) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', url, asynchronous);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(object, xobj.responseText);
        }
    };
    xobj.send(null);  
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
    });
}
