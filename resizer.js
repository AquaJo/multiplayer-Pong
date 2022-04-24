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
  textSize(uToF(80));
  fill(255, 255, 255);
  textAlign(CENTER);
  text(
    "for best fitting: resize window with - / +",
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
resizerChoice = "IP";
let resizerSettingsStartX;
let resizerSettingsStartY;
let resizerSettingsChangeRate;
function resizeOptions() {
  resizerSettingsStartX = width / 50;
  resizerSettingsStartY = height / 20;
  resizerSettingsChangeRate = height/12;
  textSize(uToF(40));
  fill(255, 255, 255);
  textAlign(LEFT);
  text("by pressing 'continue' the data will be saved  ...", width / 50, height / 20);

  resizeOptionsIP();
}

function resizeOptionsIP() {
  let finalColors = [];
  resizerIPTxt = [
    ["... through your public IPv4-address", finalColors[0]],
    ["  ", finalColors[0]]
  ];
  if (mouseChangeIPSave(1)) {
    finalColors = [onButtonCol];
  } else if (resizerChoice === "IP") {
    finalColors = [onButtonColCreateRoom];
  } else {
    finalColors = [offButtonCol];
  }

  resizerIPTxt = [
    ["... through your public IPv4-address", finalColors[0]],
    ["  ", finalColors[0]]
  ];

  drawtext(resizerSettingsStartX, resizerSettingsStartY + 1 * resizerSettingsChangeRate, resizerIPTxt);
}
