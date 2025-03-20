import React from "react";

const SpecificCountry = ({ specificCountry }) => {
  return (
    <div>
      {specificCountry && (
        <div>
          <h1>{specificCountry.name}</h1>
          <p>
            Capital:{" "}
            {specificCountry.capital.map((capital) => (
              <span key={capital}>{capital}</span>
            ))}
          </p>
          <p>Area: {specificCountry.area}</p>
          <h1>Languages</h1>
          {Object.values(specificCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
          <br></br>
          <img src={specificCountry.flags.png} alt="" />
        </div>
      )}
    </div>
  );
};

export default SpecificCountry;
