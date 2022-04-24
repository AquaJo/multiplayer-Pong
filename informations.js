async function getIP() {
  let res = null;
  try {
    await $.getJSON("https://api.ipify.org?format=json", function(data) {
      res = data.ip;
    });
  } catch (error) {
    await $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
      res = JSON.stringify(data, null, 2);
    });
  }
  return res;
  /*$.get("http://ipinfo.io", function(response) {
    alert(response.ip);
  }, "jsonp");
  /*$.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    // Convert key-value pairs to JSON
    // https://stackoverflow.com/a/39284735/452587
    data = data.trim().split('\n').reduce(function(obj, pair) {
      pair = pair.split('=');
      return obj[pair[0]] = pair[1], obj;
    }, {});
    console.log(data);
  });*/
  /*$.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
    console.log(JSON.stringify(data, null, 2));
  });
  /*$.ajax({
    url: 'https://api.my-ip.io/ip.jsonp',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
    },
    success: function(data) {
      alert(data);
      //process the JSON data etc
    }
  })*/
  //  await $.getJSON(
  //  "https://api.my-ip.io/ip.json",
  //  function(data) {
  /*fetch('https://api.ipify.org/?format=json', {
      mode: 'cors'
    })
    .then((resp) => resp.json())
    .then((ip) => {
      return ip;
    });/*
  //res = data; //JSON.stringify(data, null, 2);
  //  }
  //  );
  /*res = res.split('"');
  res = res[3];*/
  //return res.ip;
}

async function getUnixTimestamp() { // UNIX-Timestamp
  let res = null;
  let stringRes;
  /*await fetch("https://www.worldtimeapi.org/api/timezone/Etc/UTC.txt")
    .then(r => r.text())
    .then(t => res = t);
    console.log(res);
  res = res.split("datetime: ")[1];
  res = res.split("day")[0];
  return res;*/
  await $.getJSON(
    "https://api.timezonedb.com/v2.1/list-time-zone?key=HF50984HGBKK&format=json&country=US&zone=New_York",
    function(data) {
      res = JSON.stringify(data, null, 2);
      res = res.split('timestamp": ')[1];
      res = res.split('    }')[0];
      res = res.replace(/\n/g, '');
    }
  );
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
