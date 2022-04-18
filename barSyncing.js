function privateGameCreator() {
  if (privateGameFirst) {
    privateGameFirst = false;
    bar1Y = height / 2;
    bar2Y = height / 2;
  }
  background(roomSettingsBackgroundR, roomSettingsBackgroundG, roomSettingsBackgroundB);
  drawLines();
  privateGameCreatorTxts();
  drawBar1();
  drawBar2();
}


function privateGameJoiner() {
  if (privateGameFirst) {
    privateGameFirst = false;
    bar1Y = height / 2;
    bar2Y = height / 2;
  }
  background(roomSettingsBackgroundR, roomSettingsBackgroundG, roomSettingsBackgroundB);
  drawLines();
  privateGameJoinerTxts();
  drawBar1();
  drawBar2();
}

let bar1Y;
let privateGameFirst = true;
let side = "LEFT";
let counterXY = 0;

function changeRateBars() {
  return height / ((90) * (10.0 / roomSettingsBarSpeed));
}

function barHeight() {
  return height / 10;
}
let direction1 = 0;

function drawBar1() {

  if (side === "LEFT") {
    let directionBefore = direction1;
    direction1 = null;
    if (isMobile) {
      if (mouseIsPressed === true && mouseY < height / 2) {
        direction1 = "UP";
      } else if (mouseIsPressed === true) {
        direction1 = "DOWN";
      }
    } else {
      if (keyIsDown(87)) {
        direction1 = "UP";
      } else if (keyIsDown(83)) {
        direction1 = "DOWN";
      }
    }
    if (direction1 === "UP") {
      let adjCR = adjustedChangeRate(bar1Y, changeRateBars(), "UP");
      bar1Y -= adjCR;
      if (directionBefore != direction1 && opponentReady) {
        if (adjCR != 0) {
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(-1);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(-1);
          }
        } else {
          direction1 = "UP";
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
          }
        }
        counterXY++;
      }
    } else if (direction1 === "DOWN") {
      let adjCR = adjustedChangeRate(bar1Y, changeRateBars(), "DOWN");
      bar1Y += adjCR;
      if (directionBefore != direction1 && opponentReady) {
        if (adjCR != 0) {
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(1);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(1);
          }
        } else {
          direction1 = "DOWN";
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
          }
        }
        counterXY++;
      }
    }
    if (directionBefore != direction1 && direction1 === null && opponentReady) {
      if (mode === "privateGameCreator") {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
      } else {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
      }
    }
  } else {
    bar1Y += direction1 * changeRateBars();
  }
  if (opponentReady || side === "LEFT") {
    fill(roomSettingsBarR, roomSettingsBarG, roomSettingsBarB);
    noStroke();
    rectMode(CENTER);
    rect(width * (barsXFromEdge / 100), bar1Y, width / 75, barHeight());
  }
}
let bar2Y;

let direction2 = 0;
let directionYCopy;

function drawBar2() {
  if (side === "RIGHT") { // ()
    let directionBefore = direction2;
    direction2 = null;
    if (isMobile) {
      if (mouseIsPressed === true && mouseY < height / 2) {
        direction2 = "UP";
      } else if (mouseIsPressed === true) {
        direction2 = "DOWN";
      }
    } else {
      if (keyIsDown(87)) {
        direction2 = "UP";
      } else if (keyIsDown(83)) {
        direction2 = "DOWN";
      }
    }
    if (direction2 === "UP") {
      let adjCR = adjustedChangeRate(bar2Y, changeRateBars(), "UP");
      bar2Y -= adjCR;
      if (directionBefore != direction2 && opponentReady) {
        if (adjCR != 0) {
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(-1);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(-1);
          }
        } else {
          direction2 = "UP";
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
          }
        }
        counterXY++;
      }
    } else if (direction2 === "DOWN") {
      let adjCR = adjustedChangeRate(bar2Y, changeRateBars(), "DOWN");
      bar2Y += adjCR;
      if (directionBefore != direction2 && opponentReady) {
        if (adjCR != 0) {
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(1);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(1);
          }
        } else {
          direction2 = "DOWN";
          if (mode === "privateGameCreator") {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
          } else {
            mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
          }
        }
        counterXY++;
      }
    }
    if (directionBefore != direction2 && direction2 === null && opponentReady) {
      if (mode === "privateGameCreator") {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1").set(0);
      } else {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2").set(0);
      }
    }
  } else {
    bar2Y += direction2 * changeRateBars();
  }
  if (opponentReady || side === "RIGHT") {
    fill(roomSettingsBarR, roomSettingsBarG, roomSettingsBarB);
    noStroke();
    rectMode(CENTER);
    rect(width - width * (barsXFromEdge / 100), bar2Y, width / 75, barHeight());
  }
}

