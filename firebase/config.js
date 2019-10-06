import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBteHrIKjldgNxkxv6kvKlZtEfxXKkO4aQ",
  authDomain: "image-repository-6eee7.firebaseapp.com",
  databaseURL: "https://image-repository-6eee7.firebaseio.com",
  projectId: "image-repository-6eee7",
  storageBucket: "image-repository-6eee7.appspot.com",
  messagingSenderId: "993514081535",
  appId: "1:993514081535:web:7105d63e8700812d7650ca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db, firebase as default };
