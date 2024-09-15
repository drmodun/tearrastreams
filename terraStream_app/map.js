mapboxgl.accessToken = 'pk.eyJ1Ijoid29uZGVyZmVlbCIsImEiOiJjbTEyZmdnajkwdmU3MmtzOHlvYXYyZHJvIn0.2PlXKgkiDN0s5P908aGSNQ'; // Replace with your actual Mapbox access token

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // Replace with the desired Mapbox style
    center: [2.3505089979081504, 41.560252961344816], // Default center location
    zoom: 5, // Default zoom level
});

const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    },
    defaultMode: 'draw_polygon',
    max_points: 4 // Agregamos esta opción para limitar a 4 puntos
});

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea() {
    const data = draw.getAll();
    if (data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates[0];
        if (coordinates.length != 5) {
            alert('No se pueden establecer más de 4 puntos');
            draw.deleteAll();
            return;
        }
        $("#coordinate1").val(`${coordinates[0][0]}, ${coordinates[0][1]}`);
        $("#coordinate2").val(`${coordinates[1][0]}, ${coordinates[1][1]}`);
        $("#coordinate3").val(`${coordinates[2][0]}, ${coordinates[2][1]}`);
        $("#coordinate4").val(`${coordinates[3][0]}, ${coordinates[3][1]}`);
        //const area = turf.area(data);
        //const roundedArea = Math.round(area * 100) / 100;
        //console.log(`El área del rectángulo es de ${roundedArea} metros cuadrados`);
    }
}

// Get the user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Center the map on the user's location
            map.setCenter([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
            console.error('Error getting location:', error);
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
}