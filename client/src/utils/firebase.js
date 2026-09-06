import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiqai-e49c5.firebaseapp.com",
  projectId: "interviewiqai-e49c5",
  storageBucket: "interviewiqai-e49c5.firebasestorage.app",
  messagingSenderId: "855052975650",
  appId: "1:855052975650:web:4e4a9c2141266b891e547b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
