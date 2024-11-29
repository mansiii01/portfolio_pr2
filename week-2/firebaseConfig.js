// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNotroZdrNKHyMKpRgvfLWA0UlWuzIXOw",
  authDomain: "portfolio-8533b.firebaseapp.com",
  projectId: "portfolio-8533b",
  storageBucket: "portfolio-8533b.firebasestorage.app",
  messagingSenderId: "131468313622",
  appId: "1:131468313622:web:7c75456295c3841441e137"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}