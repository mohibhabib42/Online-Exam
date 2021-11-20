import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

const app=firebase.initializeApp({
    apiKey: "AIzaSyAjxtSBpKQS6lbOvUY5scNdR50904qtxMM",
    authDomain: "onlineexam-586bf.firebaseapp.com",
    projectId: "onlineexam-586bf",
    storageBucket: "onlineexam-586bf.appspot.com",
    messagingSenderId: "97266709550",
    appId: "1:97266709550:web:f26aae7384c1469e7edbbf"
  });
  export const auth =app.auth()
  export default app