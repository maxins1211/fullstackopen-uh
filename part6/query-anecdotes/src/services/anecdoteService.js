import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)


export const createAnecdote = async newAnecdote => {
    if (newAnecdote.content.length < 5) {
        const error = new Error("too short anecdote, must have length 5 or more")
        error.response = { data: { error: "too short anecdote, must have length 5 or more" } }
        throw error
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

export const voteAnecdote = async (updateAnecdote) => {
    const url = baseUrl + `/${updateAnecdote.id}`
    const response = await axios.put(url, updateAnecdote)
    return response.data
}