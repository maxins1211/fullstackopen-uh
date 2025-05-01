import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdoteService";
import { useNotificationDispatch } from "./NotificationContext";
const getId = () => (100000 * Math.random()).toFixed(0);
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "ADD_ANECDOTE",
        payload: { content: newAnecdote.content },
      });
      setTimeout(() => dispatch({ type: "RESET" }), 5000);
    },
    onError: (error) => {
      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.error,
        },
      });
      setTimeout(() => dispatch({ type: "RESET" }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
