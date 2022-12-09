
let logOutBtn = document.querySelector("#logOut");

let logged = localStorage.getItem("loggedIn");

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



//--------------------------------------------------------------

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



//--------------------------------------------------------------


/**
 * Represents a book.
 * moi
 */
function hideButtons() {
	document.getElementById("login").style.display = "none";
	document.getElementById("register").style.display = "none";
}

function showButtons() {
	document.getElementById("favorites").style.display = "none";
	document.getElementById("logOut").style.display = "none";
	document.getElementById("login").style.display = "unset";
	document.getElementById("register").style.display = "unset";
}