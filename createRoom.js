function createRoom() {
  textSize(uToF(70));
  background(backgroundCol[0], backgroundCol[1], backgroundCol[2]);
  textAlign(CENTER);
  inpJ.hide();

  codeDisplay();
  codeCopy();
  createRoomButton();
  roomSettings();
}

async function registerPrivateRoom() {
  console.group("register private room");
  privateGameFirst = true;
  mode = "privateGameCreator";
  let date = await getUnixTimestamp();
  mainRef.child(childPrivateRoomsPath + "/" + code + "/date").set(date);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/scoresPerRound").set(roomSettingsScores);
  //mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/rounds").set(roomSettingsRounds);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/ballSpeed").set(roomSettingsBallSpeed);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/barSpeed").set(roomSettingsBarSpeed);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/extras").set(roomSettingsExtras);

  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/backgroundColor/R").set(roomSettingsBackgroundR);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/backgroundColor/G").set(roomSettingsBackgroundG);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/backgroundColor/B").set(roomSettingsBackgroundB);

  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/barColors/R").set(roomSettingsBarR);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/barColors/G").set(roomSettingsBarG);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/settings/barColors/B").set(roomSettingsBarB);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/opponentReady").set(false);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1Y").set(955/2);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2Y").set(955/2);
  //mainRef.child(childPrivateRoomsPath + "/" + code + "/game/creatorSide").set("LEFT");

  //mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(1);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/yChange").set(0);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/score1").set(-1);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/score2").set(-1);
  mainRef.child(childPrivateRoomsPath + "/" + code + "/game/ballY").set(-1);
  let gameRefBallY = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/ballY");
  gameRefBallY.on("value", gotDataBallY, errData);
  let gameRefScore1 = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/score1");
  gameRefScore1.on("value", gotDataScore1, errData);
  let gameRefScore2 = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/score2");
  gameRefScore2.on("value", gotDataScore2, errData);
  let gameRefOpponentReady = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/opponentReady");
  let gameRefBar2 = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/bar2");
  let gameRefBar2Y = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/bar2Y");
  //let gameRefPath = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/path");
  let gameRefYChange = database.ref(mainPath + "/" + childPrivateRoomsPath + "/" + code + "/game/yChange");
  path = 1;
  gameRefYChange.on("value", gotDataYChange, errData);
  //gameRefPath.on("value", gotDataPath, errData);
  gameRefOpponentReady.on("value", gotDataOpponentReady, errData);
  //gameRefBar1.on("value", gotDataBar1, errData);
  gameRefBar2.on("value", gotDataBar2, errData);
  //gameRefBar1Y.on("value", gotDataBar1Y, errData);
  gameRefBar2Y.on("value", gotDataBar2Y, errData);

  console.log("successfull registration of private room");
  console.log("key: " + code);
  console.log("unixTimestamp: " + date);
  console.log("expiring time: 30 minutes");
  console.groupEnd();
}

let txt;
let color;
let roomSettingsStartY;
let roomSettingsChangeRate; //"" first time in first item already
let roomSettingsStartX;
let roomsSettingsSize;

function roomSettings() {
  roomSettingsStartX = width / 9;
  roomSettingsStartY = (height / 6);
  roomSettingsChangeRate = (height / 10);
  textAlign(LEFT);
  textSize(uToF(70));
  roomSettingsSize = uToF(70);
  if (mouseRoomSettingsLastLine(3)) {
    color = [onButtonColCreateRoom[0] / 2, onButtonColCreateRoom[1], onButtonColCreateRoom[2]];
  } else {
    color = offButtonCol; // because offButtonCol later added
  }

  scoresPerRound();
  //rounds();
  ballSpeed();
  barSpeed();
  extras();
  backgroundColor();
  barColors();
}
let roomSettingsScores = 5;

function scoresPerRound() {
  roomSettingsScoresPerRoundTxt = [
    ["scores:", null],
    ["  " + roomSettingsScores, null]
  ];
  if (mouseAddScores(2)) { //&& mouseX < txtCords[1] ) {
    roomSettingsScoresPerRoundTxt = [
      ["scores:", color],
      ["  " + roomSettingsScores, onButtonColCreateRoom]
    ];
  } else if (mouseAddScores(1)) {
    roomSettingsScoresPerRoundTxt = [
      ["scores:", onButtonColCreateRoom],
      ["  " + roomSettingsScores, onButtonColCreateRoom]
    ];
  } else {
    roomSettingsScoresPerRoundTxt = [
      ["scores:", color],
      ["  " + roomSettingsScores, color]
    ];
  }


  drawtext(roomSettingsStartX, roomSettingsStartY + 1 * roomSettingsChangeRate, roomSettingsScoresPerRoundTxt, "LEFT", roomSettingsSize);
}
let roomSettingsRounds = 3;

