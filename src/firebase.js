import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwgp1Z5WHG2EOb75jN6C6b_xKHN7Q_QVY",
  authDomain: "instagram-clone-react-1bc0e.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-1bc0e.firebaseio.com",
  projectId: "instagram-clone-react-1bc0e",
  storageBucket: "instagram-clone-react-1bc0e.appspot.com",
  messagingSenderId: "100257977610",
  appId: "1:100257977610:web:1ea383b5860a1bfaead6f3",
  measurementId: "G-QWFJ4HGRRK"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db , auth , storage}