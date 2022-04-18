var released = true;
function mouseReleased(){
	released = true;
	return false;
}


async function mousePressed() {
  if(!released){
		return;
	}
	released = false;

  // resizer buttons
  if (mode === "resizer") {
    let changeR = height / 180;
    if (mousePlus()) { // plus recognition (resizing)
      height += height / 180;
      resize = true;
    } else if (mouseMinus()) { // minus recognition (resizing)
      if (height - changeR > 0) {
        height -= height / 180;
      }
      resize = true;
    } else if (mouseContinueZoom()) { // continue
      input = true;
      mode = "menue";
      let date = await getUnixTimestamp();
      mainRef.child(childUserpath + "/" + enIP + "/date").set(date);
      mainRef.child(childUserpath + "/" + enIP + "/width").set(width);
      mainRef.child(childUserpath + "/" + enIP + "/height").set(height);
      console.log("unixTimestamp: " + date);
      console.log("user-IP got registrated on database with expiretime of 1 week");
      console.groupEnd();
    }
  } else if (mode === "menue") {
    if (mouseContinueResizeAgain()) {
      inpJ.hide();
      // adjust to window size
      height = window.innerHeight;
      width = window.innerWidth;
      if (width * 0.497395833 > height || resize) {
        width = height * 2.0104712;
        createCanvas(width, height);
        resize = false;
      } else {
        height = width * 0.497395833;
        createCanvas(width, height); //baseSize: 1920 x 955
      }
      //
      mode = "resizer";
    } else if (mouseContinueCreate()) {
      roomSettingsScores = 5; // as of 2022.4.17
      roomSettingsRounds = 3;
      roomSettingsBallSpeed = 10;
      roomSettingsExtras = "off";
      roomSettingsBackgroundR = 20;
      roomSettingsBackgroundG = 20;
      roomSettingsBackgroundB = 20;
      roomSettingsBarR = 255;
      roomSettingsBarG = 255;
      roomSettingsBarB = 255;
      inpJ.show();
      mode = "createRoom";
    }
  } else if (mode === "createRoom") {
    roomSettingsChanger();
    if (mouseRoomSettingsLastLine(3)) {
      let refStr = mainPath + "/" + childPrivateRoomsPath;
      let ref = database.ref(refStr);
      await ref.once('value').then(async function(snapshot) {
        if (snapshot.val() != null) {
          let keys = Object.keys(snapshot.val());
          if (keys.includes(code)) {
            createRoomStart = true;
          } else {
            registerPrivateRoom();
          }
        } else {
          registerPrivateRoom();
        }
      });
    } else if (mouseRoomSettingsLastLine(1)) {
      mode = "menue";
    }
  } else if (mode === "privateGameCreator") {
    textSize(uToF(32));
    if (mouseInGameCodeCopy(3)) {
      navigator.clipboard.writeText(code);
    }
  }
}

