// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDLOm9yw01gHC-_8Q_UNl2ycOZJTgM-l9o",
    authDomain: "whatsapp-18846.firebaseapp.com",
    databaseURL: "https://whatsapp-18846.firebaseio.com",
    projectId: "whatsapp-18846",
    storageBucket: "whatsapp-18846.appspot.com",
    messagingSenderId: "36395191298",
    appId: "1:36395191298:web:9dc0c5f69399a08b656b1b",
    measurementId: "G-JM24WRDHH9"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db; 