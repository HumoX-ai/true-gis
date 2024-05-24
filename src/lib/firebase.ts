import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUJZNkLDzQcYC1NfMI7r1lke1T2olL6bQ",
  authDomain: "true-gis.firebaseapp.com",
  projectId: "true-gis",
  storageBucket: "true-gis.appspot.com",
  messagingSenderId: "295436878652",
  appId: "1:295436878652:web:67706f0ff29d390a62d439",
  measurementId: "G-4F7PLQYCE0",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
