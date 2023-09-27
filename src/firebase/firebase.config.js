

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase configuration for your first app
const firebaseConfig1 = {
  apiKey: "AIzaSyDlbFDMF53VID-lQNtHBv013ARrPZXIUEY",
  authDomain: "political-portfolio.firebaseapp.com",
  projectId: "political-portfolio",
  storageBucket: "political-portfolio.appspot.com",
  messagingSenderId: "830906600717",
  appId: "1:830906600717:web:263f6b6d10075a6cedb444"
};

// Firebase configuration for your second app
const firebaseConfig2 = {
  apiKey: "AIzaSyDHqLpPVzd0Y9SWTpSH1smRmbKv4WUvi-4",
  authDomain: "tutors-today-student.firebaseapp.com",
  projectId: "tutors-today-student",
  storageBucket: "tutors-today-student.appspot.com",
  messagingSenderId: "171808622362",
  appId: "1:171808622362:web:cb9ad091e01bba89988ea3",
};

// Initialize Firebase for the first app
const app1 = initializeApp(firebaseConfig1, "app1");

// Initialize Firebase for the second app
const app2 = initializeApp(firebaseConfig2, "app2");

export { app1, app2 };
