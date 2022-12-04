// window.onload = function () {
// 	hideButtons();

// };

let logged = false;

document.addEventListener("DOMContentLoaded", () => {

	if (logged) {
		console.log("show buttons");
		showButtons();
	} else {
		console.log("hide buttons");
		hideButtons();
	}

});


function hideButtons() {
	document.getElementById("loginA").style.display = "none";
	document.getElementById("registerA").style.display = "none";

}

function showButtons() {
	document.getElementById("loginA").style.display = "unset";
	document.getElementById("registerA").style.display = "unset";

}