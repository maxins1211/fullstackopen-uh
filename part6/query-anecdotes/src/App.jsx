import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./services/anecdoteService";
import { useNotificationDispatch } from "./components/NotificationContext";
const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const handleVote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    voteMutation.mutate({
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    });
    dispatch({
      type: "VOTE_ANECDOTE",
      payload: { content: votedAnecdote.content },
    });
    setTimeout(() => dispatch({ type: "RESET" }), 5000);
  };
  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
