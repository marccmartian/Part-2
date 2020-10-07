import React, { useEffect, useState } from "react";
import personServices from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  //READ
  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

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
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            )
          );
      }
    };

    verifyName
      ? updatePerson()
      : personServices
          .create({ name: newName, number: number }) //CREATE
          .then((returnedPerson) => setPersons([...persons, returnedPerson]));
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
