function cToU(x, y) {
  let res;
  let resX;
  let resY;
  //if (x != null && y != null) { // dont know why I added this anymore ;)
    if (x == null) {
      resY = map(y, 0, height, 0, 955);
      res = resY;
    } else if (y == null) {
      resX = map(x, 0, width, 0, 1920);
      res = resX;
    } else {
      resX = map(x, 0, width, 0, 1920);
      resY = map(y, 0, height, 0, 955);
      res = {
        resX,
        resY
      };
    }
  //}
  return res;
}

function uToC(x, y) {
  let res;
  let resX;
  let resY;
  if (x == null) {
    resY = map(y, 0, 955, 0, height);
    res = resY;
  } else if (y == null) {
    resX = map(x, 0, 1920, 0, width);
    res = resX;
  } else {
    resX = map(x, 0, 1920, 0, width);
    resY = map(y, 0, 955, 0, height);
    res = {
      resX,
      resY
    };
  }
  return res;
}

function uToF(size) {
  return size * (width / 1920);
}
