import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [dataExternal, setDataExternal] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));

    // call external API
    async function fetchData() {
      const response = await axios.get('/api/external');
      console.log(`response from external api:`, response);
      setDataExternal(response.data);
    }
    fetchData();

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {!data ? "Loading..." : data}
        </p>
        <p>
          {!dataExternal ? "Loading..." : dataExternal.gecko_says }
        </p>
      </header>
    </div>
  );
}

export default App;
