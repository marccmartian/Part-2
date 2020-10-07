import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
    verifyName
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: number }]);
  };

  //search a name from array persons
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  const dataFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName)
  );

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
        <Persons array={persons} />
      ) : (
        <Persons array={dataFilter} />
      )}
    </div>
  );
};

export default App;
