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

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id).then((result) =>
    res.status(204).end()
  );
});
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(404).json({ error: "Name or number is missing" });
  }

  const newContact = new Contact({ name: body.name, number: body.number });

  newContact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Contact.findById(req.params.id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).end();
      }

      contact.number = number;
      contact.name = name;
      return contact.save().then((updatedContact) => {
        res.json(updatedContact);
      });
    })
    .catch((err) => next(err));
});
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
