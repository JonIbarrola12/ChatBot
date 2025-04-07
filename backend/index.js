import express from 'express';
import cors from 'cors';
import pkg from 'pg';  // Usamos la importación por defecto
const { Pool } = pkg;  // Extraemos 'Pool' del paquete importado

const app = express();

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',  // Cambia por tu usuario
  password: 'password', // Cambia por tu contraseña
  database: 'mydb',  // Cambia por tu base de datos
});

// Ruta para obtener los items
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los items:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Iniciar el servidor Express en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
