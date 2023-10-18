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

var userId;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todoRef = collection(db, 'todo');

const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-input");
const taskList = document.getElementById("tasks");

document.addEventListener('DOMContentLoaded', () => {
  /*
  1. Get the document cookie
  2.1 If cookie exists, check if the cookie has the user's unique Id
  2.2 If it has the user's unique Id, get the user's tasks with user id, and display it
  3.1. If not, generate a new unique Id and store it in the cookie
  */
  const cookie = document.cookie;
  if (cookie) {
    userId = JSON.parse(cookie).userId; 
    getTasks();
  } else {
    userId = generateId();
    document.cookie = JSON.stringify({userId: userId}); 
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
  });
});

function addTask() {
  const inputValue = input.value;
  addDoc(collection(db, 'todo'), {
    userId: userId,
    task: inputValue,
    date: new Date(),
    done: false,
  }).then(
    (docRef) => {
      console.log("Document written with ID: ", docRef.id);
      input.value = '';
      taskList.innerHTML += `<li id="${docRef.id}">${inputValue}</li>`;
    }
  ).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function getTasks(){
  const q = query(todoRef, where("userId", "==", userId), orderBy("date", "desc"));
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const documentData = doc.data(); 
      taskList.innerHTML += `<li id="${doc.id}">${documentData.task}</li>`;
    });
  });
};

/*
const q = query(todoRef, where("id", "==", id), orderBy("date", "desc"));

getDocs(q).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref).then(
      () => { 
        // what to do if the document is deleted
      }
    ).catch((error) => {
      // what to do if the document fails to delete
    });
    ;
  }
});

*/

function generateId(){
  var dt = new Date().getTime();
  var id = 'xxx-xxxx-xxxx-xxxxxxx-xxxxx-xxxx-xxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return id;
}