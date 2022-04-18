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
    if (privateGameFirst) {
      privateGameFirst = false;
      bar1Y = height/2;
    }
    background(roomSettingsBackgroundR, roomSettingsBackgroundG, roomSettingsBackgroundB);
    drawLines();
    privateGameCreator();
    drawOwnBar();
  }
}
let bar1Y;
let privateGameFirst = true;
function drawOwnBar() {
  if (keyIsDown(87)) {
    bar1Y -= height/80;
  } else if (keyIsDown(83)) {
    bar1Y += height/80;
  }
  fill(roomSettingsBarR, roomSettingsBarG, roomSettingsBarB);
  noStroke();
  rectMode(CENTER);
  rect(width * (barsXFromEdge/100), bar1Y, width/75, height/10);
}
function drawLines() {
  rectMode(CENTER);
  fill(roomSettingsBarR,roomSettingsBarG,roomSettingsBarB);
  noStroke();
  for (let i = 0; i < 16; ++i) {
    rect(width / 2, 40 * i, width / 300, height / 20);
  }
}

function privateGameCreator() {
  textSize(uToF(32));
  let finalColors = [];
  privateGameCreatorCodeTxt = [
    ["Code: " + code, finalColors[0]],
    ["      ", finalColors[0]],
    ["copy", finalColors[2]]
  ];
  if (mouseInGameCodeCopy(3)) {
    finalColors = [offButtonCol, offButtonCol, onButtonColCreateRoom];
  } else {
    finalColors = [offButtonCol, offButtonCol, offButtonCol];
  }
  privateGameCreatorCodeTxt = [
    ["Code: " + code, finalColors[0]],
    ["      ", finalColors[0]],
    ["copy", finalColors[2]]
  ];
  drawtext(width / 2, height / 24, privateGameCreatorCodeTxt, "CENTER", uToF(32));

  textSize(uToF(70));
  textAlign(CENTER);
  fill(offButtonCol[0] / 1.3, offButtonCol[1], offButtonCol[2]);
  text("wait for opponent", width / 2, height / 5);
  textAlign(LEFT);
}



function gotData() {}

function errData() {}
