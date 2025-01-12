var TIMESTAMP = (new Date().getTime());
var NUM_SCRIPTS_LOADING = 0

function fetchStatus( address ) {
    var client = new XMLHttpRequest();
    client.onload = function() {
        // in case of network errors this might not give reliable results
        returnStatus( this.status );
    }
    client.open( "HEAD", address, true );
    client.send();
}

function returnStatus( status ) {
    if ( status === 200 ) {
        console.log( 'file exists!' );
    }
    else {
        console.log( 'file does not exist! status: ' + status );
    }
}

var loaded = function(){
    return (NUM_SCRIPTS_LOADING == 0);
}

var includeScript = function(url, callback){
  function incrementsScriptLoading(){
    NUM_SCRIPTS_LOADING += 1;
  }
  
  function decrementScriptsLoading(){
    NUM_SCRIPTS_LOADING -= 1;
  }

  function postLoad(){
    decrementScriptsLoading();
    if(callback)callback();
  }

  incrementsScriptLoading();
  
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script .onload = callback;
  // On fait pointer la balise sur le script qu'on veut charger
  // avec en prime un timestamp pour éviter les problèmes de cache
  script.src = url //+ '?' + TIMESTAMP;
  document.head.appendChild(script);
  script.onload = postLoad;
  
  decrementScriptsLoading
  
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function includeCSS(url) {
  var css = document.getElementById('css');
  if(!css) {
    css = document.createElement('link');
    css.id = 'css';
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.media = 'screen,print';
    document.getElementsByTagName( 'head' )[0].appendChild( css );
  }
  css.href = url;
}

async function readHTML(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.write(data)
    })
}

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
            return callback(object, xobj.responseText);
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


function addImage(filename, parentname){
	this.img = document.createElement("img");
	this.img.src = filename;
	if(parentname){
		src = getElementById(parentname);
		src.appendChild(this.img)
	}
	else document.body.appendChild(this.img);
}
