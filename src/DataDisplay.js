import React from "react";

function DataDisplay({ filteredData }) {
  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.status}>
          {item.ServiceName} - 
          {item.Status} -
          {item.ResourceId} - 
          {item.Description}</li>
      ))}
    </ul>
  );
}

export default DataDisplay;

