document.getElementById('submit').addEventListener('click', () => {
    parent.window.location.href = "https://forms.gle/sQbwSUEczAYC68W8A";
});

document.getElementById('more').addEventListener('click', () => {
    document.getElementById('links').remove('hide');
});


function initStreetViewer(panoramaData) {
    document.getElementById('zoom-in').addEventListener('click', function(e) {
        panoramaViewer.setHfov(panoramaViewer.getHfov() - 10);
    });
    document.getElementById('zoom-out').addEventListener('click', function(e) {
        panoramaViewer.setHfov(panoramaViewer.getHfov() + 10);
    });
    document.getElementById('fullscreen').addEventListener('click', function(e) {
        panoramaViewer.toggleFullscreen();
    });

    var controls = document.getElementById('controls');
    let panorama = document.getElementById('panorama');
    panorama.classList.remove('hide');
    controls.classList.remove('hide');

    const panoramaViewer = pannellum.viewer('panorama', panoramaData);
    
    
    

    let map = document.getElementById('map'); 
    map.classList.add('hide');
    
    let btn = document.getElementById('goBack');
    btn.classList.remove('hide');
    btn.addEventListener('click', () => {
        panoramaViewer.destroy();
        panorama.classList.add('hide');
        controls.classList.add('hide');
        map.classList.remove('hide');
        setLocationName("Zelda Breath of The Wild Street View");
    })

}



async function mapSpotsToMap(locationNameSearch) {
    const spotsData = await (await fetch('./spotsData.json')).json();
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

//add zoom control with your options
L.control.zoom({
    position:'topright'
}).addTo(map);

var bounds = [[0, 0], [1000, 2000]];
var image = L.imageOverlay('map.jpg', bounds).addTo(map);
map.fitBounds(bounds);
////
mapSpotsToMap();