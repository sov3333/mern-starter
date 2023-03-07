import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { ResponsiveAppBar, StickyFooter } from './components';

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
      <header>
        <ResponsiveAppBar />
      </header>
      <div>
        <p>
          {!data ? "Loading..." : data}
        </p>
        <p>
          {!dataExternal ? "Loading..." : dataExternal.gecko_says }
        </p>
      </div>
      <div>
        <StickyFooter />
      </div>
    </div>
  );
}

export default App;
