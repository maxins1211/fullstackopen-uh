import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const promise = axios.get(baseUrl);
  return promise.then((response) => response.data);
};

const createPerson = (person) => {
  const promise = axios.post(baseUrl, person);
  return promise.then((response) => response.data);
};

const deletePerson = (id) => {
  const url = baseUrl + `/${id}`;
  return axios.delete(url);
};

const updatePerson = (id, person) => {
  const url = baseUrl + `/${id}`;
  const promise = axios.put(url, person);
  return promise.then((response) => response.data);
};

export default {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};
