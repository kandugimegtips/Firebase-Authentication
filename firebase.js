
import { initializeApp } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyB_DokWsYmGnBbvNVgR2TfQxWedJb9B114",
    authDomain: "oppgave-2-deef0.firebaseapp.com",
    projectId: "oppgave-2-deef0",
    storageBucket: "oppgave-2-deef0.firebasestorage.app",
    messagingSenderId: "53035052040",
    appId: "1:53035052040:web:6a089d0a40adc1f164b5bd"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
