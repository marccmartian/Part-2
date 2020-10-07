import React from "react";

const DeleteBtn = ({ onClick }) => {
  return <button onClick={onClick}>delete</button>;
};

const Persons = ({ array, handleDeletePerson }) => {
  return array.map((item) => (
    <p key={item.id}>
      {item.name} - {item.number}{" "}
      <DeleteBtn onClick={() => handleDeletePerson(item.id, item.name)} />
    </p>
  ));
};

export default Persons;
