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

	var availability = event.target.state.value;
	console.log("and your availability is: " + availability);

         
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos);
      Meteor.call("checkIn", availability, status, duration, pos, function() {
        console.log("done submitting");
        maraudersMap.renderSelf();
      });
    //  checkIn(availability, status, duration, pos);
    }, function() {
      console.log("error can't get location");
    });
  } else {
    alert("Please make sure you have geolocation enabled");
    // Browser doesn't support Geolocation
    console.log("error browser doesn't support geolocation");
  }   

 	Overlay.hide();
}
});
