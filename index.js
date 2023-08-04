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

function getDate() {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'long',
    }

    return new Date().toLocaleString('en-US', options).replace(/,/g, '')
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
        <div> 
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${getDate()}</p>
        </div>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
