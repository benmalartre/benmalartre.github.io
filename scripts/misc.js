//----------------------------------------------------------------------------
// get unique ID
var uniqueID = (function() {
    var id = 0; // This is the private persistent value
    // The outer function returns a nested function that has access
    // to the persistent value.  It is this nested function we're storing
    // in the variable uniqueID above.
    return function() { return id++; };  // Return and increment
 })(); // Invoke the outer function after defining it.

//----------------------------------------------------------------------------
// increment global variable
 var incrementGlobalVariable = (function(gb){
     var lb = gb;
 })

 //----------------------------------------------------------------------------
 // make asynchronous request
 function MAKE_REQUEST(method, url, args, type, callback){
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
   