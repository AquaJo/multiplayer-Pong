let enIP ="undefined";
async function checkUser() {
  if (Math.floor(Math.random() * 5) == 4) {
    console.group("userupdate (chance 1/5)");
    await updateUsers();
  }
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

function getDays(data) { // converter for UNIX-Timestamp (seconds in days)
  /*dataSplit = data.split("-");
  let years = dataSplit[0];
  let months = dataSplit[1];
  let days = dataSplit[2].split("T")[0];
  resDays = years * 365 + months * 30 + parseInt(days);
  return resDays;*/
  return data/60/60/24;
}

async function updateUsers() {
  let refPath = mainPath + "/" + childUserpath;
  let ref = database.ref(refPath);
  let counter = 0;
  try {
    await ref.once('value').then(async function(snapshot) {
      if (snapshot.val() != null) {
        let keys = Object.keys(snapshot.val());
        let getDaysNow = getDays(await getUnixTimestamp());
        for (i = 0; i < keys.length; ++i) { // checks every usersIP-expire-date
          let createDate = await getData(refPath + keys[i]+"/date");
          if (/^\d+$/.test(createDate)) { // not the best 'solution'
            let dateDiffsDays = getDaysNow - getDays(createDate);
            if (dateDiffsDays >= 7) {
              counter++;
              ref.child(keys[i]).remove();
            }
          }
        }
      }
    });
  } catch (error) {}
  console.log("happened deletions on database due to exceeding expiring-time: " + counter);
  console.groupEnd();
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
