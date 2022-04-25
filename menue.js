function mainMenue() {
  if (width != null && height != null) {
    createCanvas(width, height);
    background(backgroundCol[0], backgroundCol[1], backgroundCol[2]);
    textSize(uToF(70));
    if (mouseContinueResizeAgain()) {
      fill(onButtonCol[0], onButtonCol[1], onButtonCol[2]);
    } else {
      fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
    }
    textAlign(LEFT);
    textFont("Black Ops One");
    text(
      "resize window",
      width / 4.7,
      height / 3.6
    );
    if (mouseContinueJoin()) {
      fill(onButtonCol[0], onButtonCol[1], onButtonCol[2]);
    } else {
      fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
    }
    text(
      "join room",
      width / 4.7,
      (height / 3.6) + height / 5
    );
    if(!isMobile) {
    inputOnceJ();
    inpJ.show();
    }
    try {
      inpJ.position(width / 4.7 + width / 5, height / 2.35);
    } catch (error) {}
    /*textSize(uToF(85));
    text(
      ">",
      width / 1.2,
      height/2.06
    );*/
    if (mouseContinueCreate()) {
      fill(onButtonCol[0], onButtonCol[1], onButtonCol[2]);
    } else {
      fill(offButtonCol[0], offButtonCol[1], offButtonCol[2]);
    }
    text(
      "create room",
      width / 4.7,
      (height / 3.6) + 2 * (height / 5)
    );
  }
}

let input = true;
let inpJ;
let inpJText;
function inputOnceJ() {
  if (input == true && width != null && height != null) {
    input = false;
    inpJ = createInput();
    inpJ.input(inpJEvent);
    inpJ.show();
    inpJ.position(width / 4.7 + width / 5, height / 2.35);
    inpJ.style('height', height / 20 + "px");
    inpJ.style('width', width / 2.5 + "px");
    inpJ.style('border:2px solid #aaa');
    inpJ.style('border-radius:4px');
    inpJ.style('margin:8px 0');
    inpJ.style('outline:none');
    inpJ.style('padding:8px');
    inpJ.style('box-sizing:border-box');
    inpJ.style('transition:.0s');
  }
}
function inpJEvent() {
  inpJText = this.value();
}
