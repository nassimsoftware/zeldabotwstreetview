
function initStreetViewer(panoramaData) {
 
    let panorama = document.getElementById('panorama');
    panorama.classList.remove('hide');

    const panoramaViewer = pannellum.viewer('panorama', panoramaData);
    
    let map = document.getElementById('map'); 
    map.classList.add('hide');
    
    let btn = document.getElementById('goBack')
    btn.classList.remove('hide');
    btn.addEventListener('click', () => {
        panoramaViewer.destroy();
        panorama.classList.add('hide');
        map.classList.remove('hide');
        btn.classList.add('hide');
        setLocationName("");
    })

}



async function mapSpotsToMap() {
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
    minZoom: -0.5
});

var bounds = [[0, 0], [1000, 2000]];
var image = L.imageOverlay('map.jpg', bounds).addTo(map);
map.fitBounds(bounds);
////
mapSpotsToMap();