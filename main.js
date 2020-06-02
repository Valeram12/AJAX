const FETCH_TIMEOUT = 2000;
let didTimeOut = false;

new Promise(function (resolve, reject) {
  const timeout = setTimeout(function () {
    didTimeOut = true;
    reject(new Error("Request timed out"));
  }, FETCH_TIMEOUT);

  let xhrGET = new XMLHttpRequest();
  xhrGET.open("GET", "http://cors-test.appspot.com/test", true);
  xhrGET.send();
  xhrGET.onreadystatechange = function () {
    CheckFunction(".get", xhrGET);
  };

  let xhrPOST = new XMLHttpRequest();
  xhrPOST.open("POST", "http://cors-test.appspot.com/test", true);
  xhrPOST.send();
  xhrPOST.onreadystatechange = function () {
    CheckFunction(".post", xhrPOST);
  };

  //
  fetch("http://cors-test.appspot.com/test")
    .then(function (response) {
      response.status == 200 && response.statusText == `OK` ? style(true, ".weird") : style(false, ".weird");
      clearTimeout(timeout);
      if (!didTimeOut) {
        console.log("fetch good! ", response);
        resolve(response);
      }
    })
    .catch(function (err) {
      console.log("fetch failed! ", err);

      style(false, ".weird");
      if (didTimeOut) return;
      style(false, ".weird");
      reject(err);
    });
})
  .then(function () {
    console.log("good promise, no timeout! ");
  })
  .catch(function (err) {
    style(false, ".get");
    style(false, ".post");
    style(false, ".weird");
    console.log("promise error! ", err);
  });

function CheckFunction(x, xhr) {
  if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText == `{"status":"ok"}`) {
    document.querySelector(x).style.color = "green";
    document.querySelector(x).style.fontWeight = "bold";
    document.querySelector(x).innerHTML = "OK";
  } else {
    document.querySelector(x).style.color = "red";
    document.querySelector(x).style.fontWeight = "bold";
    document.querySelector(x).innerHTML = "Failed";
  }
}

function style(bool, x) {
  if (bool == true) {
    document.querySelector(x).style.color = "green";
    document.querySelector(x).style.fontWeight = "bold";
    document.querySelector(x).innerHTML = "OK";
  } else {
    document.querySelector(x).style.color = "red";
    document.querySelector(x).style.fontWeight = "bold";
    document.querySelector(x).innerHTML = "Failed";
  }
}
