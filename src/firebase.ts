import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyALywm0IsPDulMEEUKO4lVBVooO5ALZsMo',
  authDomain: 'over-under-84b5c.firebaseapp.com',
  projectId: 'over-under-84b5c',
  storageBucket: 'over-under-84b5c.appspot.com',
  messagingSenderId: '453286563422',
  appId: '1:453286563422:web:2bfd6e6a6a3cb068e02ecf'
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
