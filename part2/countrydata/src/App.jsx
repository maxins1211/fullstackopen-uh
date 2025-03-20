import axios from "axios";
import { useEffect, useState } from "react";
import FilteredCountry from "./components/FilteredCountry";
import SpecificCountry from "./components/SpecificCountry";

function App() {
  const [userInput, setUserInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [specificCountry, setSpecificCountry] = useState();
  console.log(countries);
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

  return (
    <>
      <label>Find country</label>
      <input value={userInput} onChange={handleChange} />
      <FilteredCountry filteredCountries={filteredCountries} />
      <SpecificCountry specificCountry={specificCountry} />
    </>
  );
}

export default App;
