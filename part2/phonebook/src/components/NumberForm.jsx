/* eslint-disable react/prop-types */
const NumberForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input">
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div className="input">
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default NumberForm;
