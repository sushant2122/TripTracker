// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRQQnPRm_a1YxWtp1mId-MK0u7WBYgpqY",
    authDomain: "triptracker-43535.firebaseapp.com",
    projectId: "triptracker-43535",
    storageBucket: "triptracker-43535.appspot.com",
    messagingSenderId: "835371700213",
    appId: "1:835371700213:web:7756672b0046cfab7f5abc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')


export default app;