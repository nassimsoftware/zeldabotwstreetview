// var spotsData = [
//     {
//         y: 400,
//         x: 700,
//         locationName: "Hyrule Field"
//     },
//     {
//         y: 210,
//         x: 330,
//         locationName: "Near Gerudo Canyon"
//     }
// ];



async function mapSpotsToMap() {
    const spotsData = await (await fetch('./spotsData.json')).json();
    for (let spot of spotsData) {
        let position = L.latLng([spot.y, spot.x]);
        L.marker(position).addTo(map)
        .bindPopup(spot.locationName)
        .on('click', () => {
            console.log(spot.locationName);
        })
    }
}


var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -0.5
});

var bounds = [[0, 0], [1000, 2000]];
var image = L.imageOverlay('map.jpg', bounds).addTo(map);
map.fitBounds(bounds);

mapSpotsToMap();

// var sol = L.latLng([400, 600]);

// L.marker(sol).addTo(map)
// .bindPopup('Hyrule field')
// .on('click', onClick);