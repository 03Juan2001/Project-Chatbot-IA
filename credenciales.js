// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5X8XsuXxwOQ0WsvBevPDIJLwY7GB62hs",
  authDomain: "auth-114b6.firebaseapp.com",
  projectId: "auth-114b6",
  storageBucket: "auth-114b6.appspot.com",
  messagingSenderId: "601055272320",
  appId: "1:601055272320:web:0ab83b7e0eb6c594677565"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;