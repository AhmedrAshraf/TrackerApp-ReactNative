import * as firebase from "firebase";
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBhIkvSkQKK5HLZPyQztP_tRK2yx4CvG7g",
  authDomain: "traker-903da.firebaseapp.com",
  databaseURL: "https://traker-903da.firebaseio.com",
  projectId: "traker-903da",
  storageBucket: "traker-903da.appspot.com",
  messagingSenderId: "1057191777746",
  appId: "1:1057191777746:web:b1b84be72568a190"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function signup(name, email, psw, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    firebase.auth().createUserWithEmailAndPassword(email, psw).then(function (user) {
      dispatch({ type: 'SAVE_USER', payload: { name, email: user.user.email, uid: user.user.uid } })
      db.collection("users").add({
        name,
        email: user.user.email,
        uid: user.user.uid,
      }).then(() => {
        dispatch({ type: 'STOP_LOADER' })
        navigation.navigate('App')
      })
    })
  }
}



export function signin(email, psw, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    firebase.auth().signInWithEmailAndPassword(email, psw).then(function (user) {
      db.collection("users").where("uid", "==", user.user.uid).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            dispatch({ type: 'SAVE_USER', payload: { name: doc.data().name, email: user.user.email, uid: user.user.uid } })
          })
        })
    }).then(() => {
      dispatch({ type: 'STOP_LOADER' })
      navigation.navigate('App')
    })
  }
}


export function locate(region, email) {
    db.collection("locateUsers").add({ region, email })  
}