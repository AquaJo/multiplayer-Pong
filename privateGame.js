function privateGame() {
  background(roomSettingsBackgroundR, roomSettingsBackgroundG, roomSettingsBackgroundB);
  drawLines();
  if (mode === "privateGameCreator") {
    privateGameCreator();
  } else if (mode === "privateGameJoiner") {
    privateGameJoiner();
  }
  inGameBack();
  //if (!timer) {
  drawBar1();
  drawBar2();
  //}
  if (counterXY > 2) { // counterY - Changes (x is pointless ....)
    counterXY = 0;
    let final = (side === "LEFT") ? cToU(null, bar1Y) : cToU(null, bar2Y);
    if (mode === "privateGameCreator") {
      mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar1Y").set(final);
    } else if (mode === "privateGameJoiner") {
      mainRef.child(childPrivateRoomsPath + "/" + code + "/game/bar2Y").set(final);
    }
  }
  if (opponentReady) {
    drawScores();
    drawBall();
  }
}

function drawScores() {
  textAlign(CENTER);
  textSize(uToF(50));
  fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
  text((side === "LEFT" ? scoreMe : scoreOp) + " / " + roomSettingsScores, width / 6, height / 18);
  text((side === "RIGHT" ? scoreMe : scoreOp) + " / " + roomSettingsScores, width - width / 6, height / 18);
  textAlign(LEFT);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let timerGame = true;
let timerNum = 4;
let oldTimerNum;

function timer() {
  if (timerGame && timerNum !== oldTimerNum) { //
    oldTimerNum = timerNum;
    let id2;
    let id1 = setTimeout(function() {
      if (timerNum > 1) {
        timerNum = timerNum - 1;
      } else {
        timerNum = timerNum - 1;
        oldTimerNum = timerNum;
        id2 = setTimeout(function() {
          wait = false;
          timerGame = false;
          timerNum = 4;
          ballX = width / 2;
          ballY = height / 2;
          ballYC = 0;
        }, 150);
      }
      //clearTimeout(id2);
      //clearTimeout(id1);
    }, 1000 + (3 - timerNum) * 220);
    //console.log(timerNum + "  D: " + (1000 + (3 - timerNum) * 220));
  }
  if (timerGame) {
    textAlign(CENTER);
    textSize(uToF(80));
    if (timerNum >= 1) {
      if (timerNum < 4) {
        fill(onButtonColCreateRoom[0], onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
        text(timerNum, width / 2, height / 2);
      }
    } else {
      fill(onButtonColCreateRoom[0] / 2, onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
      text("GO!", width / 2, height / 2);

      /*timerNum = 3;
      ballX = width / 2;
      ballY = height / 2;
      timerGame = false;*/ //
    }
    textAlign(LEFT);
  }
  if (win == 0 || win == 1) {
    textAlign(CENTER);
    textSize(uToF(100));
    fill(onButtonColCreateRoom[0] / 2, onButtonColCreateRoom[1], onButtonColCreateRoom[2]);
    text(win == 1 ? "YOU WIN!" : "OPPONENT WINS!", width / 2, height / 2);
    textAlign(LEFT);
  }
}
let ballX;
let ballY;
let ballYC = 0;
let score = 0;
let path = 0;
let wait = false;
let barY;
let lastYC = 0;
let scoreMe = 0;
let scoreOp = 0;
let dodgeTimes = 0;
let win = 2;
function drawBall() {
  if (side === "LEFT") {
    barY = bar1Y;
  } else {
    barY = bar2Y;
  }
  let barW = width / 75;
  timer();
  if (timerGame == false) {
    rectMode(CENTER);
    let ballW = uToC(ballWidth, null);
    let ballH = ballW;
    if (wait === false) {
      if (path == 1) {
        if (side === "RIGHT") {
          ballX += uToC(3 * roomSettingsBallSpeed, null);
        } else {
          ballX -= uToC(3 * roomSettingsBallSpeed, null);
        }
      } else if (path == 0) {
        if (side === "RIGHT") {
          ballX -= uToC(3 * roomSettingsBallSpeed, null);
        } else {
          ballX += uToC(3 * roomSettingsBallSpeed, null);
        }
      }
      if (ballY == 0 + ballW / 2 || ballY == height - ballW / 2) {
        ballYC *= -1;
      }
      ballY += ballYC;
      if (ballY < 0 + ballW / 2) {
        ballY = 0 + ballW / 2;
      } else if (ballY > height - ballW / 2) {
        ballY = height - ballW / 2;
      }
      if (path == 1) {
        if ((side === "LEFT" ? ballX < width * (barsXFromEdge / 100) + barW / 2 + ballW / 2 : ballX > width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2)) {
          if (barY + barHeight() / 2 > ballY - ballW / 2 && barY - barHeight() / 2 < ballY + ballW / 2) {
            wait = true; // wait unnötig, wenn unten xy coords gekeppt werdn

            if (dodgeTimes == ballYCorrectionTimes - 1) {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/ballY").set(ballY);
            }

            if (mode === "privateGameCreator") {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(0);
            } else {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(1);
            }
            let yCNow = getYC(barY);
            if (yCNow !== lastYC) {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/yChange").set(getYC(barY));
            } else {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/yChange").set(getYC(barY) + 0.001);
              //mainRef.child(childPrivateRoomsPath + "/" + code + "/game/yChange").set(getYC(barY));
            }
            lastYC = yCNow;
          } else {
            scoreOp++;
            wait = true;
            if (mode === "privateGameCreator") {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/score2").set(scoreOp);
            } else {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/score1").set(scoreOp);
            }
          }
        }
        /*if (side === "RIGHT") {
          if (ballX > width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2 && bar2Y + barW/2 > ballY - ballW/2 && bar2Y - barW/2 < ballY + ballW/2) {
            if (mode === "privateGameCreator") {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(0);
              wait = true;
            } else {
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(1);
              wait = true;
            }
          }
        } else {
          if (side === "LEFT" ? ballX < width * (barsXFromEdge / 100) + barW / 2 + ballW / 2  && bar1Y + barW/2 > ballY - ballW/2 && bar1Y - barW/2 < ballY + ballW/2) {
            if (mode === "privateGameCreator") {
              getYC();
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(0);
              wait = true;
            } else {
              getYC();
              mainRef.child(childPrivateRoomsPath + "/" + code + "/game/path").set(1);
              wait = true;
            }
          }
        }*/
      }
      if (ballX < width * (barsXFromEdge / 100) + barW / 2 + ballW / 2 && barY + barHeight() / 2 > ballY - ballW / 2 && barY - barHeight() / 2 < ballY + ballW / 2) {
        ballX = width * (barsXFromEdge / 100) + barW / 2 + ballW / 2;
      } else if (ballX > width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2 && barY + barHeight() / 2 > ballY - ballW / 2 && barY - barHeight() / 2 < ballY + ballW / 2) {
        ballX = width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2;
      }
      fill(roomSettingsBarR[0], roomSettingsBarG[1], roomSettingsBarB[2]);
      rect(ballX, ballY, ballW, ballH);
    }
  }
}

function getYC(barY) {
  let fromGroundM = barY;
  let ballYInRelevance = ballY - fromGroundM;
  if (ballYInRelevance == 0) {
    ballInRelevance = 0.001;
  }
  let fullRange = barHeight() + ballWidth * 2;
  let percentOfRange = fullRange / ballYInRelevance; // not real percent
  return cToU(null, ballYInRelevance) / 1.8; //(ballYInRelevance / (height/ 400));
}
let firstDataReceive = true;
let oldYC = 0;

function gotDataYChange(data) { // was, wenn y-change unveränderlich , ---> wegen wait --> false
  let dataVal = data.val();
  ballYC = uToC(null, dataVal);
  if (!firstDataReceive) {
    /*if ((side === "RIGHT" && mode === "privateGameCreator") || (side === "LEFT" && mode === "privateGameJoiner")) {
      ballYC *= -1;
    }*/
    if (path == 1) {
      path = 0;
    } else {
      path = 1;
    }
    /*if (oldYC + 0.001 == ballYC) {
      ballYC = oldYC;
      if (mode === "privateGameCreator") {
        mainRef.child(childPrivateRoomsPath + "/" + code + "/game/yChange").set(getYC(barY));
      }
    }
    oldYC = ballYC;*/
    if (dodgeTimes == ballYCorrectionTimes - 1) {
      dodgeTimes++;
    } else {
      dodgeTimes = 0;
    }
  } else {
    firstDataReceive = false;
  }
  wait = false;
}

function gotDataScore1(data) {
  let dataVal = data.val();
  if (dataVal > 0) {
    if (mode === "privateGameJoiner") {
      scoreOp = dataVal;
    } else {
      scoreMe = dataVal;
    }
    reset();
  }
}

function reset() {
  wait = true;
  if (timerGame === false) {
    if (scoreMe < roomSettingsScores && scoreOp < roomSettingsScores) {
      timerGame = true;
    } else {
      win = scoreOp > scoreMe ? 0 : 1;
    }
  }
}

function gotDataScore2(data) {
  let dataVal = data.val();
  if (dataVal > 0) {
    if (mode === "privateGameCreator") {
      scoreOp = dataVal;
    } else {
      scoreMe = dataVal;
    }
    reset();
  }
}

function gotDataBallY(data) {
  let dataVal = data.val();
  if (dataVal > 0) {
    ballY = dataVal;
  }
}
/*function gotDataPath(data) {
  let dataVal = data.val();
  if (mode === "privateGameCreator") {
    path = dataVal;
  } else if (mode === "privateGameJoiner") {
    if (dataVal == 1) {
      path = 0;
    } else {
      path = 1;
    }
  }
  /*try {
    if (path == 0) {
      if (side === "RIGHT") {
        /*ballX = width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2;
        ballX = width * (barsXFromEdge / 100) + barW / 2 + ballW / 2;*/
/*ballX = width/2;
    } else {
      /*ballX = width * (barsXFromEdge / 100) + barW / 2 + ballW / 2;
      ballX = width - width * (barsXFromEdge / 100) - barW / 2 - ballW / 2;*/
/*ballX = width/2;
    }
  } else {
    if (side === "RIGHT") {
      ballX = width/2;
    } else {
      ballX = width/ 2;
    }
  }
} catch (error) {

}*/
//console.log(path);
//}
