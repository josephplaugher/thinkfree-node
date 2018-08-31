import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyCJ8z41qnqo36kdFr56t4dU6GXcGrvz-nk",
    authDomain: "think-free-1520982831617.firebaseapp.com",
    databaseURL: "https://think-free-1520982831617.firebaseio.com",
    projectId: "think-free-1520982831617",
    storageBucket: "think-free-1520982831617.appspot.com",
    messagingSenderId: "682669909656"
};
const Fire = firebase.initializeApp(config);
export default Fire;