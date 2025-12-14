// app.js

// URL de tu API de Node.js/Express
const API_URL = 'http://localhost:3000/api/peliculas';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el contenedor donde se mostrarán las películas
    const container = document.getElementById('peliculas-container');
    
    // 2. Definir la función para obtener los datos
    async function cargarPeliculas() {
        try {
            // 3. Realizar la petición GET a la API
            const response = await fetch(API_URL);

            // Verificar si la respuesta fue exitosa (código 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // 4. Convertir la respuesta a formato JSON
            const apiResponse = await response.json();

            // Verificar si la API reportó éxito y si hay datos
            if (apiResponse.success && apiResponse.data) {
                const peliculas = apiResponse.data;
                
                // 5. Iterar sobre cada película y crear su tarjeta HTML
                peliculas.forEach(pelicula => {
                    const card = crearTarjetaPelicula(pelicula);
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<p>No se pudieron cargar los datos de la API.</p>';
            }

        } catch (error) {
            // 6. Manejo de errores (por ejemplo, si el servidor está caído)
            console.error('Error al intentar cargar las películas:', error);
            container.innerHTML = `<p style="color: red;">Error de conexión: Asegúrate que el servidor Node.js (http://localhost:3000) esté activo.</p>`;
        }
    }
    
    // Función auxiliar para crear el elemento HTML de la tarjeta
    function crearTarjetaPelicula(data) {
        const card = document.createElement('div');
        card.className = 'pelicula-card';
        card.setAttribute('data-id', data.PeliculaID); // Útil para futuras funcionalidades

        card.innerHTML = `
            <div class="titulo">${data.Nombre}</div>
            <div class="info"><strong>Director:</strong> ${data.Director}</div>
            <div class="info"><strong>Año:</strong> ${data.Anio}</div>
            <span class="genero">${data.Genero}</span>
        `;
        return card;
    }

    // Llamar a la función principal para iniciar la carga de datos
    cargarPeliculas();
});