function rounds() {
  roomSettingsRoundsTxt = [
    ["rounds:", null],
    ["  " + roomSettingsRounds, null]
  ];
  if (mouseAddRounds(2)) { //&& mouseX < txtCords[1] ) {
    roomSettingsRoundsTxt = [
      ["rounds:", color],
      ["  " + roomSettingsRounds, onButtonColCreateRoom]
    ];
  } else if (mouseAddRounds(1)) {
    roomSettingsRoundsTxt = [
      ["rounds:", onButtonColCreateRoom],
      ["  " + roomSettingsRounds, onButtonColCreateRoom]
    ];
  } else {
    roomSettingsRoundsTxt = [
      ["rounds:", color],
      ["  " + roomSettingsRounds, color]
    ];
  }
  drawtext(roomSettingsStartX, roomSettingsStartY + 2 * roomSettingsChangeRate, roomSettingsRoundsTxt, "LEFT", roomSettingsSize);
}

let roomSettingsBallSpeed = 10;

function ballSpeed() {
  roomSettingsBallSpeedTxt = [
    ["ball speed:", null],
    ["  10", null]
  ];
  if (mouseAddBallSpeed(2)) { //&& mouseX < txtCords[1] ) {
    roomSettingsBallSpeedTxt = [
      ["ball speed:", color],
      ["  " + roomSettingsBallSpeed, onButtonColCreateRoom]
    ];
  } else if (mouseAddBallSpeed(1)) {
    roomSettingsBallSpeedTxt = [
      ["ball speed:", onButtonColCreateRoom],
      ["  " + roomSettingsBallSpeed, onButtonColCreateRoom]
    ];
  } else {
    roomSettingsBallSpeedTxt = [
      ["ball speed:", color],
      ["  " + roomSettingsBallSpeed, color]
    ];
  }
  drawtext(roomSettingsStartX, roomSettingsStartY + 2 * roomSettingsChangeRate, roomSettingsBallSpeedTxt, "LEFT", roomSettingsSize);
}
let roomSettingsBarSpeed = 10;

function barSpeed() {
  let finalColors = [];
  roomSettingsBarSpeedTxt = [
    ["bar speed: ", finalColors[0]],
    [roomSettingsBarSpeed, finalColors[1]]
  ];

  if (mouseAddBarSpeed(1)) {
    finalColors = [onButtonColCreateRoom, onButtonColCreateRoom];
  } else if (mouseAddBarSpeed(2)) {
    finalColors = [color, onButtonColCreateRoom];
  } else {
    finalColors = [color, color];
  }
  roomSettingsBarSpeedTxt = [
    ["bar speed: ", finalColors[0]],
    [roomSettingsBarSpeed, finalColors[1]]
  ];
  drawtext(roomSettingsStartX, roomSettingsStartY + 3 * roomSettingsChangeRate, roomSettingsBarSpeedTxt);
}
let roomSettingsExtras = "off";

function extras() {
  roomSettingsExtrasTxt = [
    ["extras:  ", null],
    ["off", null]
  ];
  if (mouseChangeExtras(1)) { //&& mouseX < txtCords[1] ) {
    roomSettingsExtrasTxt = [
      ["extras:", onButtonColCreateRoom],
      ["  " + roomSettingsExtras, onButtonColCreateRoom]
    ];
  } else if (mouseChangeExtras(2)) {
    roomSettingsExtrasTxt = [
      ["extras:", color],
      ["  " + roomSettingsExtras, onButtonColCreateRoom]
    ];
  } else {
    roomSettingsExtrasTxt = [
      ["extras:", color],
      ["  " + roomSettingsExtras, color]
    ];
  }
  drawtext(roomSettingsStartX, roomSettingsStartY + 4 * roomSettingsChangeRate, roomSettingsExtrasTxt, "LEFT", roomSettingsSize);
}
let roomSettingsBackgroundR = 20;
let roomSettingsBackgroundG = 20;
let roomSettingsBackgroundB = 20;

