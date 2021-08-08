import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1mic9gleQobhFWrQxWskxfKoDVMzn2UY",
  authDomain: "marketchoo-89871.firebaseapp.com",
  projectId: "marketchoo-89871",
  storageBucket: "marketchoo-89871.appspot.com",
  messagingSenderId: "84120150461",
  appId: "1:84120150461:web:2cf59081260700a243b2d4",
  measurementId: "G-YNBRZPWSFZ"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
