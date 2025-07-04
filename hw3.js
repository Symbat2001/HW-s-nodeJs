const express = require('express')
const pool = require('./db')
const app = express()
app.use(express.json())
const PORT = 3000

app.put('/api/instagram/:id', async(req, res) =>{
    const {id} = req.params
    const { username, email} = req.body

    if (!username || !email ) {
        return res.status(400).json({error: 'Мәліметтер толық емес!'})
    }

    try{
        const existingInsta = await pool.query(`select * from instagram where id = $1`, [id])

        if (existingInsta.rows.length === 0) {
            return res.status(404).json({error: 'Қолданушы табылмады!'})
        }

        const result = await pool.query(
            'update instagram set username = $1, email = $2 where id = $3 returning *',
            [username, email, id] )
        res.status(200).json({message: 'Мәліметтер сәтті жаңартылды!', data: result.rows[0]})
    }catch(e){
        return res.status(500).json({error: "Сервер қатесі!"})
    }
})

app.put('/api/instagram/:id/password', async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    if (!password) {
        return res.status(400).json({ error: 'Құпиясөз енгізілмеген!' })
    }

    try {
        const existingInsta = await pool.query(`seelect * from instagram where id = $1`, [id])

        if (existingInsta.rows.length === 0) {
            return res.status(404).json({ error: 'Қолданушы табылмады!' })
        }

        const result = await pool.query(
            'update instagram set password = $1 where id = $2 returning *',
            [password, id]
        )
        res.status(200).json({ message: 'Құпиясөз жаңартылды!', data: result.rows[0] })
    } catch (e) {
        return res.status(500).json({ error: 'Сервер қатесі!' })
    }
})

app.delete('/api/instagram/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('delete from instagram where id = $1 returning *', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Қолданушы табылмады!' })
        }

        res.status(200).json({ message: `Id-ы ${id} болған қолданушы өшірілді!`, data: result.rows[0] })
    } catch (e) {
        return res.status(500).json({ error: 'Сервер қатесі!' })
    }
})

app.listen (PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})