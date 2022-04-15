let resize = false;
let mode = false;
function resizer() {
  // base function for setting final sizes for canvas
  if (width * 0.497395833 > height || resize) {
    width = height * 2.0104712;
    createCanvas(width, height);
    resize = false;
  } else {
    height = width * 0.497395833;
    createCanvas(width, height); //baseSize: 1920 x 955
  }
  background(20);
  // text objects
  textSize(uToF(80));
  fill(255, 255, 255);
  textAlign(CENTER);
  textFont("Rubik Wet Paint");
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
  text(
    "continue",
    width / 1.2,
    height / 1.1
  );
}
