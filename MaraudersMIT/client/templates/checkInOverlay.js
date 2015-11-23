Template.checkInOverlay.events({
"submit .check-in-info": function () {      
	// Prevent default browser form submit
	event.preventDefault();

	var status = event.target.status.value.trim();

	// Default status is "up to no good".
	if (!status || !status.length ) {
		status = "up to no good." 
	} 
	
	console.log ("you are " + status);
	var duration = event.target.duration.value;
	console.log("for the next " + duration + " minutes");

	Overlay.hide();
}
});