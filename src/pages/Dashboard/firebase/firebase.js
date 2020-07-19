import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC_sHl8qf-bznz4_TjTS_yc3-weBYGvizw",
    authDomain: "nozzle-fbff8.firebaseapp.com",
    databaseURL: "https://nozzle-fbff8.firebaseio.com",
    projectId: "nozzle-fbff8",
    storageBucket: "nozzle-fbff8.appspot.com",
    messagingSenderId: "24298117366",
    appId: "1:24298117366:web:565e40a8ef2bb5eb27b4d7",
    measurementId: "G-3X86XS1EDH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;
