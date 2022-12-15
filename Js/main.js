
let logOutBtn = document.querySelector("#logOut");

let logged = localStorage.getItem("loggedIn");

/**
 * Call checkIfLoggedIn() when page has loaded
 * Check if user has logged in. If so call hideButtons()
 * If not call showButtons()
 * Add logOut function to the log out button
 */
document.addEventListener("DOMContentLoaded", () => {

	console.log("Main.js logged: " + logged);
	checkIfLoggedIn();

	if (logged == "true") {
		console.log("hide buttons");
		hideButtons();
	} 
	else {
		console.log("show buttons");
		showButtons();
	}

	logOutBtn.addEventListener("click", () => {
		logOut(logged);
	});

});


/**
 * Sends a request to the express and returns variable loggedIn
 * which we use to check if someone is logged in
 */
function checkIfLoggedIn() {

	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/api/loggedIn");
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {

				let response = xhr.response;

				localStorage.setItem("loggedIn", response);
			}
		}
	}
	xhr.send();
}

/**
 * Used to make the user log out
 * We use the variable logIn to check if user has logged in and if so we call the logOutRequest function
 * If not we set the localStorage variable loggedIn = false
 * @param {Boolean} logIn Whether or not someone is logged in 
 */
function logOut(logIn) {
	console.log("logOut function loggedIn: " + logIn);
	if (logIn == "true") {
		console.log("Kirjauduit ulos!");
		localStorage.setItem("loggedIn", "false");
		logOutRequest();
	} 
	else {
		console.log("Kirjaudu ensin sisään, kiitos!");
		localStorage.setItem("loggedIn", "false");

	}
}

/**
 * Sends the log out request to express 
 */
function logOutRequest() {

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/api/logOut");
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {

				let response = xhr.response;
			}
		}
	}
	xhr.send();
}



/**
 * Function that is called if you are logged in
 * Hides login and register button and shows favorites
 */
function hideButtons() {
	document.getElementById("login").style.display = "none";
	document.getElementById("register").style.display = "none";
	document.getElementById("favorites").style.display = "unset";
	document.getElementById("logOut").style.display = "unset";
}

/**
 * Function that is called if you are not logged in
 * Shows login and register button and hides favorites and log out button
 */
function showButtons() {
	document.getElementById("login").style.display = "unset";
	document.getElementById("register").style.display = "unset";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("logOut").style.display = "none";
}