/* eslint-disable react/prop-types */
const SearchFilter = ({ search, onSearch }) => {
  return (
    <div>
      filter shown with: <input value={search} onChange={onSearch} />
    </div>
  );
};

export default SearchFilter;
