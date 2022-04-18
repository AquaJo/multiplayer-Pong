function getTextCords(textArray, itemText, firstPosX, firstPosY, align, size) { // height =() 0.75*size
  let txtWidth = 0;
  let firstX;
  let firstPosx = firstPosX;
  let txtHeight = 0.75 * size;
  let firstY;
  let lastY;
  if (align === "CENTER") {
    for (let i = 0; i < textArray.length; ++i) {
      txtWidth += textWidth(textArray[i][0]);
    }
    firstPosx = firstPosX - txtWidth / 2;
    firstY = firstPosY + ((0.75 * size) / 2) - (size * 0.75);
    lastY = firstPosY + ((0.75 * size) / 2);
  } else {
    firstY = firstPosY - txtHeight;
    lastY = firstPosY;
  }
  txtWidth = 0;
  for (let i = 0; i < itemText - 1; ++i) {
    txtWidth += textWidth(textArray[i][0]);
  }
  firstX = firstPosx + txtWidth;
  //let firstY = firstPosY +
  txtWidth = firstX + textWidth(textArray[itemText - 1][0]);
  return [firstX, firstY, txtWidth, lastY];
}

function drawtext(x, y, text_array, align, size) {
  let pos_x;
  if (align === "CENTER") {
    let fullWidth = 0;
    for (let i = 0; i < text_array.length; ++i) {
      var part = text_array[i];
      var t = part[0];
      var w = textWidth(t);
      fullWidth += w;
    }
    pos_x = x - fullWidth / 2;
    y = y + (0.75 * size) / 2;
    //console.log(pos_x, y);
  } else {
    pos_x = x;
  }
  for (let i = 0; i < text_array.length; ++i) {
    var part = text_array[i];
    var t = part[0];
    var c = part[1];
    var w = textWidth(t);
    if (c != null) {
      fill(c);
    }
    text(t, pos_x, y);
    pos_x += w;
  }
}
