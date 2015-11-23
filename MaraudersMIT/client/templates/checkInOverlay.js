Template.checkInOverlay.events({
"submit .check-in-info": function () {      
	// Prevent default browser form submit
	event.preventDefault();

	// Get value from form element
	var status = event.target.status.value;
	console.log("status: " + status);
	var duration = event.target.duration.value;
	console.log("duration: " + duration);
	Overlay.hide();
}
});