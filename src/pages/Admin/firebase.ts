import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


export { storage };
