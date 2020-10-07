import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <div>
        Find countries <input value={searchText} onChange={handleSearch} />
      </div>

      <div>
        {filterCountries.length > 10
          ? "To many matches, specify another filter"
          : filterCountries.map((item) => (
              <Country
                key={item.numericCode}
                name={item.name}
                capital={item.capital}
                population={item.population}
                languages={item.languages}
                flag={item.flag}
              />
            ))}
        {filterCountries.length === 1
          ? filterCountries.map((item) => (
              <CountryDetails
                key={item.numericCode}
                name={item.name}
                capital={item.capital}
                population={item.population}
                languages={item.languages}
                flag={item.flag}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default App;
