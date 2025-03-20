import React from "react";

const FilteredCountry = ({ filteredCountries }) => {
  return (
    <div>
      {filteredCountries && filteredCountries.length > 10 ? (
        <p>Too many mathces, specify another filter</p>
      ) : (
        filteredCountries.map((country) => <li key={country}>{country}</li>)
      )}
    </div>
  );
};

export default FilteredCountry;
