import React, { useState, useEffect } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBar } from "./components/search-bar/search-bar.component";
import './App.css';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => setMonsters(users));
  }, []);

  const handleChange = e => {
    setSearchField(e.target.value);
  }

  const filterMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleChange={handleChange}
      />
      <CardList monsters={filterMonsters} />
    </div>
  );
}

export default App;
