renderMap = function() {

	if ("geolocation" in navigator) {

			  var map = new google.maps.Map(document.getElementById('map'), {
			    center: {lat: 42.359155, lng: -71.093058}, // 77 Mass Ave
			    zoom: 18
			  });

			  // Try HTML5 geolocation.
			  if (navigator.geolocation) {
				  navigator.geolocation.getCurrentPosition(function(position) {
				  	var pos = {
					  	lat: position.coords.latitude,
					  	lng: position.coords.longitude
				  	};

					  map.setCenter(pos);
					  displayUsers(map, pos);
				 }, function() {
				  	handleLocationError(true, infoWindow, map.getCenter());
				 });
			 } else {
			   	// Browser doesn't support Geolocation
			   	handleLocationError(false, infoWindow, map.getCenter());
			 }

		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
		                        'Error: The Geolocation service failed.' :
		                        'Error: Your browser doesn\'t support geolocation.');
		}
	} else {
		/* geolocation IS NOT available */
		console.log("geo not available");
	}

	function displayUsers(map, pos){

			//Update user location
			var Caitlin = {
				name: "Caitlin Mehl",
				loc: pos,
				pic: '/user_images/test_image.png',
				status: 'available',
			};

      var Test = {
        name: "Tester Test",
        loc: {lat: 42.359155, lng: -71.093058},
        pic: '/user_images/test_image.png',
        status: 'busy',
      }
			var friends = [Caitlin, Test];


// array of {name: friend's name,
// pic: friend's pic,
// checkin: {availability: "available" or "busy",
// status: "hello",
// duration: 20: loc: {lat: 10, lng: 10}}}


		//function displayFriends(friends, map) {
			friends.forEach(function(friend){
        if (friend.status !== 'invisible') {
          var image = {
  			    url: friend.pic,
  			    size: new google.maps.Size(40, 40),

  					/* These need to be set but I'm not 100% sure how to do it yet
  				    origin: new google.maps.Point(0, 0),
  				    anchor: new google.maps.Point(0, 32)
  				    */
          };

          var location = new google.maps.LatLng(friend.loc.lat, friend.loc.lng);

          // Test RichMarker
          // var div = document.createElement('DIV');
          // div.innerHTML = '<div class="my-other-marker">I am flat marker!</div>';


          marker2 = new RichMarker({
            map: map,
            position: location,
            draggable: false,
            flat: true,
            anchor: RichMarkerPosition.MIDDLE,
            content: '<div class=' + friend.status + '><div><div>' + friend.name + '</div><img src="' + friend.pic + '"/></div>' + '<div>' + friend.status + '</div>'
          });

  		  	// var marker = new google.maps.Marker({
       //          position: {lat: friend.loc.lat + .00003, lng: friend.loc.lng - .000005},
  				 //      map: map,
  				 //      icon: image,
  				 //      //shape: shape,
  				 //      title: friend.name,
       //          zIndex: google.maps.Marker.MAX_ZINDEX + 1
  		   //  });

       //    var status = new google.maps.Marker({
       //        position: friend.loc,
       //        map: map,
       //        icon: friend.status === 'available' ? '/icons/Available.png' : '/icons/Busy.png',
       //        title: friend.status,
       //    });
        }
   		});
	}


}