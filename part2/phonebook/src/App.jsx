/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import numbersService from './services/numbers';

const SearchFilter = ({ search, onSearch }) => {
  return (
    <div>
      filter shown with: <input value={search} onChange={onSearch} />
    </div>
  );
};

const NumberForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Number = ({ number }) => {
  return (
    <span>
      {number.name} {number.number}{' '}
    </span>
  );
};

const Numbers = ({ numbers, onNumberDelete }) => {
  return (
    <>
      {numbers.map((number) => (
        <div key={number.id}>
          <Number number={number} />
          <button onClick={() => onNumberDelete(number.id)}>X</button>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    numbersService.getAll().then((data) => {
      setNumbers(data);
    });
  }, []);

  function handleNumberDelete(id) {
    const numberToDelete = numbers.find((number) => number.id === id);
    if (window.confirm(`Delete ${numberToDelete.name}?`)) {
      numbersService.deleteNumber(id).then((response) => {
        if (response === 'OK') {
          setNumbers(numbers.filter((number) => number.id !== id));
        }
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
      id: numbers.length + 1,
    };

    const sameName = numbers.find((number) =>
      number.name.toLowerCase().startsWith(newName.toLowerCase())
    );

    if (sameName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        numbersService
          .updateNumber(sameName.id, { ...newObject, id: sameName.id })
          .then((response) => {
            setNumbers(
              numbers.map((number) =>
                number.id !== sameName.id ? number : response
              )
            );
          });
      }
    } else {
      numbersService.createNumber(newObject).then((data) => {
        setNumbers(numbers.concat(data));
      });
    }
    setNewName('');
    setNewNumber('');
  }
  const numbersToShow = numbers.filter((number) =>
    number.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter search={search} onSearch={handleSearch} />
      <h2>add a new</h2>
      <NumberForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers numbers={numbersToShow} onNumberDelete={handleNumberDelete} />
    </div>
  );
};

export default App;
