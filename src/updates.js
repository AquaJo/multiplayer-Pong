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

async function updatePrivateRooms() {
  let refPath = mainPath + "/" + childPrivateRoomsPath;
  let ref = database.ref(refPath);
  let counter = 0;
  await ref.once('value').then(async function(snapshot) {
    if (snapshot.val() != null) {
      let keys = Object.keys(snapshot.val());
      let getMinutesNow = getMinutes(await getUnixTimestamp());
      for (i = 0; i < keys.length; ++i) { // checks every usersIP-expire-date
        let createDate = await getData(refPath + keys[i]+"/date");
        if (/^\d+$/.test(createDate)) { // not the best 'solution'
          let dateDiffsDays = getMinutesNow - getMinutes(createDate);
          if (dateDiffsDays >= 30) {
            counter++;
            ref.child(keys[i]).remove();
          }
        }
      }
    }
  });
  console.log("happened deletions on database due to exceeding expiring-time: " + counter);
  console.groupEnd();
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
function getMinutes(data) {
  return data/60;
}
