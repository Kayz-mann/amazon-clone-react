import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyALaSWoFd7E0P4iHwwgVzGm7rfLAJmKG_A",
  authDomain: "clone-react-ce3d8.firebaseapp.com",
  databaseURL: "https://clone-react-ce3d8.firebaseio.com",
  projectId: "clone-react-ce3d8",
  storageBucket: "clone-react-ce3d8.appspot.com",
  messagingSenderId: "90370295695",
  appId: "1:90370295695:web:ecb54f4cee291f11ec2dfa",
  measurementId: "G-EBQ9VLPPFT",
});

// const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
