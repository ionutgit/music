import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxfyZ4zrwg7Niz6I7E8vtBMVSprSLny6A",
    authDomain: "music-32665.firebaseapp.com",
    projectId: "music-32665",
    storageBucket: "music-32665.appspot.com",
    appId: "1:216763268922:web:b543ccce4e3241b59d1a03"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  const userCollection = db.collection('users');

  export {
    auth,
    db, 
    userCollection
  }