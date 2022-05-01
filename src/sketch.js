let height = null;
let width = null;
let isMobile;
async function setup() {
  isMobile = window.mobileAndTabletCheck();
  textFont("Rubik Wet Paint");
  textFont("Black Ops One");

  firebaseCfg(); // initialize firebase --> in config.js
  // possible updates
  if (Math.floor(Math.random() * 5) == 4) {
    console.group("user-update (chance 1/5)");
    await updateUsers();
  }
  if (Math.floor(Math.random() * 10) == 9) {
    console.group("privateRooms-update (chance 1/10)");
    await updatePrivateRooms();
  }

  if (await checkUser() == true) { // check if user already choosed his window size
    mode = "menue";
    if (saveChoice === "IP") {
      width = await getData(mainPath + childUserpath + enIP + "/width");
      height = await getData(mainPath + childUserpath + enIP + "/height");
    } else {
      width = getCookie("properties")[0];
      height = getCookie("properties")[1];
    }
  } else {
    height = window.innerHeight;
    width = window.innerWidth;
    mode = "resizer";
  }
}


let size = 60;
let buttonAnimation = false;
let buttonDown = false;

function draw() {
  //console.log(mouseX, mouseY);
  if (mode === "resizer") {
    resizer();
  } else if (mode === "menue") {
    mainMenue();
  } else if (mode === "createRoom") {
    createRoom();
  } else if (mode === "privateGameCreator" || mode === "privateGameJoiner") { // upload of y coordinates of your bar, in interval of 3 changes
    privateGame();
  } else if (mode === "gameDeleted") {
    gameDeleted();
  }
}
