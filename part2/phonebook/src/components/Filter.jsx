const Filter = (props) => {
  const { handleFilterChange, filterName } = props;
  return (
    <>
      filter shown with
      <input onChange={handleFilterChange} value={filterName} />
    </>
  );
};
export default Filter;
