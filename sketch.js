let height = null;
let width = null;
async function setup() {
  firebaseCfg(); // initialize firebase --> in config.js
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
  }
}

function gotData() {}

function errData() {}
