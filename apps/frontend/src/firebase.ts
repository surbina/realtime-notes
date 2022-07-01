import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAENJzsUpc7azOR4TMi9KeZPCZ3HEoxt2o",
  authDomain: "realtime-editor-ce964.firebaseapp.com",
  projectId: "realtime-editor-ce964",
  storageBucket: "realtime-editor-ce964.appspot.com",
  messagingSenderId: "970252570115",
  appId: "1:970252570115:web:f60b3150c6c3ccb5388836",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
