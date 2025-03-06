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
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  const { parts } = props.course;
  const total = parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return (
    <>
      <p>
        {" "}
        <b>total of {total} exercises</b>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
