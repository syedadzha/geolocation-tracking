import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBfqnekI7NWPdveYmo7UnZ_5lPp7QQ5n3I",
  authDomain: "geo-location-22b63.firebaseapp.com",
  databaseURL: "https://geo-location-22b63.firebaseio.com",
  projectId: "geo-location-22b63",
  storageBucket: "geo-location-22b63.appspot.com",
  messagingSenderId: "707635298363",
  appId: "1:707635298363:web:7ea6cf651fc20e30b51c1e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
