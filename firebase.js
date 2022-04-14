import { initializeApp} from 'firebase/app';
import {getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ4pYoE_oYFslFBBTKH0fOeKub8bvmGkQ",
  authDomain: "facebook-4494b.firebaseapp.com",
  projectId: "facebook-4494b",
  storageBucket: "facebook-4494b.appspot.com",
  messagingSenderId: "548022096961",
  appId: "1:548022096961:web:7b0f3a241fd8db5f1862c0",
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig)
  
export const  db = getFirestore(app)
// const auth = app.auth();
// const storage = firebase.storage();

// export  {   storage };
