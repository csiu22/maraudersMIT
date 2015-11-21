Template.register.events({
"submit .register-email": function () {      
	// Prevent default browser form submit
	event.preventDefault();

	// Get value from form element
	console.log(event.target);
	var email = event.target.email.value;
	var domain = email.trim().toLowerCase().slice(-8);

	if (domain === "@mit.edu") {
		console.log("Yay that's an mit email");
	} else {
		console.log("You don't even go here");
		alert("Please enter a valid MIT address");
	}
}
});