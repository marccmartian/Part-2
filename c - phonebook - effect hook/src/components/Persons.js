import React from "react";

const Persons = ({ array }) => {
  return array.map((item, index) => (
    <p key={index}>
      {item.name} - {item.number}
    </p>
  ));
};

export default Persons;
