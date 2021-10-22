import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyDXEdUsm-hhvPdbEr_AjKKPnrazm4iOfE0",
    authDomain: "react-app-cursos-1b340.firebaseapp.com",
    projectId: "react-app-cursos-1b340",
    storageBucket: "react-app-cursos-1b340.appspot.com",
    messagingSenderId: "843925142161",
    appId: "1:843925142161:web:793475aaa08a8bde209d30"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvaider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvaider,
    firebase
};