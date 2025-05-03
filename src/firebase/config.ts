import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNXNnRKNaPNWarkv2LZzrpHnuwyhXJrA4",
    authDomain: "community-events-platfor-c94f5.firebaseapp.com",
    projectId: "community-events-platfor-c94f5",
    storageBucket: "community-events-platfor-c94f5.firebasestorage.app",
    messagingSenderId: "604510369427",
    appId: "1:604510369427:web:c7a3e5f0c6b30dff76ff66",
    measurementId: "G-6NDMWELPE5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

