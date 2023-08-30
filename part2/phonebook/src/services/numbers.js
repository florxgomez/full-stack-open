import axios from 'axios';
const baseUrl = 'http://localhost:3001/numbers';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const createNumber = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

const updateNumber = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

const deleteNumber = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.statusText);
};

export default { getAll, createNumber, deleteNumber, updateNumber };
