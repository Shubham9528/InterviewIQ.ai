import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "jobwisecv.firebaseapp.com",
  projectId: "jobwisecv",
  storageBucket: "jobwisecv.firebasestorage.app",
  messagingSenderId: "573705387809",
  appId: "1:573705387809:web:e7a9e95cc85e0e0a964860",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
