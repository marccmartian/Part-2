import React from "react";

const Notification = ({ message, color }) => {
  const styleNotify = {
    color: `${color}`,
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) return null;

  return (
    <>
      <div style={styleNotify}>{message}</div>
    </>
  );
};

export default Notification;
