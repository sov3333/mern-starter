import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import millify from 'millify';

const CategoryDetails = () => {
  const [dataCGCoinsMarkets, setDataCGCoinsMarkets] = useState(null);

  const location = useLocation();
  const { slug } = location.state;

  useEffect(() => {
    // call coingecko /coins/markets api endpoint
    async function fetchCGCoinsMarketsData() {
      const response = await axios.get(`/coingecko/coins/markets/${slug}`);
      // set the filtered data in state
      setDataCGCoinsMarkets(response.data);
    }
    fetchCGCoinsMarketsData();

  }, [])
  
  return (
    <div>
      <h2>List of Tokens</h2>
      <div>
        {dataCGCoinsMarkets?.map((coin, i) => (
          <div key={i} className="details_token">

            <div className="details_token_header">
              <div className="details_token_header_coin">
                <img src={coin.image} alt={`${coin.symbol}-coin-logo`} style={{ width: '30px', height: '30px', borderRadius: '50%', padding: '0.5rem' }} />
                <Link to={`/coins/${coin.id}`}>
                  <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
                </Link>
              </div>
              <div className="details_token_header_rank">
                <h4>Rank: #{coin.market_cap_rank}</h4>
              </div>
            </div>

            <div className="details_token_data">
              <div>
                <h4>Price: ${coin.current_price} ({millify(coin.price_change_percentage_24h)}%)</h4>
                <p>Volume: ${millify(coin.total_volume)}</p>
                <p>24H High: ${coin.high_24h}</p>
                <p>24H Low: ${coin.low_24h}</p>
              </div>
              <div>
                <h4>Supply: {millify(coin.circulating_supply)} ({millify(100*coin.circulating_supply/coin.total_supply)}%)</h4>
                <p>Total Supply: {millify(coin.total_supply)}</p>
                <p>Max Supply: {millify(coin.max_supply)}</p>

              </div>
              <div>
                <h4>Market Cap: ${millify(coin.market_cap)} ({millify(coin.market_cap_change_percentage_24h)}%)</h4>
                <p>Market Cap: </p>
                <p>FDV: ${millify(coin.fully_diluted_valuation)}</p>
                <p>24H Change: ${millify(coin.market_cap_change_24h)}</p>
              </div>
            </div>

            <div className="details_token_others">
              <p>ATH: ${coin.ath} ({coin.ath_change_percentage}%) @ {coin.ath_date}</p>
              <p>ATL: ${coin.atl} ({coin.atl_change_percentage}) @ {coin.atl_date}</p>
              <p>LAST UPDATED: {coin.last_updated}</p>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default CategoryDetails