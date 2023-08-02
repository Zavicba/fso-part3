const express = require('express')
const app = express()

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "33-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "123-45678900"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "111-1111456789"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
