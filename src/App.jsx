import { useState } from "react";

function App() {
  const products = [
    {
      name: "buzdolabı",
    },
    {
      name: "test",
    },
    {
      name: "araba",
    },
    {
      name: "deneme",
    },
  ];

  const [search, setSearch] = useState("");

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      {search}
      <input type="text" name="" onChange={handleOnChange} />
      <input type="file" name="" onChange={handleOnChange} />
      {products
        .filter((item) => {
          return item.name.includes(search);
        })
        .map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
    </>
  );
}

export default App;
