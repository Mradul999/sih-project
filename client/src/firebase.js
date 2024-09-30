// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "sih-project-d4d49.firebaseapp.com",
  projectId: "sih-project-d4d49",
  storageBucket: "sih-project-d4d49.appspot.com",
  messagingSenderId: "745854233350",
  appId: "1:745854233350:web:e9268ca9d10d384cc78c87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
