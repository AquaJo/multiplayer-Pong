let height;
let width;
async function setup() {
  height = window.innerHeight;
  width = window.innerWidth;

  firebaseCfg(); // initialize firebase --> in config.js
  if (await checkUser()) { // check if user already choosed his window size
    mode = "menue";
  } else {
    mode = "resizer";
  }
}



function draw() {
  if (mode === "resizer") {
    resizer();
  } else {
    background(20);
  }
}

async function mousePressed() {
  // resizer buttons
  let changeR = height / 180;
  if (mouseX > uToC(744, null) && mouseY > uToC(null, 594) && mouseX < uToC(822, null) && mouseY < uToC(null, 678)) { // plus recognition (resizing)
    height += height / 180;
    resize = true;
  } else if (mouseX > uToC(1111, null) && mouseY > uToC(null, 594) && mouseX < uToC(1176, null) && mouseY < uToC(null, 678)) { // minus recognition (resizing)
    if (height - changeR > 0) {
      height -= height / 180;
    }
    resize = true;
  } else if (mouseX > uToC(1440, null) && mouseY > uToC(null, 818) && mouseX < uToC(1750, null) && mouseY < uToC(null, 882)) {
    mode = "menue";
    mainRef.child(childUserpath + "/" + enIP).set(await getReliableTime());
    console.log("user-IP got registrated on database with expiretime of 1 week");
  }
  //
}


function gotData() {}

function errData() {}
