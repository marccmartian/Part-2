import React, { useEffect, useState } from "react";
import personServices from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  //READ
  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  //display alert if the person exists
  let verifyName = persons.find((person) => person.name === newName);

  const handleSubmit = (event) => {
    event.preventDefault();

    //UPDATE
    const personObject = persons.filter((p) => p.name === newName);
    const personToUpdate = personObject[0];
    const changedPerson = { ...personToUpdate, number: number };

    const updatePerson = () => {
      const answer = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (answer) {
        personServices
          .update(personToUpdate.id, changedPerson)
          .then((returnedPerson) => {
            setNotifyMessage(`${newName}'s number has been changed`);
            setTimeout(() => setNotifyMessage(null), 5000);
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
    };

    verifyName
      ? updatePerson()
      : personServices
          .create({ name: newName, number: number }) //CREATE
          .then((returnedPerson) => {
            setNotifyMessage(`Added ${newName}`);
            setTimeout(() => setNotifyMessage(null), 3000);
            setPersons([...persons, returnedPerson]);
          });
    setNewName("");
    setNumber("");
  };

  //search a name from array persons
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  const dataFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName)
  );

  //DELETE
  const handleDeletePerson = (id, name) => {
    const answer = window.confirm(`Delete ${name}?`);
    if (answer) {
      personServices.deletePerson(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notifyMessage} color="green" />
      <Notification message={errorMessage} color="red" />

      <Filter value={filterName} onChange={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      {filterName === "" || dataFilter.length === 0 ? (
        <Persons array={persons} handleDeletePerson={handleDeletePerson} />
      ) : (
        <Persons array={dataFilter} />
      )}
    </div>
  );
}

export default App;
