import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
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
    const findPerson = persons.find((person) => person.name === newName);
    if (findPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = findPerson.id;
        const changedPerson = { ...findPerson, number: newPhone };
        personService
          .updatePerson(id, changedPerson)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === id ? updatedPerson : person
            );
            setPersons(updatedPersons);
            setFilteredPersons(
              updatedPersons.filter((person) =>
                person.name.toLowerCase().includes(filterName.toLowerCase())
              )
            );
            const newMessage = {
              content: "Updated phone number for " + changedPerson.name,
              isError: false,
            };
            console.log(newMessage);
            setMessage(newMessage);
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => {
            if (error.status === 404) {
              const newMessage = {
                content:
                  "Information of " +
                  changedPerson.name +
                  " has already been removed from server",
                isError: true,
              };
              setMessage(newMessage);
              setTimeout(() => setMessage(null), 5000);
            }
          });
      }
    } else {
      const newPersonObject = { name: newName, number: newPhone };
      personService.createPerson(newPersonObject).then((person) => {
        const updatedPersons = persons.concat(person);
        setPersons(updatedPersons);
        setFilteredPersons(
          updatedPersons.filter((person) =>
            person.name.toLowerCase().includes(filterName.toLowerCase())
          )
        );
        setNewName("");
        setNewPhone("");
        const newMessage = {
          content: "Added " + newPersonObject.name,
          isError: false,
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 5000);
      });
    }
  };
  const handleDelete = (id) => () => {
    if (
      window.confirm(
        "Delete " + persons.find((person) => person.id === id).name
      )
    ) {
      personService.deletePerson(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(
          updatedPersons.filter((person) =>
            person.name.toLowerCase().includes(filterName.toLowerCase())
          )
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      ></Persons>
    </div>
  );
};

export default App;
