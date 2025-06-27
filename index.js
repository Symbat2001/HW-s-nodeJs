const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3000

const destinations = [
    { id: 1, name: 'Париж', country: 'Франция', description: 'Жарықтар қаласы', price: 1200 },
    { id: 2, name: 'Токио', country: 'Жапония', description: 'Күншығыс елі', price: 1500 }
]

app.get('/destinations', (req, res) => {
    res.json(destinations)
})

app.get('/destinations/:id', (req, res) => {
    const id = req.params.id
    const destination = destinations.find(d => d.id == parseInt(id))
    if (!destination) {
        res.status(404).json({ message: 'Бул бағыт табылмады!' })
    }
    res.json(destination)
})

app.post('/destinations',(req, res) => {
    const { name, country, description, price } = req.body

    if (!name || !country || !description || !price) {
        return res.status(400).json({ message: 'Барлық ақпарат толтырылмаған!' })
    }

    const newDestinations = {
        id: destinations.length + 1,
        name: name,
        country: country,
        description: description,
        price: price
    }

    destinations.push(newDestinations)
    res.json(newDestinations)
})

app.put('/destinations/:id', (req, res) => {
    const id = req.params.id
    const destination = destinations.find(d => d.id == parseInt(id))

    if (!destination) {
        res.status(404).json({ message: 'Бул бағыт табылмады!' })
        
    }
    const { name, country, description, price } = req.body
    destination.name = name
    destination.country = country
    destination.description = description
    destination.price = price

    res.json(destination)

})

app.delete('/destinations/:id', (req, res) => {
    const id = req.params.id

    const index = destinations.findIndex(d => d.id == parseInt(id))
    if (index === -1) {
        return res.status(404).json({ message: 'Бул бағыт табылмады!'})
    }

    destinations.splice(index,1)

    return res.json({message: 'Бағыт өшірілді!'})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})