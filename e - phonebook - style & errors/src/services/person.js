import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

//CREATE
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

//READ
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//UPDATE
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

//DELETE
const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, deletePerson, update };
