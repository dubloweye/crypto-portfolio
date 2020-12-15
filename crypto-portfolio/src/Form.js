import React, { useState } from 'react';
import DatePicker from 'react-date-picker'
import COINS from './coingecko-data';
import Select from 'react-select';
import fb from './fbfunc'


const Form = () => {
    let dropDown = COINS.slice(0,40).map(coin => ({value: coin.name, label: coin.name, price: coin.current_price, id: coin.id, pic: coin.image}))

    const [asset, setAsset] = useState('')
    // const handleAssetChange = event => {
    //     setAsset(event.target.value)
    // }

    console.log(asset.id)

    const [quantity, setQuantity] = useState(0)
    const handleQuantityChange = event => {
        setQuantity(event.target.value)
    }

    const [buyPrice, setBuyPrice] = useState(0);
    const handleBuyPriceChange = event => {
        setBuyPrice(event.target.value)
    }

    const [date, setDate] = useState(new Date())
    // const handleDateChange = event => {
    //     setDate(event.target.value)
    // }

    Date.prototype.ddmmyyyy = function() {
        let mm = this.getMonth() + 1;
        let dd = this.getDate();

        return ([(dd>9 ? '' : '0') +dd, '-', (mm>9 ? '' : '0') + mm, '-', this.getFullYear()].join(''));
    }

    console.log(date.ddmmyyyy())

    const handleSubmit = event => {
        console.log ('You bought ' + quantity + ' ' + asset.value + ' on ' + date + ' for $' + buyPrice +' per coin.');
        
        fb.addOne(asset.value, quantity, buyPrice, asset.price, asset.id, asset.pic);
        setAsset('')
        setBuyPrice(0)
        setDate(new Date())
        setQuantity(0)
        event.preventDefault();
    }

    return(
        <form>
            <div>
                <label>Select Coin</label>
                <Select value={asset} options={dropDown} onChange={setAsset}  />
            </div>
            <div>
                <label>Number Bought</label>
                <input type='number' value={quantity} onChange={handleQuantityChange} />
            </div>
            <div>
                <label>Buy Price per Coin</label>
                <input type='number' value={buyPrice} onChange={handleBuyPriceChange}/>
            </div>
            <div>
                <label>Date Bought</label>
                <DatePicker value={date} onChange={setDate} format='dd-MM-yyyy' /> 
            </div>
            <div>
                <input type='submit' value='Submit' onClick={handleSubmit} />
            </div>
        </form>
    )
}

export default Form