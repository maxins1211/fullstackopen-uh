const express = require('express')
const app = express();

const PORT = 3001;
let phonebook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello from backend</h1>")
})

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
})

app.listen(PORT, () => {
    console.log("Server is running at port ", PORT);
})
