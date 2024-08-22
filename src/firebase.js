import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvK4BfdgPp-OEipIorTWfDO7vZEooSJoY",
    authDomain: "cashy-2428f.firebaseapp.com",
    projectId: "cashy-2428f",
    storageBucket: "cashy-2428f.appspot.com",
    messagingSenderId: "178201906276",
    appId: "1:178201906276:web:fc707a50aae78f6dc3a371",
    measurementId: "G-XGBLDF7SWE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
