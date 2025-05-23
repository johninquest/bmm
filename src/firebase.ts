import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { browser } from '$app/environment';

const firebaseConfig = {
  apiKey: "AIzaSyBa67cOK3DfwbvIY3Ph32cH9Tpp8w5zjho",
  authDomain: "boromanaja.firebaseapp.com",
  projectId: "boromanaja",
  storageBucket: "boromanaja.firebasestorage.app",
  messagingSenderId: "1095396590001",
  appId: "1:1095396590001:web:e875d3af94ac507cea7d90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Only initialize analytics on the client side
export const analytics = browser ? getAnalytics(app) : null;