function roomSettingsChanger() {
  if (mouseCopy()) {
    navigator.clipboard.writeText(code);
    buttonAnimation = true;
  } else if (mouseAddScores(1) || mouseAddScores(2)) {
    if (roomSettingsScores < 10) {
      roomSettingsScores++;
    } else {
      roomSettingsScores = 1;
    }
  } else if (mouseAddRounds(1) || mouseAddRounds(2)) {
    if (roomSettingsRounds < 10) {
      roomSettingsRounds++;
    } else {
      roomSettingsRounds = 1;
    }
  } else if (mouseAddBallSpeed(1) || mouseAddBallSpeed(2)) {
    if (roomSettingsBallSpeed < 20) {
      roomSettingsBallSpeed++;
    } else {
      roomSettingsBallSpeed = 1;
    }
  } else if (mouseChangeExtras(1) || mouseChangeExtras(2)) {
    if (roomSettingsExtras === "off") {
      roomSettingsExtras = "on";
    } else {
      roomSettingsExtras = "off";
    }
  } else if (mouseAddBackground(2)) {
    if (roomSettingsBackgroundR < 255) {
      roomSettingsBackgroundR += 5;
    } else {
      roomSettingsBackgroundR = 0;
    }
  } else if (mouseAddBackground(4)) {
    if (roomSettingsBackgroundG < 255) {
      roomSettingsBackgroundG += 5;
    } else {
      roomSettingsBackgroundG = 0;
    }
  } else if (mouseAddBackground(6)) {
    if (roomSettingsBackgroundB < 255) {
      roomSettingsBackgroundB += 5;
    } else {
      roomSettingsBackgroundB = 0;
    }
  } else if (mouseAddBackground(1)) {
    if (roomSettingsBackgroundR + 20 <= 255) {
      roomSettingsBackgroundR += 20;
    } else {
      roomSettingsBackgroundR = roomSettingsBackgroundR + 20 - 255;
    }
    if (roomSettingsBackgroundG + 20 <= 255) {
      roomSettingsBackgroundG += 20;
    } else {
      roomSettingsBackgroundG = roomSettingsBackgroundG + 20 - 255;
    }
    if (roomSettingsBackgroundB + 20 <= 255) {
      roomSettingsBackgroundB += 20;
    } else {
      roomSettingsBackgroundB = roomSettingsBackgroundB + 20 - 255;
    }
  } else if (mouseAddBar(1)) {
    if (roomSettingsBarR + 20 <= 255) {
      roomSettingsBarR += 20;
    } else {
      roomSettingsBarR = roomSettingsBarR + 20 - 255;
    }
    if (roomSettingsBarG + 20 <= 255) {
      roomSettingsBarG += 20;
    } else {
      roomSettingsBarG = roomSettingsBarG + 20 - 255;
    }
    if (roomSettingsBarB + 20 <= 255) {
      roomSettingsBarB += 20;
    } else {
      roomSettingsBarB = roomSettingsBarB + 20 - 255;
    }
  } else if (mouseAddBar(2)) {
    if (roomSettingsBarR < 255) {
      roomSettingsBarR += 5;
    } else {
      roomSettingsBarR = 0;
    }
  } else if (mouseAddBar(4)) {
    if (roomSettingsBarG < 255) {
      roomSettingsBarG += 5;
    } else {
      roomSettingsBarG = 0;
    }
  } else if (mouseAddBar(6)) {
    if (roomSettingsBarB < 255) {
      roomSettingsBarB += 5;
    } else {
      roomSettingsBarB = 0;
    }
  }
}

// touch sensors for buttons --> due to getTextCords() function
let privateGameCreatorCodeTxt;

function mouseInGameCodeCopy(item) {
  txtCords = getTextCords(privateGameCreatorCodeTxt, item, width / 2, height / 24, "CENTER", uToF(32));
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}


let roomSettingsLastLineTxt;

function mouseRoomSettingsLastLine(item) {
  txtCords = getTextCords(roomSettingsLastLineTxt, item, width / 2, height / 1.14, "CENTER", uToF(70));
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}
let roomSettingsScoresPerRoundTxt;

function mouseAddScores(item) {
  txtCords = getTextCords(roomSettingsScoresPerRoundTxt, item, roomSettingsStartX, roomSettingsStartY + 1 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsRoundsTxt;

function mouseAddRounds(item) {
  let txtCords = getTextCords(roomSettingsRoundsTxt, item, roomSettingsStartX, roomSettingsStartY + 2 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

function mouseAddRoundsTitle() { // mouse-Title functions pointless --> new functions with index as parameter
  let txtCords = getTextCords(roomSettingsRoundsTxt, 1, roomSettingsStartX, roomSettingsStartY + 2 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsBallSpeedTxt;

function mouseAddBallSpeed(item) {
  let txtCords = getTextCords(roomSettingsBallSpeedTxt, item, roomSettingsStartX, roomSettingsStartY + 3 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

function mouseAddBallSpeedTitle() {
  let txtCords = getTextCords(roomSettingsBallSpeedTxt, 1, roomSettingsStartX, roomSettingsStartY + 3 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsExtrasTxt;

function mouseChangeExtras(item) {
  let txtCords = getTextCords(roomSettingsExtrasTxt, item, roomSettingsStartX, roomSettingsStartY + 4 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

function mouseChangeExtrasTitle() {
  let txtCords = getTextCords(roomSettingsExtrasTxt, 1, roomSettingsStartX, roomSettingsStartY + 4 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsBackgroundRTxt;
let roomSettingsBackgroundTxt;

function mouseAddBackground(item) {
  let txtCords = getTextCords(roomSettingsBackgroundTxt, item, roomSettingsStartX, roomSettingsStartY + 5 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

function mouseAddBackgroundTitle() {
  let txtCords = getTextCords(roomSettingsBackgroundRTxt, 1, roomSettingsStartX, roomSettingsStartY + 5 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsBackgroundGTxt;

function mouseAddBackgroundG() { // --> pointsless
  let txtCords = getTextCords(roomSettingsBackgroundGTxt, 3, roomSettingsStartX, roomSettingsStartY + 5 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsBackgroundBTxt;

function mouseAddBackgroundB() {
  let txtCords = getTextCords(roomSettingsBackgroundBTxt, 4, roomSettingsStartX, roomSettingsStartY + 5 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}
let roomSettingsBarTxt;

function mouseAddBar(item) {
  let txtCords = getTextCords(roomSettingsBarTxt, item, roomSettingsStartX, roomSettingsStartY + 6 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}
let roomSettingsBarRTxt;

function mouseAddBarR() {
  let txtCords = getTextCords(roomSettingsBarRTxt, 2, roomSettingsStartX, roomSettingsStartY + 6 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}

let roomSettingsBarGTxt;

function mouseAddBarG() {
  let txtCords = getTextCords(roomSettingsBarGTxt, 3, roomSettingsStartX, roomSettingsStartY + 6 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}
let roomSettingsBarBTxt;

function mouseAddBarB() {
  let txtCords = getTextCords(roomSettingsBarBTxt, 4, roomSettingsStartX, roomSettingsStartY + 6 * roomSettingsChangeRate, "LEFT", roomSettingsSize);
  return mouseX > txtCords[0] && mouseY > txtCords[1] && mouseX < txtCords[2] && mouseY < txtCords[3];
}




// pointless since new function added! (cords for buttons)
function mousePlus() {
  return mouseX > uToC(744, null) && mouseY > uToC(null, 594) && mouseX < uToC(822, null) && mouseY < uToC(null, 678);
}

function mouseMinus() {
  return mouseX > uToC(1111, null) && mouseY > uToC(null, 594) && mouseX < uToC(1176, null) && mouseY < uToC(null, 678);
}

function mouseContinueZoom() {
  return mouseX > uToC(1440, null) && mouseY > uToC(null, 818) && mouseX < uToC(1750, null) && mouseY < uToC(null, 882);
}

function mouseContinueJoin() {
  return mouseX > uToC(394, null) && mouseY > uToC(null, 400) && mouseX < uToC(780, null) && mouseY < uToC(null, 460);
}

function mouseContinueCreate() {
  return mouseX > uToC(394, null) && mouseY > uToC(null, 600) && mouseX < uToC(895, null) && mouseY < uToC(null, 651);
}

function mouseContinueResizeAgain() {
  return mouseX > uToC(394, null) && mouseY > uToC(null, 209) && mouseX < uToC(962, null) && mouseY < uToC(null, 273);
}

function mouseCreateRoom() {
  return mouseX > uToC(715, null) && mouseY > uToC(null, 823) && mouseX < uToC(1207, null) && mouseY < uToC(null, 873);
}

function mouseCopy() { // y > 151
  return mouseX > uToC(1521, null) && mouseY > uToC(null, 97) && mouseX < uToC(1683, null) && mouseY < uToC(null, 49 + 97);
}