const express = require('express');
const cors = require('cors');
const pool = require('./db')
const app = express();
app.use(cors())
app.use(express.json())
const PORT = 3000

app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('select * from books');
    res.json(result.rows);
  } catch (e) {
      res.status(500).json({error: 'Сервер қатесі'})
  }
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Кітап табылмады');
    }
    res.json(result.rows[0]);
  } catch (e) {
    res.status(404).json({error: 'Сервер қатесі'})
  }
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})