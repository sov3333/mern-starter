import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CategoryDetails from './components/CategoryDetails';
import Home from './components/Home';
import Categories from './components/Categories';
import Coin from './components/Coin';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          {!data ? "Loading..." : data}
        </h2>
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryDetails />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </div>
  );
}

export default App;
