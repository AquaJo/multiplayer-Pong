let enIP ="undefined";
async function checkUser() {
  //------------------
  console.group("usercheckprotocoll");
  let IP = await getIP();
  console.log("detected IP: " + IP);
  enIP = encryptionVigenere(IP, "g32Ñá漢6字3sdäÜaនក្zg21u8zgu");
  console.log("'encoded' IP for possible database-upload: " + enIP);

  let userExists = await userExistsOnDB(enIP);
  //console.log(userExists);
  if (userExists) {
    console.log("user-IP already existed on database");
    console.groupEnd();
  } else {
  }
  //decryptionVigenere(enIP, "▓Ñá漢6字3sdäÜaនក្zg21u8zgu");
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
