
const registerButton = document.querySelector('#register');


registerButton.addEventListener("click", () => {
	console.log("nappi ");
	register();
	console.log("when");
})

function register() {
	let fname = document.getElementById('fname').value;
	let lname = document.getElementById('lname').value;
	let userName = document.getElementById('userName').value;
	let password = document.getElementById('password').value;

	console.log("toimii " );

	const data = {
		"fname": fname,
		"lname": lname,
		"username": userName,
		"password": password
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/api/register");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
       window.location.href = "../html/login.html";
    }
    console.log(data);
    let eventString = JSON.stringify(data);
    xhr.send(eventString);

}