
function CreateIcon(){
    var img = new Image(50, 75);

}

function initMap() {

    var places = DATA_DATAS['place'];
    var accumx = 0, accumy = 0;
    for(var p in places){
        accumx += places[p]['latitude'];
        accumy += places[p]['longitude'];
    }
    accumx /= places.length;
    accumy /= places.length;
    var mymap = L.map('map').setView([accumx, accumy], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(mymap);
	

    for(var p in places){
        var marker = L.marker([places[p]['latitude'], places[p]['longitude']]).addTo(mymap);
        marker.bindPopup(places[p]['name']);
    }
}



app.content.Clear();
var map = document.createElement('div');
map.id = 'map';
app.content.Mount(map)
app.panel.SetMode(APP_MODE);
initMap();


