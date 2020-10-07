import React from "react";

const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  number,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input text="name:" value={newName} onChange={handleNameChange} />
      <Input text="number:" value={number} onChange={handleNumberChange} />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
