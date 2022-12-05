import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCfyEFFLst-xfM7Lr1TxRmUfrsSKQm8gyg",
  authDomain: "what-s-app-clone-299a6.firebaseapp.com",
  databaseURL: "https://what-s-app-clone-299a6-default-rtdb.firebaseio.com",
  projectId: "what-s-app-clone-299a6",
  storageBucket: "what-s-app-clone-299a6.appspot.com",
  messagingSenderId: "86644465240",
  appId: "1:86644465240:web:96f2bf9fc879aa20b2742d",
  measurementId: "G-VQKJHLL8YP"
};


export const app = initializeApp(firebaseConfig);
const db=getFirestore()
//const analytics = getAnalytics(app);

export default {db}