function adjustedChangeRate(y, changeRate, direction) {
  let res;
  let top = y - barHeight() / 2;
  let bottom = y + barHeight() / 2;
  if (direction === "UP") {
    if (top - changeRate < 0) {
      res = top;
    } else {
      res = changeRate;
    }
  } else {
    if (bottom + changeRate > height) {
      res = height - bottom;
    } else {
      res = changeRate;
    }
  }
  if (res == 0) { //////
    if (direction === "UP") {
      if (side === "LEFT") {
        direction1 = "DOWN";
      } else {
        direction2 = "DOWN";
      }
    } else {
      if (side === "LEFT") {
        direction1 = "UP";
      } else {
        direction2 = "UP";
      }
    }
  }
  return res;
}

function drawLines() {
  rectMode(CENTER);
  fill(roomSettingsBarR, roomSettingsBarG, roomSettingsBarB);
  noStroke();
  for (let i = 0; i < 16; ++i) {
    rect(width / 2, height / 10 * i, width / 300, height / 20);
  }
}

let opponentReady = false;

function privateGameCreatorTxts() {
  if (!opponentReady) {
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
    text("wait for opponent", width / 2, height / 3);
    textAlign(LEFT);

    sideChooser();
  }
}

function sideChooser() {
  let finalColors = [];
  textSize(uToF(60));
  privateGameCreatorSideTxt = [
    ["LEFT                          ", finalColors[0]],
    ["                          RIGHT", finalColors[1]]
  ];
  if (mousePrivateGameCreatorSide(1)) {
    finalColors = [onButtonColCreateRoom, offButtonCol];
  } else if (mousePrivateGameCreatorSide(2)) {
    finalColors = [offButtonCol, onButtonColCreateRoom];
  } else {
    finalColors = [offButtonCol, offButtonCol];
  }
  privateGameCreatorSideTxt = [
    ["LEFT                          ", finalColors[0]],
    ["                          RIGHT", finalColors[1]]
  ];
  drawtext(width / 2, height / 6.5, privateGameCreatorSideTxt, "CENTER", uToF(60));

  textSize(uToF(60));
  textAlign(CENTER);
  fill(offButtonCol[0] / 1.3, offButtonCol[1], offButtonCol[2]);
  text("choose side", width / 2, height / 6.5);
  textAlign(LEFT);
}

function privateGameJoinerTxts() {
  if (opponentReady === false) {
    sideChooser();
  }
}

let bar1YCopy = 0;
let bar2YCopy = 0;

function gotData(data) {
  dataVal = data.val();
  if (opponentReady === false) {
    if (dataVal.opponentReady === true) {
      opponentReady = true;
      bar1Y = height / 2;
      bar2Y = height / 2;
    }
  }
  if (mode === "privateGameCreator") {
    if (side === "RIGHT") {
      if (bar2YCopy != dataVal.bar2Y) {
        bar2YCopy = dataVal.bar2Y;
        bar1Y = uToC(null, bar2YCopy);
      }
      direction1 = dataVal.bar2;
    } else {
      if (bar2YCopy != dataVal.bar2Y) {
        bar2YCopy = dataVal.bar2Y;
        bar2Y = uToC(null, bar2YCopy);
      }
      direction2 = dataVal.bar2;
    }
  } else if (mode === "privateGameJoiner") {
    if (side === "RIGHT") {
      if (bar1YCopy != dataVal.bar1Y) {
        bar1YCopy = dataVal.bar1Y;
        bar1Y = uToC(null, bar1YCopy);
      }
      direction1 = dataVal.bar1;
    } else {
      if (bar1YCopy != dataVal.bar1Y) {
        bar1YCopy = dataVal.bar1Y;
        bar2Y = uToC(null, bar1YCopy);
      }
      direction2 = dataVal.bar1;
    }
  }
}
