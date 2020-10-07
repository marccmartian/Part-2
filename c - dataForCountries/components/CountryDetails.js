import React from "react";
import CityWeather from "./CityWeather";

const CountryDetails = ({ name, capital, population, languages, flag }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <img src={flag} alt="flag" width="100px" height="100px" />

      <CityWeather capitalName={capital} />
    </div>
  );
};

export default CountryDetails;
