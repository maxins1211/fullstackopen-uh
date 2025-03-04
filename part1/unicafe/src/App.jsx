import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positiveFeedback = (good / total) * 100;
  return (
    <>
      <h1>Statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {isNaN(total) ? "" : total}</p>
      <p>average: {isNaN(average) ? "" : average}</p>
      <p>positive: {isNaN(positiveFeedback) ? "" : positiveFeedback + " %"} </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodOnClick = () => {
    const newGoodFeedBack = good + 1;
    setGood(newGoodFeedBack);
  };
  const handleNeutralOnClick = () => {
    const newNeutralFeedBack = neutral + 1;
    setNeutral(newNeutralFeedBack);
  };
  const handleBadOnClick = () => {
    const newBadFeedBack = bad + 1;
    setBad(newBadFeedBack);
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodOnClick}>good</button>
      <button onClick={handleNeutralOnClick}>neutral</button>
      <button onClick={handleBadOnClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
