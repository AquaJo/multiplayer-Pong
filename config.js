
// ref - settings (with /)
let mainPath = "Pong/"
let childUserpath = "Users/";
let childPrivateRoomsPath = "privateRooms/";

let ballWidth = 22; // 25
let ballYCorrectionTimes = 3; // odd integer makes most sense
// aesthetic
let offButtonCol = [233,233,233];

let onButtonCol = [176,196,222];

let onButtonColCreateRoom = [255,140,0]

let backgroundCol = [20,20,20];


let barsXFromEdge = 8; // in percent from edge
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
}
