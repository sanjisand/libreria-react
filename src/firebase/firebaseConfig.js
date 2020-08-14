import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
	apiKey: "AIzaSyC-lsMum9W_8LmBgIxQVdax2rGvn6i2ZAs",
	authDomain: "login-react-5834e.firebaseapp.com",
	databaseURL: "https://login-react-5834e.firebaseio.com",
	projectId: "login-react-5834e",
	storageBucket: "login-react-5834e.appspot.com",
	messagingSenderId: "386681283973",
	appId: "1:386681283973:web:1a06da12b3b411b5ed10ec",
	measurementId: "G-QHS3GT61QM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
	db,
	googleAuthProvider,
	firebase
}