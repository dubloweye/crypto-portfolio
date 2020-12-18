import React, { useState, useEffect } from "react";
import fb from "./fbfunc";
import firebase from "./fbconfig";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const History = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fb.readData(setPositions);
      }, []);

    /*   {
        Asset: coin,
        Quantity: number,
        'Buy Price': buyPrice,
        'Current Price': currentPrice,
        'Total Cost': (buyPrice * number),
        'Current Value': (currentPrice * number),
        'Profit': ((currentPrice * number) - (buyPrice * number)),
        id: id,
        pic: pic
    }*/

    return (
        <Card style={{ height: '50rem' }} className='form' bg='secondary'>
            <Table bordered hover variant="dark">
            <thead>
          <tr>
            <th></th>
            <th>Coin</th>
            <th>Quantity Bought</th>
            <th>Buy Price</th>
            <th>Total Buy Price</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
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
              <td>{position.Quantity.toLocaleString()}</td>
              <td>${position["Buy Price"].toLocaleString()}</td>
              <td>${position["Total Cost"].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
            </Table>
        </Card>
    )
}

export default History