function backgroundColor() {
  let finalColors = [];
  roomSettingsBackgroundTxt = [
    ["background color:  ", finalColors[0]],
    [roomSettingsBackgroundR, finalColors[1]],
    [" , ", finalColors[4]],
    [roomSettingsBackgroundG, finalColors[2]],
    [" , ", finalColors[4]],
    [roomSettingsBackgroundB, finalColors[3]]
  ];

  if (mouseAddBackground(1)) {
    finalColors = [onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom];
  } else if (mouseAddBackground(2)) {
    finalColors = [color, onButtonColCreateRoom, color, color, color];
  } else if (mouseAddBackground(4)) {
    finalColors = [color, color, onButtonColCreateRoom, color, color];
  } else if (mouseAddBackground(6)) {
    finalColors = [color, color, color, onButtonColCreateRoom, color];
  } else {
    finalColors = [color, color, color, color, color];
  }
  roomSettingsBackgroundTxt = [
    ["background color:  ", finalColors[0]],
    [roomSettingsBackgroundR, finalColors[1]],
    [" , ", finalColors[4]],
    [roomSettingsBackgroundG, finalColors[2]],
    [" , ", finalColors[4]],
    [roomSettingsBackgroundB, finalColors[3]]
  ];
  drawtext(roomSettingsStartX, roomSettingsStartY + 5 * roomSettingsChangeRate, roomSettingsBackgroundTxt);
}
let roomSettingsBarR = 255;
let roomSettingsBarG = 255;
let roomSettingsBarB = 255;

function barColors() {
  let finalColors = [];
  roomSettingsBarTxt = [
    ["bar colors:  ", finalColors[0]],
    [roomSettingsBarR, finalColors[1]],
    [" , ", finalColors[4]],
    [roomSettingsBarG, finalColors[2]],
    [" , ", finalColors[4]],
    [roomSettingsBarB, finalColors[3]]
  ];

  if (mouseAddBar(1)) {
    finalColors = [onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom, onButtonColCreateRoom];
  } else if (mouseAddBar(2)) {
    finalColors = [color, onButtonColCreateRoom, color, color, color];
  } else if (mouseAddBar(4)) {
    finalColors = [color, color, onButtonColCreateRoom, color, color];
  } else if (mouseAddBar(6)) {
    finalColors = [color, color, color, onButtonColCreateRoom, color];
  } else {
    finalColors = [color, color, color, color, color];
  }
  roomSettingsBarTxt = [
    ["bar colors:  ", finalColors[0]],
    [roomSettingsBarR, finalColors[1]],
    [" , ", finalColors[4]],
    [roomSettingsBarG, finalColors[2]],
    [" , ", finalColors[4]],
    [roomSettingsBarB, finalColors[3]]
  ];
  drawtext(roomSettingsStartX, roomSettingsStartY + 6 * roomSettingsChangeRate, roomSettingsBarTxt);
}

function createRoomButton() { // last line --> edited later on
  textAlign(LEFT);
  textSize(uToF(70));
  let finalColors = [];
  roomSettingsLastLineTxt = [
    ["back", finalColors[0]],
    ["                          ", null],
    ["create room", finalColors[1]]
  ];
  if (mouseRoomSettingsLastLine(1)) {
    finalColors = [onButtonColCreateRoom, offButtonCol];
  } else if (mouseRoomSettingsLastLine(3)) {
    finalColors = [offButtonCol, onButtonColCreateRoom];
  } else {
    finalColors = [offButtonCol, offButtonCol];
  }
  roomSettingsLastLineTxt = [
    ["back", finalColors[0]],
    ["                          ", null],
    ["create room", finalColors[1]]
  ];
  drawtext(width / 2, height / 1.14, roomSettingsLastLineTxt, "CENTER", uToF(70));
}

function codeDisplay() {
  if (createRoomStart) {
    code = createRandomCode(14);
    createRoomStart = false;
  }
  textAlign(CENTER);
  try {
    if (mouseRoomSettingsLastLine(3)) {
      fill(onButtonColCreateRoom[0] / 1.4, onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
    } else {
      color = offButtonCol;
      fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
    }
  } catch (error) {
    color = offButtonCol;
    fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
  }
  text(
    "Code: " + code,
    width / 2,
    height / 7
  );
}

let code;
let createRoomStart = true;

function createRandomCode(length) {
  let res = "";
  for (let i = 0; i < length; ++i) {
    numb = Math.floor(Math.random() * 3);
    if (numb == 0) {
      res += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    } else if (numb == 1) {
      res += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    } else {
      res += (Math.floor(Math.random() * 10)).toString();
    }
  }
  return res;
}

function codeCopy() {
  if (mouseCopy()) {
    fill(onButtonColCreateRoom[0], onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
  } else {
    fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
  }
  // button click animation
  if (buttonAnimation) {
    if (size < 67 && !buttonDown) {
      size += 3.5;
    } else {
      buttonDown = true;
      size -= 3;
      if (size <= 60) {
        size = 60;
        buttonDown = false;
        buttonAnimation = false;
      }
    }
  }
  //
  textAlign(CENTER);
  textSize(uToF(size));
  text(
    "copy",
    width / 1.2,
    height / 7.1
  );
}
