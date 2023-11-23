// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    authDomain: "jeskin-app.firebaseapp.com",
    projectId: "jeskin-app",
    messagingSenderId: "121247162860",
    appId: "1:121247162860:web:ed272c4ede78be9a7820c9",
    measurementId: "G-X3VEFGEVVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
