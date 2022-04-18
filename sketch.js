let height = null;
let width = null;
let isMobile;
async function setup() {
  isMobile = deviceIsMobile();
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
    width = await getData(mainPath + childUserpath + enIP + "/width");
    height = await getData(mainPath + childUserpath + enIP + "/height");
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
  } else if (mode === "privateGameCreator") {
    privateGameCreator();
  } else if (mode === "privateGameJoiner") {
    privateGameJoiner();
  }
  if (mode === "privateGameCreator" || mode === "privateGameJoiner") { // upload of y coordinates of your bar, in interval of 3 changes
    if (counterXY > 2) { // counterY - Changes (x is pointless ....)
      counterXY = 0;
      let final = (side === "LEFT") ? cToU(null, bar1Y) : cToU(null, bar2Y);
      if (mode === "privateGameCreator") {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1Y").set(final);
      } else if (mode === "privateGameJoiner") {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2Y").set(final);
      }
    }
  }
}


function errData() {}
