
// ref - settings (with /)
let mainPath = "Pong/"
let childUserpath = "Users/";



// firebase - settings
let mainRef;
function firebaseCfg() {
  var firebaseConfig = {
    apiKey: "AIzaSyC8C6dVklj4cR6077sLGJcJLU07Uu1utXM",
    authDomain: "p5js-database.firebaseapp.com",
    databaseURL: "https://p5js-database-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "p5js-database",
    storageBucket: "p5js-database.appspot.com",
    messagingSenderId: "453623030868",
    appId: "1:453623030868:web:d4db68fb175aa87597f9c1",
    measurementId: "G-CQVG0BZ36E",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  mainRef = database.ref(mainPath);
  mainRef.on("value", gotData, errData);
}
