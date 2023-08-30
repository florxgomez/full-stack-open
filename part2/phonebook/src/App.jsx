/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import numbersService from './services/numbers';
import Notification from './components/Notification';
import NumberForm from './components/NumberForm';
import SearchFilter from './components/SearchFilter';
import Numbers from './components/Numbers';

const App = () => {
  const [numbers, setNumbers] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '¨',
    type: 'success',
  });

  useEffect(() => {
    numbersService.getAll().then((data) => {
      setNumbers(data);
    });
  }, []);

  function showNotification(show, type, message) {
    setNotification({
      show,
      type,
      message,
    });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  }

  function handleNumberDelete(id) {
    const numberToDelete = numbers.find((number) => number.id === id);
    if (window.confirm(`Delete ${numberToDelete.name}?`)) {
      numbersService.deleteNumber(id).then((response) => {
        if (response === 'OK') {
          setNumbers(numbers.filter((number) => number.id !== id));
          showNotification(
            true,
            'success',
            `${numberToDelete.name} was deleted successfully`
          );
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
            showNotification(
              true,
              'success',
              `${newName} was updated successfully`
            );
          })
          .catch((err) => {
            showNotification(
              true,
              'error',
              `${newName} has been already removed from the server`
            );
          });
      }
    } else {
      numbersService.createNumber(newObject).then((data) => {
        setNumbers(numbers.concat(data));
        showNotification(true, 'success', `${newName} was added successfully`);
      });
    }
    setNewName('');
    setNewNumber('');
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  const numbersToShow = numbers?.filter((number) =>
    number.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!numbers) {
    return null;
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <SearchFilter search={search} onSearch={handleSearch} />
      <h2>Add a new number</h2>
      <NumberForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers numbers={numbersToShow} onNumberDelete={handleNumberDelete} />
      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default App;
