async function getIP() {
  let res = null;
  let apiKey = "1be9a6884abd4c3ea143b59ca317c6b2";
  await $.getJSON(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey,
    function(data) {
      res = JSON.stringify(data, null, 2);
    }
  );
  res = res.split('"');
  res = res[3];
  return res;
}

async function getReliableTime() { // UTC
  let res = null;
  let stringRes;
  await fetch("https://www.worldtimeapi.org/api/timezone/Etc/UTC.txt")
    .then(r => r.text())
    .then(t => res = t);
  res = res.split("datetime: ")[1];
  res = res.split("day")[0];
  return res;
}


async function getData(path) {
  let res = false;
  let ref = database.ref(path.substring(0, path.lastIndexOf("/")));
  let child = path.substring(path.lastIndexOf("/") + 1, path.length);
  //console.log("ref: " + path.substring(0, path.lastIndexOf("/")) + "   child: " + path.substring(path.lastIndexOf("/") + 1, path.length));
  await ref.child(child).get()
    .then(async function(snapshot) {
      //try {
      let data = snapshot.val();
      if (data != null) {
        res = data;
      }
      //} catch (error) {}
    });
  return res;
}
