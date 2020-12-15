import fb from './fbconfig';

const db = fb.firestore();

const addOne = (coin, number, buyPrice, currentPrice, id, pic) => {
    db.collection('Portfolio')
        .add({
            Asset: coin,
            Quantity: number,
            'Buy Price': buyPrice,
            'Current Price': currentPrice,
            'Total Cost': (buyPrice * number),
            'Current Value': (currentPrice * number),
            'Profit': ((currentPrice * number) - (buyPrice * number)),
            id: id,
            pic: pic
        })
        .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
            console.error('Error adding document: ', error)
        });
};
const readData = (callbackFn) => {
    const q = (querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        callbackFn(items);
    };
    db.collection('Portfolio').onSnapshot(q)
};
const x = { addOne, readData, };
export default x