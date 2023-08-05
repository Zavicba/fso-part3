const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person => person.id === id)

    if (person.length) {
        res.send(person)
    } else {
        res.status(400).json({
            error: `not found person with id: ${id}`
        })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (persons[id]) {
        persons = persons.filter(person => person.id !== id)
        console.log("persons", persons)
        res.send({message: `person with id ${id} deleted successfully`})
    } else {
        res.status(400).json({
            error: `not found person with id: ${id}`
        })
    }
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body

    let isEmptyData = Object.entries(newPerson).length < 2

    if (isEmptyData) {
        return res.status(400).json({
            error: 'empty data'
        })
    }

    newPerson.id = Math.floor(Math.random() * 1000)
    persons.push(newPerson)

    res.send("person added successfully")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
