import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCRekx1fmPbjxTQnXXQNlPUDyT1QJsKF14",
  authDomain: "football-web-development.firebaseapp.com",
  projectId: "football-web-development",
  storageBucket: "football-web-development.appspot.com",
  messagingSenderId: "595239639941",
  appId: "1:595239639941:web:9b0d0a2abf7e3504aa02ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {db, app, auth,storage };
