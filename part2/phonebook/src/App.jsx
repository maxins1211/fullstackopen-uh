import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);
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
      <Filter
        handleFilterChange={handleFilterChange}
        filterName={filterName}
      ></Filter>
      <h2>Add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}></Persons>
    </div>
  );
};

export default App;
