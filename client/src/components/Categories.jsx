import React, { useEffect, useState } from 'react';
import axios from 'axios';
import millify from 'millify';
import { Link } from 'react-router-dom';

const categoryArray = [
  'gaming',
  // 'metaverse',
  // 'play-to-earn',
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

const Categories = () => {
  const [dataCGCoinsCategories, setDataCGCoinsCategories] = useState(null);

  useEffect(() => {
    // call coingecko /coins/categories api endpoint
    async function fetchCGCoinsCategoriesData() {
      const response = await axios.get('/coingecko/coins/categories');

      // filter only data that match our categoryArray
      let tempArray = [];
      response.data.map((e, i) => {
        for (let i=0; i<categoryArray.length; i++) {
          if (e.id === categoryArray[i]) {
            tempArray.push(e)
          };
        }
      })
      // set the filtered data in state
      setDataCGCoinsCategories(tempArray);
    }
    fetchCGCoinsCategoriesData();

  }, [])

  return (
    <div>
      <h2>Categories</h2>
      {!dataCGCoinsCategories ? "Loading..." : (
        dataCGCoinsCategories.map((e, i) => (
          <div className="category" key={i}>
            <div>
              <Link to={`/category/${e.id}`} state={{ slug: e.id }}>
                <h4>{e.name}</h4>
              </Link>
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
  )
}

export default Categories