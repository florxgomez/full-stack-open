import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [term, setTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState('');

  useEffect(() => {
    const req = axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/all/`
    );
    req.then((res) => setCountries(res.data));
  }, [term]);

  const countriesToShow =
    countries.length > 0 &&
    countries.filter((country) =>
      country?.name.common.toLowerCase().includes(term.toLowerCase())
    );

  return (
    <>
      <label htmlFor="countries">find countries: </label>
      <input
        type="text"
        id="countries"
        onChange={(e) => setTerm(e.target.value)}
      />
      {countriesToShow.length > 10 && term.length > 0 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : countriesToShow.length <= 10 ? (
        countriesToShow.map((country) => (
          <>
            <p key={country.name.common}>{country.name.common}</p>
            <button onClick={() => setShowCountry(country.name.common)}>
              show
            </button>
            {showCountry === country.name.common && (
              <Country country={country} />
            )}
          </>
        ))
      ) : null}
    </>
  );
}

export default App;
