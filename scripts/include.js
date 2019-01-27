//var TIMESTAMP = 

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

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

var include = function(url, callback){
 
    /* check url exists */
    if(!UrlExists(url)) alert(url +' does NOT exists!!');
    else
    {
        /* on crée une balise<script type="text/javascript"></script> */
        var script = document.createElement('script');
        script.type = 'text/javascript';
    
        /* On fait pointer la balise sur le script qu'on veut charger
        avec en prime un timestamp pour éviter les problèmes de cache
        */
    
        script.src = url + '?' + (new Date().getTime());
    
        /* On dit d'exécuter cette fonction une fois que le script est chargé */
        if (callback) {
            script.onreadystatechange = callback;
            script.onload = script.onreadystatechange;
        }
    
        /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    
}