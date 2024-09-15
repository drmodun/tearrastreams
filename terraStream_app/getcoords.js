$(document).ready(function() {
    $('#coordinates').on('submit', function(event) {
        // Prevenir el envío del formulario para manejarlo con jQuery
        event.preventDefault();

        // Obtener las coordenadas
        var coordinates = draw.getAll().features[0].geometry.coordinates[0];
        coordinates = JSON.stringify(coordinates);
        // Redirigir a la página con las coordenadas en la URL
        window.location.href = '/terraStream_app/dashboard.html?coords=' + coordinates;
    });
});
