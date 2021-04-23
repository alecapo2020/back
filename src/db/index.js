import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp({
        apiKey: "AIzaSyBna6ZFdu9NslYQRkNJbjjiEoHwFvsO4kk",
        authDomain: "manillasdb.firebaseapp.com",
        projectId: "manillasdb",
        storageBucket: "manillasdb.appspot.com",
        messagingSenderId: "976591616481",
        appId: "1:976591616481:web:f23bb8765fefcddeb4faa0",
        measurementId: "G-ETRL8ZL7T2"
})

export function getFirebase(){
    return app;
}

export function getFirestore(){
    return firebase.firestore(app);
}