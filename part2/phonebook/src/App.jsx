import { useState } from "react";

const App = () => {
  const personArr = [{ name: "Arto Hellas" }];
  const [persons, setPersons] = useState(personArr);
  const [newName, setNewName] = useState("");
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newPersonObject = { name: newName };
    setPersons(personArr.concat(newPersonObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
