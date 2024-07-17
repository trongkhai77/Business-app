// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZjfq3_FtWYg4KFdUT8Bvo-ddW-j2G1m0",
  authDomain: "business-directory-6116b.firebaseapp.com",
  projectId: "business-directory-6116b",
  storageBucket: "business-directory-6116b.appspot.com",
  messagingSenderId: "1073091063367",
  appId: "1:1073091063367:web:3c98887ab047b4a80e8b62",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
