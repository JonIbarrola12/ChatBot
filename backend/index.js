import express from 'express';
import cors from 'cors';
import pkg from 'pg';  // Importación por defecto
const { Pool } = pkg;  // Extrae 'Pool' del objeto importado

const app = express();
app.use(cors());
app.use(express.json());  // Necesario para parsear los datos JSON del cuerpo

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',  // Cambia por tu usuario
  password: 'password', // Cambia por tu contraseña
  database: 'mydb',  // Cambia por tu base de datos
});
// Ruta para obtener las conversaciones
app.get('/api/conversations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conversations');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las conversaciones:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Ruta para crear una nueva conversación
app.post('/api/conversations', async (req, res) => {
  const { title, messages, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO conversations (title, messages, date) VALUES ($1, $2, $3) RETURNING *',
      [title, JSON.stringify(messages), date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar la conversación:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Ruta para actualizar una conversación existente
app.put('/api/conversations/:id', async (req, res) => {
  const { id } = req.params;
  const { title, messages, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE conversations SET title = $1, messages = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, JSON.stringify(messages), date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar la conversación:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Ruta para borrar todas las conversaciones
app.delete('/api/conversations', async (req, res) => {
  try {
    await pool.query('DELETE FROM conversations');
    res.send('Historial de conversaciones borrado');
  } catch (err) {
    console.error('Error al borrar las conversaciones:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Iniciar el servidor Express en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
