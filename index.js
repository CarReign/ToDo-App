// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, query, where, getDocs, deleteDoc, addDoc, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyByPhFWtL-ans2q1C0Tnbi0NA1W8zxCUQU",

  authDomain: "it183-todo-app.firebaseapp.com",

  projectId: "it183-todo-app",

  storageBucket: "it183-todo-app.appspot.com",

  messagingSenderId: "881244583601",

  appId: "1:881244583601:web:4c8502f9b85e5c95399490"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todoRef = collection(db, 'todo');

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list = document.querySelector("#tasks");

document.addEventListener('DOMContentLoaded', ()=>{
    addNoteButton.addEventListener('click', ()=>{ addNote(); });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = input.value;
  addDoc(collection(db, 'todo'), {
  task: inputValue,
}).then(function (docRef) {alert("Document written with ID:" + docRef.task);});

});
