import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { voteAnecdoteNoti } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    [...state.anecdotes].sort((a, b) => b.votes - a.votes);
    if (!state.filter) {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(addVote(id));
    dispatch(voteAnecdoteNoti(votedAnecdote.content));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
