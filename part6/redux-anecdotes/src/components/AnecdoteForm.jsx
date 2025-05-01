import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdoteInDb } from "../reducers/anecdoteReducer";
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
    dispatch(createAnecdoteInDb(content));
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
