import React from "react";

function DataDisplay({ filteredData }) {
  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default DataDisplay;

