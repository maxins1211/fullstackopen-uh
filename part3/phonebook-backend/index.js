require("dotenv").config();
const Contact = require("./models/contact");
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT;
let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.static("dist"));
app.use(express.json());

morgan.token("req-body", (req) => JSON.stringify(req.body));

app.use(morgan(":method :url :status - :response-time ms :req-body"));

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
});

app.get("/info", (req, res) => {
  const entryNumber = phonebook.length;
  const currentDate = new Date();
  const output = `<p>Phonebook has info for ${entryNumber} people 
    </p> <p>${currentDate}</p>`;
  res.send(output);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phonebook.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 100);
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(404).json({ error: "Name or number is missing" });
  } else {
    if (phonebook.find((person) => person.name === newPerson.name)) {
      return res.status(404).json({ error: "name must be unique" });
    }
    newPerson.id = id;
    phonebook.push(newPerson);
    return res.json(newPerson);
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
