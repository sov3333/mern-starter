import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import millify from 'millify';

const categoryArray = [
  'gaming',
  'metaverse',
  'play-to-earn',
  'guild-scholarship',
  'gambling',
  // 'decentralized-perpetuals',
  // 'yield-farming',
  // 'yield-aggregator',
  // 'prediction-markets',
  // 'privacy-coins',
  // 'zero-knowledge-zk',
  // 'artificial-intelligence',
];

function App() {
  const [data, setData] = useState(null);
  const [dataCGCoinsCategories, setDataCGCoinsCategories] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));

    // call coingecko /coins/categories api endpoint
    async function fetchCGCoinsCategoriesData() {
      const response = await axios.get('/coingecko/coins/categories');

      // filter only data that match our categoryArray
      let tempArray = [];
      response.data.map((e, i) => {
        for (let i=0; i<categoryArray.length; i++) {
          if (e.id === categoryArray[i]) {
            tempArray.push(e)
            console.log(e)
          };
        }
      })
      // set the filtered data in state
      setDataCGCoinsCategories(tempArray);
    }
    fetchCGCoinsCategoriesData();

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          {!data ? "Loading..." : data}
        </h2>
        <div>
          <h3>Categories</h3>
          <div>
            {!dataCGCoinsCategories ? "Loading..." : (
              dataCGCoinsCategories.map((e, i) => (
                <div className="category" key={i}>
                  <div>
                    <h4>{e.name}</h4>
                    <div>
                      {e.top_3_coins.map((src, i) => (
                        <img src={src} key={i} />
                      ))}
                    </div>
                  </div>
                  <ul>
                    <li>Market Cap: ${millify(e.market_cap)}</li>
                    <li>24h Volume: ${millify(e.volume_24h)}</li>
                    <li>24h Price Change: {millify(e.market_cap_change_24h)}%</li>
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
