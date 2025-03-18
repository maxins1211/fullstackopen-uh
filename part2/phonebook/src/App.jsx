import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilterName(filterValue);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filterValue)
      )
    );
  };
  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonObject = { name: newName, number: newPhone };
      const updatedPersons = persons.concat(newPersonObject);
      setPersons(updatedPersons);
      setFilteredPersons(
        updatedPersons.filter((person) =>
          person.name.toLowerCase().includes(filterName)
        )
      );
      setNewName("");
      setNewPhone("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input onChange={handleFilterChange} value={filterName} />
      <h2>Add a new</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} /> <br></br>
          number: <input onChange={handlePhoneChange} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
