import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'mydb',
});
// Ruta para obtener las conversaciones (el async es para utilizar el await)
app.get('/api/conversations', async (req, res) => {
  try {
    //Consulta a la base de datos (el await se queda esperando una respuesta de la base de datos)
    const result = await pool.query('SELECT * FROM conversations');
    //Envia el resultado en formato JSON a el cliente
    res.json(result.rows);
    //En caso de error mostrará uno de los siguentes mensajes (dependiendo del tipo de error)
  } catch (err) {
    console.error('Error al obtener las conversaciones:', err.message);
    res.status(500).send('Error en la base de datos');
  }
});

// Ruta para crear una nueva conversación (el async es para utilizar el await)
app.post('/api/conversations', async (req, res) => {
  //Esper a que el frontend le envie un objeto con: title, messages y date
  const { title, messages, date } = req.body;

  try {
    //Cuano lo reciba insertara el objeton la base de datos
    const result = await pool.query(
      'INSERT INTO conversations (title, messages, date) VALUES ($1, $2, $3) RETURNING *',
      [title, JSON.stringify(messages), date]
    );
    //El status(201) singinfica que se ha creado con exito. Envia la conversación recien creada al cliente
    res.status(201).json(result.rows[0]);
    //En caso de error mostrará uno de los siguentes mensajes
  } catch (error) {
    console.error('Error al guardar la conversación:', error);
    res.status(500).json({ error: 'Error al guardar la conversación' });
  }
});

// Ruta para actualizar una conversación existente (el async es para utilizar el await)
app.put('/api/conversations/:id', async (req, res) => {
  //Obtiene datos
  const id = parseInt(req.params.id);
  const { title, messages, date } = req.body;

  try {
    /*Actualiza la fila en la tabla conversations con los valores nuevos.
    messages se convierte a texto porque en PostgreSQL JSONB espera un string.
    RETURNING * hace que se devuelva la fila ya actualizada.*/
    const result = await pool.query(
      'UPDATE conversations SET title = $1, messages = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, JSON.stringify(messages), date, id]
    );
    //Si no encuentra ninguna fila con ese id, devolverá un error
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }
    //Devuelve la conversacion actualizada
    res.json(result.rows[0]);
    //En caso de error mostrara uno de los siguientes errores
  } catch (err) {
    console.error('Error al actualizar conversación:', err);
    res.status(500).json({ error: 'Error al actualizar conversación' });
  }
});

// Ruta para borrar todas las conversaciones (el async es para utilizar el await)
app.delete('/api/conversations', async (req, res) => {
  try {
    //Borra todas las conversaciones de la base de datos
    await pool.query('DELETE FROM conversations');
    //Muestra ell mensaje de que han sido borradas
    res.json({ message: 'Todas las conversaciones han sido eliminadas' });
    //Si encuentra algun error mostrará uno de los siguientes mensajes 
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
