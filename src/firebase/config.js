import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBO_e_u5xImySvehhljUIWPh2yo8jcwppU",
    authDomain: "miniblog-32ed4.firebaseapp.com",
    projectId: "miniblog-32ed4",
    storageBucket: "miniblog-32ed4.firebasestorage.app",
    messagingSenderId: "1059194610838",
    appId: "1:1059194610838:web:03b2d93c2034208db60eb7",
    measurementId: "G-HLLXG35JMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };