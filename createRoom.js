function createRoom() {
  textSize(uToF(70));
  background(backgroundCol[0], backgroundCol[1], backgroundCol[2]);
  textAlign(CENTER);
  inpJ.hide();

  createRoomButton();
  codeDisplay();
  codeCopy();
  roomSettings();
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
  if (mouseCreateRoom()) {
    color = [onButtonColCreateRoom[0] / 2, onButtonColCreateRoom[1], onButtonColCreateRoom[2]];
  } else {
    color = [255, 255, 255];
  }

  scoresPerRound();
  rounds();
  ballSpeed();
  extras();
  backgroundColor();
  barColors();
}
let roomSettingsScores = 5;

function scoresPerRound() {
  roomSettingsScoresPerRoundTxt = [
    ["scores per round:", null],
    ["  " + roomSettingsScores, null]
  ];
  if (mouseAddScores(2)) { //&& mouseX < txtCords[1] ) {
    roomSettingsScoresPerRoundTxt = [
      ["scores per round:", color],
      ["  " + roomSettingsScores, onButtonColCreateRoom]
    ];
  } else if (mouseAddScores(1)) {
    roomSettingsScoresPerRoundTxt = [
      ["scores per round:", onButtonColCreateRoom],
      ["  " + roomSettingsScores, onButtonColCreateRoom]
    ];
  } else {
    roomSettingsScoresPerRoundTxt = [
      ["scores per round:", color],
      ["  " + roomSettingsScores, color]
    ];
  }


  drawtext(roomSettingsStartX, roomSettingsStartY + 1 * roomSettingsChangeRate, roomSettingsScoresPerRoundTxt);
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
  drawtext(roomSettingsStartX, roomSettingsStartY + 2 * roomSettingsChangeRate, roomSettingsRoundsTxt);
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
  drawtext(roomSettingsStartX, roomSettingsStartY + 3 * roomSettingsChangeRate, roomSettingsBallSpeedTxt);
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
  drawtext(roomSettingsStartX, roomSettingsStartY + 4 * roomSettingsChangeRate, roomSettingsExtrasTxt);
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






function createRoomButton() {
  if (mouseCreateRoom()) {
    fill(onButtonColCreateRoom[0], onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
  } else {
    fill(255, 255, 255);
  }
  text(
    "create Room",
    width / 2,
    height / 1.1
  );
}

function codeDisplay() {
  if (createRoomStart) {
    code = createRandomCode(14);
    createRoomStart = false;
  }
  textAlign(CENTER);
  if (mouseCreateRoom()) {
    fill(onButtonColCreateRoom[0] / 1.4, onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
  } else {
    color = [255, 255, 255];
    fill(255, 255, 255);
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
    fill(255, 255, 255);
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
