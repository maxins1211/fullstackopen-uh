const Header = (props) => {
  const { name } = props.course;
  return (
    <>
      <h1>{name}</h1>
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
  const { parts } = props.course;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  const { parts } = props.course;
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
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
export default App;
