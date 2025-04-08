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
      [title, JSON.stringify(messages), date]  // 👈 SERIALIZAMOS messages aquí
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar la conversación:', error);
    res.status(500).json({ error: 'Error al guardar la conversación' });
  }
});

// Ruta para actualizar una conversación existente
app.put('/api/conversations/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, messages, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE conversations SET title = $1, messages = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, JSON.stringify(messages), date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar conversación:', err);
    res.status(500).json({ error: 'Error al actualizar conversación' });
  }
});

// Ruta para borrar todas las conversaciones
app.delete('/api/conversations', async (req, res) => {
  try {
    await pool.query('DELETE FROM conversations');
    res.json({ message: 'Todas las conversaciones han sido eliminadas' });
  } catch (err) {
    console.error('Error al eliminar conversaciones:', err);
    res.status(500).json({ error: 'Error al eliminar conversaciones' });
  }
});

// Iniciar el servidor Express en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
