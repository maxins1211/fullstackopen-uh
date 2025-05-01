import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteNoti, removeNoti } from "../reducers/notificationReducer";
import { increaseVote } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const sortedAnecdotes = [...state.anecdotes].sort(
      (a, b) => b.votes - a.votes
    );
    if (!state.filter) {
      return sortedAnecdotes;
    } else {
      return sortedAnecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(increaseVote(anecdotes, id));
    dispatch(voteAnecdoteNoti(votedAnecdote.content));
    setTimeout(() => dispatch(removeNoti()), 5000);
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
