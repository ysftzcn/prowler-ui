import React from "react";

function SearchBar({ filterData }) {
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    filterData(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;

