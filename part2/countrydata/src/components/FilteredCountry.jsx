import React from "react";

const FilteredCountry = ({ filteredCountries, handleShow }) => {
  return (
    <div>
      {filteredCountries && filteredCountries.length > 10 ? (
        <p>Too many mathces, specify another filter</p>
      ) : (
        filteredCountries.map((country) => (
          <li key={country}>
            {country} <button onClick={handleShow(country)}>Show</button>
          </li>
        ))
      )}
    </div>
  );
};

export default FilteredCountry;
