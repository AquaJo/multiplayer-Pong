function getTextCords(textArray, itemText, firstPosX, firstPosY, align, size) { // height =() 0.75*size
  let txtWidth = 0;
  for (let i = 0; i < itemText - 1; ++i) {
    txtWidth += textWidth(textArray[i][0]);
  }
  let firstX = firstPosX + txtWidth;
  //let firstY = firstPosY +
  txtWidth = firstX + textWidth(textArray[itemText - 1][0]);
  let xs = [firstX, txtWidth];
  txtHeight = 0.75 * size;
  let firstY = firstPosY - txtHeight;

  return [firstX, firstY, txtWidth, firstPosY];
}

function drawtext(x, y, text_array) {
  var pos_x = x;
  for (let i = 0; i < text_array.length; ++i) {
    var part = text_array[i];
    var t = part[0];
    var c = part[1];
    var w = textWidth(t);
    fill(c);
    text(t, pos_x, y);
    pos_x += w;
  }
}
