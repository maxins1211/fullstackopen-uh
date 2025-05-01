import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { getId } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotes";
import {
  createAnecdoteNoti,
  removeNoti,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    };
    const addedAnecdote = await anecdotesService.addAnecdote(newAnecdote);
    dispatch(addAnecdote(addedAnecdote));
    dispatch(createAnecdoteNoti(content));
    setTimeout(() => dispatch(removeNoti()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
