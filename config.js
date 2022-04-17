
// ref - settings (with /)
let mainPath = "Pong/"
let childUserpath = "Users/";

// aesthetic
let onButtonCol = [];
onButtonCol[0] = 176;
onButtonCol[1] = 196;
onButtonCol[2] = 222;

let onButtonColCreateRoom = []
onButtonColCreateRoom[0] = 255;
onButtonColCreateRoom[1] = 140;
onButtonColCreateRoom[2] = 0;

let backgroundCol = [];
backgroundCol[0] = 20;
backgroundCol[1] = 20;
backgroundCol[2] = 20;

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
