import React, { useState, useEffect } from "react";
import fb from "./fbfunc";
import firebase from "./fbconfig";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const db = firebase.firestore();

const Portfolio = () => {
    const [positions, setPositions] = useState([]);

  const marketData =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5000&page=1&sparkline=false";

  const [pricing, setPricing] = useState([]);

  useEffect(async () => {
    await axios
      .get(marketData)
      .then((response) => {
        setPricing(
          response.data.map((coin) => ({
            value: coin.name,
            label: coin.name,
            price: coin.current_price,
            id: coin.id,
            pic: coin.image,
          }))
        );
      })
      .catch((reason) => {
        console.log("Error");
        console.log(reason);
      });
  }, [marketData]);

  useEffect(() => {
    fb.readData(setPositions);
  }, []);

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

  const aggreg = (arr, coins) => {
    const agg = [];
    for (let i = 0; i < arr.length; i++) {
      const coin = coins.filter((object) => {
        return object.id === arr[i][0].id;
      });
      let x = {price: 'noval'}
      if (coin.length > 0) {
         x = coin[0] 
         console.log(x)
         console.log(coin)
      }

      agg.push({
        Asset: arr[i][0].Asset,
        Quantity: arr[i].reduce(function (accumulator, currentVal) {
          return accumulator + parseFloat(currentVal.Quantity);
        }, 0),
        "Total Cost": arr[i].reduce(function (accumulator, currentVal) {
          return accumulator + parseFloat(currentVal["Total Cost"]);
        }, 0),
        "Current Price": x.price,
        "Average Cost":
          arr[i].reduce(function (accumulator, currentVal) {
            return accumulator + parseFloat(currentVal["Total Cost"]);
          }, 0) /
          arr[i].reduce(function (accumulator, currentVal) {
            return accumulator + parseFloat(currentVal.Quantity);
          }, 0),
        Profit:
          x.price *
            arr[i].reduce(function (accumulator, currentVal) {
              return accumulator + parseFloat(currentVal.Quantity);
            }, 0) -
          arr[i].reduce(function (accumulator, currentVal) {
            return accumulator + parseFloat(currentVal["Total Cost"]);
          }, 0), 
        "Current Value":
          x.price *
          arr[i].reduce(function (accumulator, currentVal) {
            return accumulator + parseFloat(currentVal.Quantity);
          }, 0),
        id: arr[i][0].id,
        pic: arr[i][0].pic,
      });
    }
    return agg;
  };

//   console.log(aggreg(indiv(positions), price));

  const port = aggreg(indiv(positions), pricing).sort(function (a, b) {
    return b["Current Value"] - a["Current Value"];
  });

  const totalCost = port.reduce( function(accumulator, currentVal) {
      return accumulator + parseFloat(currentVal['Total Cost']);
  }, 0)

  const totalVal = port.reduce( function(accumulator, currentVal) {
    return accumulator + parseFloat(currentVal['Current Value']);
}, 0)

    const styling = (profit) => {
        let x = {color: 'green'};
        if (profit < 0) {
            x = {color: 'red'};
        }
        return x
    }

  return (
    <Card style={{ height: '50rem' }} className='form' bg='secondary'>
    <div>
      <h1>Portfolio</h1>
      <h5>Total Cost: ${totalCost.toLocaleString()}</h5>
      <h5>Current Value: ${totalVal.toLocaleString()}</h5>
    <h5>Overall Profit: ${(totalVal - totalCost).toLocaleString()}</h5>
      <Table bordered hover variant="dark">
        <thead>
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
        </thead>
        <tbody>
          {port.map((position) => (
            <tr>
              <td>
                <img
                  src={position.pic}
                  alt={position.id}
                  width="30"
                  height="30"
                />
              </td>
              <td>{position.Asset}</td>
              <td>${position["Current Price".toLocaleString()]}</td>
              <td>{position.Quantity.toLocaleString()}</td>
              <td>${position["Average Cost"].toLocaleString()}</td>
              <td>${position["Current Value"].toLocaleString()}</td>
              <td>${position["Total Cost"].toLocaleString()}</td>
              <td style={styling(position.Profit)}>${position.Profit.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Card>
  );
};

export default Portfolio;
