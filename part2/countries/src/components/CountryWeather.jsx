/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

const CountryWeather = ({ country }) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  const [lat, long] = country.latlng;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}.99&appid=${api_key}`
      )
      .then((res) => setWeather(res.data));
  }, []);

  var tempInCelsius = weather && weather.main.temp - 273.15;

  if (weather) {
    return (
      <>
        <p>Temperature: {tempInCelsius.toFixed(2)} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </>
    );
  }
  return null;
};

export default CountryWeather;
