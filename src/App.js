import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DataDisplay from "./DataDisplay";
import data from "./data.json"; // Import your JSON data

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter the data when the search term changes
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <div>
      <SearchBar filterData={setSearchTerm} />
      <DataDisplay filteredData={filteredData} />
    </div>
  );
}

export default App;

