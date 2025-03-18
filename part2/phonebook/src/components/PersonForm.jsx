const PersonForm = (props) => {
  const {
    handleAddPerson,
    handleNameChange,
    handlePhoneChange,
    newName,
    newPhone,
  } = props;
  return (
    <>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} /> <br></br>
          number: <input onChange={handlePhoneChange} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
