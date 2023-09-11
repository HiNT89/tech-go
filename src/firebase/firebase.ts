import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKoaqKRf0kbkNt4dBkY_ZB9-_stUGOUiA",
  authDomain: "techgo-b1a51.firebaseapp.com",
  projectId: "techgo-b1a51",
  storageBucket: "techgo-b1a51.appspot.com",
  messagingSenderId: "164532285914",
  appId: "1:164532285914:web:fde68cce701ee0f2bd90e3",
  measurementId: "G-X1HBXFHHZM",
};

const app = initializeApp(firebaseConfig);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfigCart = {
//   apiKey: "AIzaSyB9wGi28RCgXzy3VPvWLMHVv_qEJPlhhiY",
//   authDomain: "carttechgo.firebaseapp.com",
//   projectId: "carttechgo",
//   storageBucket: "carttechgo.appspot.com",
//   messagingSenderId: "58935958136",
//   appId: "1:58935958136:web:595a3eb94af312ec6a2b8d",
//   measurementId: "G-MG202H50CM",
// };

// Initialize Firebase
// const appCart = initializeApp(firebaseConfigCart);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
// const dbCart = getFirestore(appCart);
export { storage, auth, db };
