import React from "react";

const SpecificCountry = ({ specificCountry, weather }) => {
  return (
    <div>
      {specificCountry && (
        <div>
          <h1>{specificCountry.name}</h1>
          <p>
            Capital:
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
          {weather && (
            <div>
              <h1>
                Weather in{" "}
                {specificCountry.capital.map((capital) => (
                  <span key={capital}>{capital}</span>
                ))}{" "}
              </h1>
              <p>Temerature {weather.temp} Celsius</p>
              <img src={weather.iconURL} alt="" />
              <p>Wind {weather.windSpeed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecificCountry;
