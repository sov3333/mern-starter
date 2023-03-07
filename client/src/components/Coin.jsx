import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Coin = () => {
    const [dataCGCoin, setDataCGCoin] = useState(null);

    const location = useLocation();
    const { slug } = location.state;

    useEffect(() => {
        // call coingecko /coins/{id} api endpoint
        async function fetchCGCoinData() {
          const response = await axios.get(`/coingecko/coins/${slug}`);
          console.log(response.data);
          // set the data in state
          setDataCGCoin(response.data);
        }
        fetchCGCoinData();
    }, [])

  return (
    <div className="coin_container">
      {!dataCGCoin ? "Loading..." : (
        <div>
          <div className="coin_header">
            <img src={dataCGCoin.image.thumb} alt={`${dataCGCoin.symbol}-logo`} />
            <h2>{dataCGCoin.name} ({dataCGCoin.symbol.toUpperCase()})</h2>
          </div>
          <div>
            <p>{dataCGCoin.description.en}</p>
            <div className="coin_tags">
                Tags:
                {dataCGCoin.categories.map((e, i) => <div key={i}>{e}</div>)}
            </div>
          </div>
          <div>
            <h3>Info</h3>
            <ul>
                <li>Price: ${dataCGCoin.market_data.current_price.usd}</li>
                <li>Rank: #{dataCGCoin.market_cap_rank}</li>
                <li>Liquidity Score: {dataCGCoin.liquidity_score} / 100</li>
                <li>Contract Address ({dataCGCoin.asset_platform_id}): {dataCGCoin.contract_address}</li>
                <li>Country of Origin: {dataCGCoin.country_origin}</li>
                <li>Launch Date: {dataCGCoin.genesis_date}</li>
            </ul>
          </div>
          <div>
            <h3>Links</h3>
            <ul>
                <li>{dataCGCoin.links.homepage[0]}</li>
                <li>@{dataCGCoin.links.twitter_screen_name}</li>
                <li>t.me/{dataCGCoin.links.telegram_channel_identifier}</li>
                <li>{dataCGCoin.links.chat_url[0]}</li>
            </ul>
          </div>
          <div>
            <h3>Rankings</h3>
            <ul>
                <li>CG Rank: #{dataCGCoin.coingecko_rank}</li>
                <li>CG Score: {dataCGCoin.coingecko_score}</li>
                <li>{dataCGCoin.sentiment_votes_up_percentage} UP : {dataCGCoin.sentiment_votes_down_percentage} DOWN</li>
                <li>Twitter followers: {dataCGCoin.community_data.twitter_followers}</li>
                <li>Telegram users:{dataCGCoin.community_data.telegram_channel_user_count}</li>
                <li>Community Score: {dataCGCoin.community_score}</li>
                <li>Developer Score: {dataCGCoin.developer_score}</li>
                <li>Public Interest Score: {dataCGCoin.public_interest_score}</li>
            </ul>
          </div>
          <div>
            <h3>Markets</h3>
            <ul>
                {dataCGCoin.tickers.map((e, i) => (
                <Link to={e.trade_url} target="_blank" rel="noopener noreferrer">
                    <li key={i}>{e.market.name}: {dataCGCoin.symbol}/{e.target_coin_id}</li>
                </Link>
                ))}
            </ul>
          </div>
          <div>
            <p>LAST UPDATED: {dataCGCoin.last_updated}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Coin