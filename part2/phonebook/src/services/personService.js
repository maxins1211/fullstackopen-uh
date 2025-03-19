import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const promise = axios.get(baseUrl);
    return promise.then(response => response.data);
}

const createPerson = (person) => {
    const promise = axios.post(baseUrl, person);
    return promise.then(response => response.data);
}

export default {
    getAll, createPerson
}