// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyCqAYRT50d8xZOWupXrexbTGiR5HlrA-1c",
  authDomain: "zavrsni-3652b.firebaseapp.com",
  databaseURL: "https://zavrsni-3652b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "zavrsni-3652b",
  storageBucket: "zavrsni-3652b.appspot.com",
  messagingSenderId: "101835739443",
  appId: "1:101835739443:web:cc1179adbf283c49876e46",
  measurementId: "G-P4G2D842JF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getDatabase(app);
export {auth}