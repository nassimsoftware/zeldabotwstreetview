var moreBtn = document.getElementById('more');
var panel = document.getElementById('panel');

document.getElementById('submit').addEventListener('click', () => {
    parent.window.location.href = "https://forms.gle/sQbwSUEczAYC68W8A";
});

document.getElementById('more').addEventListener('click', () => {
    panel.classList.remove('hide');
    moreBtn.classList.add('hide');
});

document.getElementById('hide').addEventListener('click', () => {        
    panel.classList.add('hide');
    moreBtn.classList.remove('hide');
});

function isMobile(){
    return window.innerWidth <= 856 ? true : false;
}

function initStreetViewer(panoramaData) {
    const panoramaViewer = pannellum.viewer('panorama', panoramaData);
    let panorama = document.getElementById('panorama');
    let controls = document.getElementById('controls');
    let goBack = document.getElementById('goBack');
    let map = document.getElementById('map'); 
    
    document.getElementById('zoom-in').addEventListener('click', function(e) {
        panoramaViewer.setHfov(panoramaViewer.getHfov() - 10);
    });
    
    document.getElementById('zoom-out').addEventListener('click', function(e) {
        panoramaViewer.setHfov(panoramaViewer.getHfov() + 10);
    });
    
    document.getElementById('fullscreen').addEventListener('click', function(e) {
        panoramaViewer.toggleFullscreen();
    });

    panorama.classList.remove('hide');
    goBack.classList.remove('hide');
    map.classList.add('hide');
    
    // Custom panorama controls
    if(!isMobile()){
        controls.classList.remove('hide');
    }

    goBack.addEventListener('click', () => {

        panoramaViewer.destroy();

        panorama.classList.add('hide');
        controls.classList.add('hide');
        map.classList.remove('hide');

        setLocationName("Search by location");
    })
}

async function mapSpotsToMap() {
    const spotsData = await (await fetch('./assets/data/spotsData.json')).json();
    for (let spot of spotsData) {
        let position = L.latLng([spot.y, spot.x]);

        L.marker(position).addTo(map)
        .bindPopup(spot.locationName)
        .on('click', () => {
            initStreetViewer(spot.panoramaData);
            setLocationName(spot.locationName);
        })
    }
}

// Set location name on panel
function setLocationName(locationName){
    document.querySelector("#localName").innerHTML = locationName;
}

//creates map 
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -0.5,
    zoomControl: false
});

//add custon zoom control 
if(!isMobile()){
    L.control.zoom({
        position:'topright'
    }).addTo(map);
}

var bounds = [[0, 0], [1000, 2000]];
var image = L.imageOverlay('./assets/maps/map.jpg', bounds).addTo(map);
map.fitBounds(bounds);

mapSpotsToMap();