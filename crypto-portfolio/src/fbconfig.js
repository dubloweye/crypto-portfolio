import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDUrRz1M2Q7xkDWcJ9Ye_8SnMgB_NhfiM0",
    authDomain: "crypto-portfolio-6b7e4.firebaseapp.com",
    projectId: "crypto-portfolio-6b7e4",
    storageBucket: "crypto-portfolio-6b7e4.appspot.com",
    messagingSenderId: "288574689920",
    appId: "1:288574689920:web:44a314fb2f817b44098c65",
    measurementId: "G-KKZZ4ED0RN"
  };

firebase.initializeApp(firebaseConfig)

export default firebase