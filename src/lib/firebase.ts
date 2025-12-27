import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9yfKkyV5daW-_Inr7LPNaxuVP_qMnk2w",
  authDomain: "vnx-expense-tracker.firebaseapp.com",
  projectId: "vnx-expense-tracker",
  storageBucket: "vnx-expense-tracker.appspot.com",
  messagingSenderId: "899424792412",
  appId: "1:899424792412:web:c36b446168270ce0445b99",
};

const app = initializeApp(firebaseConfig);

// ✅ Firebase Authentication
export const auth = getAuth(app);

// ✅ Google Provider
export const googleProvider = new GoogleAuthProvider();
