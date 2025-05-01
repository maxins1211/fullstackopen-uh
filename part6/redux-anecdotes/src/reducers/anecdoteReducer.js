import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
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

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export { getId }
export default anecdoteSlice.reducer;
