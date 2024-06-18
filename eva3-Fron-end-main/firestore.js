import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyCe-XVEJGRxbMGKxKUJH-cpwx2ifmjinGM",
    authDomain: "eva3-f78d2.firebaseapp.com",
    projectId: "eva3-f78d2",
    storageBucket: "eva3-f78d2.appspot.com",
    messagingSenderId: "1089815519650",
    appId: "1:1089815519650:web:8defd5142d17ad2e9a92fb",
    measurementId: "G-813Q9SCGMM"
  };
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (reservas) => {
    addDoc(collection(db, 'Reservas'), reservas)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Reservas'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Reservas', id))
}
export const getDocumento = (id) => getDoc(doc(db, 'Reservas', id))

export const update = (id,res) =>{
    updateDoc(doc(db,'Reservas',id),res)
}