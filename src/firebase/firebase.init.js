// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdzR8ic1ayS0LZ8CC_t1nFijXcHivDA7A",
  authDomain: "coffee-store-app-a7d0d.firebaseapp.com",
  projectId: "coffee-store-app-a7d0d",
  storageBucket: "coffee-store-app-a7d0d.firebasestorage.app",
  messagingSenderId: "570018325181",
  appId: "1:570018325181:web:a9995826bc27577c720dd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);