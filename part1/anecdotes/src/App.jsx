import { useState } from "react";
const Anecdote = ({ anecdotes, vote }) => {
  return (
    <>
      <p>{anecdotes}</p>
      <p>
        has {vote} {vote > 1 ? "votes" : "vote"}
      </p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const findMostVotesAnecdote = () => {
    let max = votes[0];
    let indexOfMax = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        indexOfMax = i;
      }
    }
    return indexOfMax;
  };
  const maxIndex = findMostVotesAnecdote();
  const handleNextAnecdote = () => {
    const randomNum = getRandomInt(anecdotes.length);
    setSelected(randomNum);
  };
  const handleVote = () => {
    const newArray = [...votes];
    newArray[selected] += 1;
    setVotes(newArray);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes[selected]} vote={votes[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes[maxIndex]} vote={votes[maxIndex]} />
    </div>
  );
};

export default App;
