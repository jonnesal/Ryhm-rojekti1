

let loggedIn = false;

/**
 * Add login function to the login button
 */
$(document).ready(function () {
  $("#loginButton").click(function () {
    login();
  });
});

/**
 * Sends a username and password as a request to express 
 * @param {String} testuser Username for testing purposes
 * @param {String} testpass User password for testing purposes
 * @returns responseText from the request
 */
function login(testuser, testpass) {
  let userName;
  let password;

  if (testuser && testpass != null) {
    userName = testuser;
    password = testpass;
  } else {
    userName = document.getElementById("username").value;
    password = document.getElementById("password").value;
  }

  const data = {
    username: userName,
    password: password,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/login", false);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.responseText == "true") {
      loggedIn = true;

      localStorage.setItem("loggedIn", loggedIn);
      if (testuser && testpass != null) {
      } else {
        window.location.href = "../html/main.html";
      }
    } else {
      loggedIn = false;
    }
  };

  let eventString = JSON.stringify(data);

  xhr.send(eventString);

  return xhr.responseText;
}
module.exports = login;
