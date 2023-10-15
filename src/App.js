import React, { useState, useEffect } from "react";
// import "./App.css"; // You can add custom styles to App.css

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const jsonData = require("./prowler-iam.json"); // Load data from data.json

  useEffect(() => {
    const filtered = jsonData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Prowler UI JSON Data Search</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            <strong>{item.CheckTitle}</strong>
            <p>{item.Status}</p>
            <p>{item.Severity}</p>
            <p>{item.ResourceId}</p>
            <p>{item.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



