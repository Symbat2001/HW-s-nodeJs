const express = require('express')
const app = express()
app.use(express.json())

const PORT = 3000

const books = [
    { id: 1, title: 'Абай жолы', author: 'М. Әуезов', year: 1942 },
    { id: 2, title: 'Менің атым Қожа', author: 'Б. Соқпақбаев', year: 1957 },
    { id: 3, title: 'Алтын сақа', author: 'Ертегі', year: 1970 },
    { id: 4, title: 'Батырлар жыры', author: 'Халық шығармашылығы', year: 1950 }
]

// app.get('/', (req, res) => {
//     res.send('This is a books page')
// })

app.get('/api/books', (req, res) => {
    const { sort } = req.query;
    let result = [...books];
  
    if (sort === 'asc') {
      result.sort((a, b) => a.year - b.year);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.year - a.year);
    }
  
    res.json(result);
  });


app.get('/api/books/search', (req, res) => {
    const { author } = req.query;
  
    if (!author) {
      return res.status(400).json({ error: 'Автор параметрі қажет' });
    }
  
    const lowerAuthor = author.toLowerCase();
  
    const filteredBooks = books.filter(book =>
      book.author.toLowerCase().includes(lowerAuthor)
    );
  
    res.json(filteredBooks);
  });




app.get('/api/books/:id', (req, res) => {
    const {id } = req.params
    const book = books.find(b => b.id === parseInt(id))

    if (!book) {
        return res.status(404).json({ error: 'Кітап табылмады' });
      }
    
    res.json(book);
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})