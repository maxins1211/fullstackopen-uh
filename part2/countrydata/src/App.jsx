import axios from "axios";
import { useEffect, useState } from "react";
import FilteredCountry from "./components/FilteredCountry";
import SpecificCountry from "./components/SpecificCountry";

const api_key = import.meta.env.VITE_SOME_KEY;
function App() {
  const [userInput, setUserInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [specificCountry, setSpecificCountry] = useState();
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);
      });
  }, []);

  useEffect(() => {
    if (specificCountry) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${specificCountry.name}&appid=${api_key}`
        )
        .then((response) => {
          const { wind, main, weather } = response.data;
          console.log(response.data);
          const newWeather = {
            temp: (main.temp - 273.15).toFixed(2),
            windSpeed: wind.speed,
            iconURL: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
          };
          setWeather(newWeather);
        });
    }
  }, [specificCountry]);
  const handleChange = (e) => {
    const newUserInput = e.target.value;

    const newFilteredCountries = countries.filter((country) =>
      country.toLowerCase().includes(newUserInput.toLowerCase())
    );
    setUserInput(newUserInput);
    if (newFilteredCountries.length === 1) {
      getSpecificCountry(newFilteredCountries[0]);
      setFilteredCountries([]);
    } else {
      setFilteredCountries(newFilteredCountries);
      setSpecificCountry();
    }
  };

  const getSpecificCountry = (country) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        const { capital, area, languages, flags } = response.data;
        const countryInfomation = {
          name: country,
          capital,
          area,
          languages,
          flags,
        };
        setSpecificCountry(countryInfomation);
      });
  };
  const handleShow = (country) => () => {
    getSpecificCountry(country);
    setFilteredCountries([]);
    setUserInput("");
  };

  return (
    <>
      <label>Find country</label>
      <input value={userInput} onChange={handleChange} />
      <FilteredCountry
        filteredCountries={filteredCountries}
        handleShow={handleShow}
      />
      <SpecificCountry specificCountry={specificCountry} weather={weather} />
    </>
  );
}

export default App;
