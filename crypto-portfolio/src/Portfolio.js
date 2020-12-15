import React, { useState, useEffect } from 'react';
import fb from './fbfunc'
import firebase from './fbconfig'

const db = firebase.firestore();

const Portfolio = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fb.readData(setPositions);
    }, []);

    return(
        <div>
            <ul>
                {positions.map((position) => (
                    <li>{`${position.Quantity} ${position.Asset} bought at ${position['Buy Price']} with current profit equal to $${position['Profit']}.`}</li>
                ))}
            </ul>
        </div>
    )
}

export default Portfolio