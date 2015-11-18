if (Meteor.isClient) {
	console.log("clientside code");

	if ("geolocation" in navigator) {
		/* geolocation is available */
		console.log("geo available");
		var map;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
		    		center: {lat: position.coords.latitude, lng: position.coords.longitude},  //77 Mass Ave
		    		zoom: 18
			});
		}
	} else {
		/* geolocation IS NOT available */
		console.log("geo not available");
	}
}

