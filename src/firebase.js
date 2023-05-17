import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCQ8WvXGcQ8nOfnW0Aw8XRIkArvRir38f8",
  authDomain: "facctum-28457.firebaseapp.com",
  projectId: "facctum-28457",
  storageBucket: "facctum-28457.appspot.com",
  messagingSenderId: "671483496236",
  appId: "1:671483496236:web:80ed85f57154331614ce89"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)