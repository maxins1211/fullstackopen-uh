import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addAnecdote = async (anecdoteObj) => {
    const response = await axios.post(baseUrl, anecdoteObj)
    return response.data
}

const addVote = async (id, anecdoteObj) => {
    const url = baseUrl + `/${id}`
    const response = await axios.put(url, anecdoteObj)
    return response.data
}
export default { getAll, addAnecdote, addVote }