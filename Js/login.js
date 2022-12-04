const loginButton = document.querySelector('#loginButton');

let loggedIn = false;

// Add login function to the login button
$(document).ready(function () {
    $("#loginButton").click(function () {
        login();

    });
});



async function login() {
    let userName = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const data = {
        "username": userName,
        "password": password
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/login");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        console.log("xhr " + xhr.responseText);
        if (xhr.responseText == "true") {
            console.log("Bool toimii");
            loggedIn = true;
            console.log("loginjs loggedIn: " + loggedIn);
            window.location.href = "../html/main.html";


        } else {
            console.log("bool meni else ");
            loggedIn = false;
            console.log("loginjs loggedIn: " + loggedIn);
        }
    }
    console.log(data);
    let eventString = JSON.stringify(data);

    xhr.send(eventString);

}