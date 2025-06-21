const express = require('express');
const app = express();
app.use(express.json())

const PORT = 3000

const books = [
  { id: 1, title: 'Абай жолы', author: 'М. Әуезов', year: 1942 },
  { id: 2, title: 'Менің атым Қожа', author: 'Б. Соқпақбаев', year: 1957 }
];

app.get('/api/books', (req, res) => {
  res.json(books);
});



app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title немесе Author бос болмауы тиіс' });
  }

  const newBook = {
    id: books.length + 1,
    title: title,
    author: author,
    year: year
  };

  books.push(newBook);

  res.status(201).json(newBook);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});