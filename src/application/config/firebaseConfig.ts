import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBW8xAiQMFXry_3vVXho3YmZxzA9T6TXNg",
    authDomain: "apppacienttest.firebaseapp.com",
    projectId: "apppacienttest",
    storageBucket: "apppacienttest.appspot.com",
    messagingSenderId: "389532629036",
    appId: "1:389532629036:web:2994156952726da559f989"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firestore
export const db = getFirestore(app);
