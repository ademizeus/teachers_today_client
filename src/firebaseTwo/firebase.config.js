// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqLpPVzd0Y9SWTpSH1smRmbKv4WUvi-4",
  authDomain: "tutors-today-student.firebaseapp.com",
  projectId: "tutors-today-student",
  storageBucket: "tutors-today-student.appspot.com",
  messagingSenderId: "171808622362",
  appId: "1:171808622362:web:cb9ad091e01bba89988ea3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;