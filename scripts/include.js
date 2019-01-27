var TIMESTAMP = (new Date().getTime());
var NUM_LOADING = 0

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
    return (NUM_LOADING == 0);
}

var include = function(url, callback){
 
    /* on crée une balise<script type="text/javascript"></script> */
    var script = document.createElement('script');
    script.type = 'text/javascript';

    /* On fait pointer la balise sur le script qu'on veut charger
    avec en prime un timestamp pour éviter les problèmes de cache
    */
    script.src = url + '?' + TIMESTAMP;

    if(callback){
        script.onreadystatechange = callback;
    }
    else{
        NUM_LOADING += 1;
        script.onreadystatechange = function decrementLoading(callback){
            console.log("DECREMENT LOADING SCRIPTS : "+ NUM_LOADING)
            NUM_LOADING -= 1;
        };
    }
    script.onload = script.onreadystatechange;

    /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
    document.getElementsByTagName('head')[0].appendChild(script);

    
}