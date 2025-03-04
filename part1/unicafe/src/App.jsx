import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positiveFeedback = (good / total) * 100;
  const output = (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={isNaN(total) ? "" : total} />
      <StatisticLine text="average" value={isNaN(average) ? "" : average} />
      <StatisticLine
        text="positive"
        value={isNaN(positiveFeedback) ? "" : positiveFeedback + " %"}
      />
    </>
  );
  return (
    <>
      <h1>Statistics</h1>
      {total === 0 ? <p>No feedback given</p> : output}
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
      <Button onClick={handleGoodOnClick} text="good" />
      <Button onClick={handleNeutralOnClick} text="neutral" />
      <Button onClick={handleBadOnClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
