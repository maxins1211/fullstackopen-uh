import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      );
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteInDb = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    };
    const addedAnecdote = await anecdotesService.addAnecdote(newAnecdote)
    dispatch(addAnecdote(addedAnecdote))
  }
}

export const increaseVote = (anecdotes, id) => {
  return async (dispatch) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    const updatedAnecdote = await anecdotesService.addVote(id, { ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    dispatch(addVote(updatedAnecdote))
  }
}
export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer;
