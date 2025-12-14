// server.js - Configurado para MySQL

const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión de promesas para 'async/await'
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE MYSQL ---
const dbConfig = {
    host: 'localhost',
    user: 'root',           
    password: '1234', 
    database: 'PruebaDB', // <-- ¡Nombre de BD cambiado!
    port: 3306              
};
// ------------------------------

// Endpoint para obtener todas las películas
app.get('/api/peliculas', async (req, res) => {
    let connection;

    try {
        // Conectar a la base de datos usando el pool de conexiones
        connection = await mysql.createConnection(dbConfig);
        
        // Ejecutar la consulta SQL (mysql2 devuelve un array con [filas, campos])
        const [rows, fields] = await connection.execute('SELECT PeliculaID, Nombre, Anio, Director, Genero FROM Peliculas');
        
        // Enviar los resultados (rows contiene los datos)
        res.json({
            success: true,
            data: rows
        });

    } catch (err) {
        // Manejo de errores de conexión o consulta
        console.error("Error al conectar o ejecutar la consulta:", err);
        res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor al obtener productos.',
            error: err.message 
        });
    } finally {
        // Es crucial cerrar la conexión si la abriste
        if (connection) {
            await connection.end(); 
        }
    }
});



// Endpoint de prueba (Ruta principal)
app.get('/', (req, res) => {
    res.send('Servidor API Node.js/Express con MySQL funcionando. Usa /api/Peliculas para obtener datos.');
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor Node.js con MySQL escuchando en http://localhost:${port}`);
    console.log(`   - Endpoint de productos: http://localhost:${port}/api/peliculas`);
});