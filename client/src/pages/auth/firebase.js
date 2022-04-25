import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAx5Nb68Rqv2qBm-pIyIjMlpK2bm7MfWLw",
    authDomain: "frica-73632.firebaseapp.com",
    projectId: "frica-73632",
    storageBucket: "frica-73632.appspot.com",
    messagingSenderId: "165994709129",
    appId: "1:165994709129:web:179641841d77c58c798658",
    measurementId: "G-9JBX29LE49"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()