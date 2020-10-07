import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
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
}

export default App;
