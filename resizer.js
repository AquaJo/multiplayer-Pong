let resize = false;
let mode = false;

function resizer() {
  textFont("Rubik Wet Paint");
  // base function for setting final sizes for canvas
  if (width * 0.497395833 > height || resize) {
    width = height * 2.0104712;
    createCanvas(width, height);
    resize = false;
  } else {
    height = width * 0.497395833;
    createCanvas(width, height); //baseSize: 1920 x 955
  }
  background(backgroundCol[0], backgroundCol[1], backgroundCol[2]);
  resizeOptions();
  // text objects
  textSize(uToF(70));
  fill(255, 255, 255);
  textAlign(CENTER);
  text(
    "for the best fitting: resize window with - / +",
    width / 2,
    height / 2.5
  );
  textSize(uToF(150));
  text(
    "+          -",
    width / 2,
    height / 1.4
  );
  textSize(uToF(60));
  if (mouseContinueZoom()) {
    fill(onButtonCol[0], onButtonCol[1], onButtonCol[2]);
  } else {
    fill(255, 255, 255);
  }
  text(
    "continue",
    width / 1.2,
    height / 1.1
  );
}
saveChoice = "IP";
let resizerSettingsStartX;
let resizerSettingsStartY;
let resizerSettingsChangeRate;

function resizeOptions() {
  resizerSettingsStartX = width / 50;
  resizerSettingsStartY = height / 20;
  resizerSettingsChangeRate = height / 12;
  textSize(uToF(40));
  fill(255, 255, 255);
  textAlign(LEFT);
  text("by pressing 'continue' the data will be saved  ...", width / 50, height / 20);

  resizeOptionsIP();
  resizeOptionsCookies();
}

function resizeOptionsIP() {
  let finalColors = [];
  if (!adblocker) {
    resizerIPTxt = [
      ["... through logging your public IPv4-address", finalColors[0]],
      ["  ", finalColors[0]]
    ];
  } else {
    resizerIPTxt = [
      ["... through logging your public IPv4-address // not possible (adblocker)", finalColors[0]],
      ["  ", finalColors[0]]
    ];
  }
  if (mouseChangeIPSave(1)) {
    finalColors = [onButtonCol];
  } else if (saveChoice === "IP") {
    finalColors = [onButtonColCreateRoom]; // no extra if !adblocker needed, because mouseChangeIPSave return always false in case
  } else {
    finalColors = [offButtonCol];
  }
  if (!adblocker) {
    resizerIPTxt = [
      ["... through logging your public IPv4-address", finalColors[0]],
      ["  ", finalColors[0]]
    ];
  } else {
    resizerIPTxt = [
      ["... through logging your public IPv4-address // not possible (adblocker)", offButtonCol],
      ["  ", finalColors[0]]
    ];
  }

  drawtext(resizerSettingsStartX, resizerSettingsStartY + 1 * resizerSettingsChangeRate, resizerIPTxt);
}

function resizeOptionsCookies() {
  let finalColors = [];

  resizerCookiesTxt = [
    ["... through cookies", finalColors[0]],
    ["  ", finalColors[0]]
  ];

  if (mouseChangeCookieSave(1)) {
    finalColors = [onButtonCol];
  } else if (saveChoice === "cookies") {
    finalColors = [onButtonColCreateRoom];
  } else {
    finalColors = [offButtonCol];
  }

  resizerCookiesTxt = [
    ["... through cookies", finalColors[0]],
    ["  ", finalColors[0]]
  ];

  drawtext(resizerSettingsStartX, resizerSettingsStartY + 2 * resizerSettingsChangeRate, resizerCookiesTxt);
}
