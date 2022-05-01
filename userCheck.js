let enIP = "undefined";
let userExists = false;
async function checkUser() {
  console.group("usercheckprotocoll");
  await firebaseCheckUser();
  if (!userExists) {
    cookieCheckUser();
  }
  if (!userExists) {
    console.log("user didnt exist --> user registration")
  }
  console.groupEnd();
  return userExists;
}

async function userExistsOnDB(IP) {
  let res = false;
  let ref = database.ref(mainPath + "/" + childUserpath);
  await ref.child(IP).get()
    .then((snapshot) => {
      try {
        if (snapshot.val() != null) {
          res = true;
        }
      } catch (error) {}
    });
  return res;
}

let adblocker = false;
async function firebaseCheckUser() {
  //------------------
  let IP = "not found";
  try {
    let IP = await getIP();
    console.log("detected IP: " + IP);
    enIP = encryptionVigenere(IP, "g32Ñá漢6字3sdäÜaនក្zg21u8zgu");
    console.log("'encoded' IP for possible database-upload: " + enIP);

    userExists = await userExistsOnDB(enIP);
    //console.log(userExists);
    if (userExists) {
      console.log("user-IP already existed on database");
    } else {}
    //decryptionVigenere(enIP, "▓Ñá漢6字3sdäÜaនក្zg21u8zgu");
  } catch (error) {
    saveChoice = "cookies";
    adblocker = true;
    console.log("couldn't receive public IPv4 of client");
  }
}

function cookieCheckUser() {
  if (getCookie("properties") != "") {
    userExists = true;
    saveChoice = "cookies";
    console.log("user already existed through cookies");
  }
}

function encryptionVigenere(txt, key) {
  let final = "";
  for (let i = 0; i < txt.length; i++) {
    let newChar = String.fromCharCode(txt.charCodeAt(i) + key.charCodeAt(i));

    if (newChar.charCodeAt(0) == 160) {
      newChar = String.fromCharCode(161);
    }
    final += newChar;
  }
  return final;
}

function decryptionVigenere(txt, key) {
  let final = "";
  for (let i = 0; i < txt.length; i++) {
    final += String.fromCharCode(txt.charCodeAt(i) - key.charCodeAt(i));
  }
  return final;
}
