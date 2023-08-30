import CountryWeather from './CountryWeather';

/* eslint-disable react/prop-types */
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      Languages:{' '}
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <CountryWeather country={country} />
    </>
  );
};

export default Country;
