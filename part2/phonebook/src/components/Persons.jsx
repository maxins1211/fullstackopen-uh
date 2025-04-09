const Person = (props) => {
  const { filteredPersons, handleDelete } = props;
  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};
export default Person;