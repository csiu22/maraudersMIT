if (Meteor.isClient) {
	console.log("clientside code");
	Session.set('richmarkerReady', false);
	Session.set('richmarkerCompiledReady', false);
	Meteor.startup(function() {
  		Meteor.loginWithFacebook({
    			requestPermissions: ['publish_actions']
  		}, function (err) {
    			if (err) {
      				Session.set('errorMessage', err.reason || 'Unknown error');
    			}
  		});
			
		$.getScript('https://google-maps-utility-library-v3.googlecode.com/svn-history/r435/trunk/richmarker/src/richmarker.js', function(){
  			// script has loaded
			console.log("richmarker available");
  			Session.set('richmarkerReady', true);
 		});

		$.getScript('https://google-maps-utility-library-v3.googlecode.com/svn-history/r435/trunk/richmarker/src/richmarker-compiled.js', function(){
  			// script has loaded
			console.log("richmarkerCompiledReady available");
  			Session.set('richmarkerCompiledReady', true);
 		});
	});

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


