import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CityWeather = ({ capitalName }) => {
  const [weather, setWeather] = useState({
    temperature: 9,
    weather_icons: [],
    wind_speed: 13,
    wind_dir: "NE",
  });

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capitalName}`
      )
      .then((response) => {
        const data = response.data.current;
        setWeather({
          ...weather,
          temperature: data.temperature,
          weather_icons: data.weather_icons,
          wind_speed: data.wind_speed,
          wind_dir: data.wind_dir,
        });
      });
  }, []);

  return (
    <div>
      <h3>Weather in {capitalName}</h3>
      <strong>Temperature:</strong> {weather.temperature} Celcius
      <div>
        {weather.weather_icons.map((icon, index) => (
          <img key={index} src={icon} alt="icon" />
        ))}
      </div>
      <strong>Wind: </strong> {weather.wind_speed} mph, direction{" "}
      {weather.wind_dir}
    </div>
  );
};

export default CityWeather;
