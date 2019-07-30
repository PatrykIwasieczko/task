import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";

// Initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyBY4gCTaPain0PXPWeec988R3NvK0DHKvI",
    authDomain: "nn-vue-cli3-8e0ae.firebaseapp.com",
    databaseURL: "https://nn-vue-cli3-8e0ae.firebaseio.com",
    projectId: "nn-vue-cli3-8e0ae",
    storageBucket: "nn-vue-cli3-8e0ae.appspot.com",
    messagingSenderId: "938737357189",
    appId: "1:938737357189:web:769e2d27bcdda920"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
