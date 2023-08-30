/* eslint-disable react/prop-types */
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
        <div key={number.id} className="number">
          <Number number={number} />
          <button onClick={() => onNumberDelete(number.id)}>X</button>
        </div>
      ))}
    </>
  );
};

export default Numbers;
