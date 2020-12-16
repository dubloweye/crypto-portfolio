import React, { useState, useEffect } from "react";
import fb from "./fbfunc";
import firebase from "./fbconfig";
import axios from 'axios'

const db = firebase.firestore();

const Portfolio = () => {
  const [positions, setPositions] = useState([]);

  const marketData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5000&page=1&sparkline=false'

    const [price, setPrice] = useState([])

    useEffect(async () => {
        await axios.get(marketData)
        .then((response) => {
            setPrice(response.data.map(coin => ({value: coin.name, label: coin.name, price: coin.current_price, id: coin.id, pic: coin.image})));   
        })
        .catch((reason) => {
            console.log('Error');
            console.log(reason)
        })
    }, [marketData])

  useEffect(() => {
    fb.readData(setPositions);
  }, []);

  console.log(positions);
  console.log(price)
  // Function to map positions into a portfolio

  const indiv = (arr) => {
    const distinct = [];
    const indivPosit = [];
    for (let i = 0; i < arr.length; i++) {
      if (distinct.includes(arr[i].Asset) === false) {
        indivPosit.push(arr.filter((x) => x.Asset === arr[i].Asset));
        distinct.push(arr[i].Asset);
      }
    }
    return indivPosit;
  };

  console.log(indiv(positions));

  const aggreg = (arr, coins) => {
    const agg = [];
    for (let i = 0; i < arr.length; i++) {
            const coin = coins.filter(object => { return object.id === arr[i][0].id});
            console.log(coin)
            agg.push(
                {Asset: arr[i][0].Asset, 
                'Quantity': arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Quantity)}, 0), 
                'Total Cost': arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal['Total Cost'])}, 0),
                'Current Price': (coin[0].price),//(arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal['Current Value'])}, 0)) / (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Quantity)}, 0)),
                'Average Cost': (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal['Total Cost'])}, 0)) / (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Quantity)}, 0)),
                'Profit': ((coin[0].price) * (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Quantity)}, 0))) - (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal['Total Cost'])}, 0)),//arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Profit)}, 0),
                'Current Value': (coin[0].price) * (arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal.Quantity)}, 0)),//arr[i].reduce(function (accumulator, currentVal) {return accumulator + parseFloat(currentVal['Current Value'])}, 0),
                id: arr[i][0].id,
                pic: arr[i][0].pic
            });
    }
    return agg
  };

  console.log(aggreg(indiv(positions), price));

  const port = (aggreg(indiv(positions), price)).sort(function (a, b) {
      return b['Current Value'] - a['Current Value']
  });

  return (
    <div>
        <h1>Portfolio</h1>
      {/* <ul>
        {port.map((position) => (
          <li>{`${position.Quantity} ${position.Asset} currently worth ${position["Current Value"]} bought at ${position["Total Cost"]} (average cost: $${position['Average Cost']}) with current profit equal to $${position["Profit"]}.`}</li>
        ))}
      </ul> */}
      <table className='portfolio'>
          <tr>
              <th></th>
              <th>Coin</th>
              <th>Current Price</th>
              <th>Quantity</th>
              <th>Avg Buy Price</th>
              <th>Current Value</th>
              <th>Total Buy Price</th>
              <th>Profit/Loss</th>
          </tr>
          {port.map((position) => (
              <tr>
                  <td><img src={position.pic} alt={position.id} width='30' height='30' /></td>
                  <td>{position.Asset}</td>
                  <td>${position['Current Price'.toLocaleString()]}</td>
                  <td>{position.Quantity.toLocaleString()}</td>
                  <td>${position['Average Cost'].toLocaleString()}</td>
                  <td>${position['Current Value'].toLocaleString()}</td>
                  <td>${position['Total Cost'].toLocaleString()}</td>
                  <td>${position.Profit.toLocaleString()}</td>
              </tr>
          ))}
      </table>
    </div>
  );
};

export default Portfolio;
