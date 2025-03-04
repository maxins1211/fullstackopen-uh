const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  const { name, exercises } = props.part;
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  const { parts } = props;
  let sum = 0;
  for (const part of parts) {
    sum += part.exercises;
  }
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
export default App;
