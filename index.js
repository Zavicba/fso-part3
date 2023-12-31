const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('bodyTkn', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyTkn'))
app.use(cors())
app.use(express.static('build'))

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

const checkBody = (body) => {
    const keys = Object.keys(body)

    if (!keys.includes("name") || !keys.includes("number")) {
        return "one or more fields are missing"
    }

    const alreadyExist = persons.filter(person => body.name === person.name)

    if (alreadyExist.length) {
        return `There is already a person with the name ${body.name}`
    }

    return ""
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
    const existPerson = persons.find(person => person.id === id)

    if (existPerson) {
        persons = persons.filter(person => person.id !== id)
        console.log("delete success")
        res.send({message: `person with id ${id} deleted successfully`})
    } else {
        res.status(400).json({
            error: `not found person with id: ${id}`
        })
    }
})

app.post('/api/persons', (req, res) => {
    const checkPerson = checkBody(req.body)

    if (checkPerson !== "") {
        return res.status(400).json({
            error: checkPerson
        })
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000),
        ...req.body
    }

    persons.push(newPerson)

    res.status(200).send(persons)
})

const PORT = process.env.PORT ?? 8443

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
