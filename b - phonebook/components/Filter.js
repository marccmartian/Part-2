import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter show with <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
