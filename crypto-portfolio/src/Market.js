import React from 'react';
import COINS from './coingecko-data';

const Market = () => {
let cryptos = COINS.slice(0, 50).map(coin => (<div><p>Currency: {coin.name}</p> <img src={coin.image} alt='coin-img' /><p>Market Cap: ${coin.market_cap}</p></div>))

    return(
        <div>
            {cryptos}
        </div>
    )
}

export default Market