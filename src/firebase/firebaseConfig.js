import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE4uL6TMKXuBN4iMscXBW3qUk1qG9ettI",
  authDomain: "almaxflipkart.firebaseapp.com",
  projectId: "almaxflipkart",
  storageBucket: "almaxflipkart.appspot.com",
  messagingSenderId: "712953824648",
  appId: "1:712953824648:web:f4e4d3629680ded9d3a63d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
