CheckInService = {
  /**
   * Set user-inputted status, availability, duration, and location.
   */
  checkInUser: function (end_time, availability, status, duration, pos) {
    Meteor.call("checkIn", end_time, availability, status, duration, pos, function() {
      console.log("done submitting");
      maraudersMap.renderSelf();
      if(!timer) {timer = setInterval(maraudersMap.refresh, 60000);}
    });

    
  }
};

Template.checkInOverlay.events({
"submit .check-in-info": function () {
	// Prevent default browser form submit
	event.preventDefault();

  var status = event.target.status.value.trim();
  // Default status is "up to no good".
  if (!status || !status.length ) {
    status = "up to no good."
  }

  var duration = event.target.duration.value;
  var availability = event.target.state.value;

  var time = Date.now();
  var end_time = time + duration*(60000);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      CheckInService.checkInUser(end_time, availability, status, duration, pos);
    }, function() {
      console.log("error can't get location");
    });
  } else {
    // Browser doesn't support Geolocation
    alert("Please make sure you have geolocation enabled");
    console.log("error browser doesn't support geolocation");
  }
 	Overlay.hide();
}
});
