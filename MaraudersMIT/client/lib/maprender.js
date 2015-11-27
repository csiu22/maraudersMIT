renderMap = function (){
  console.log("rendering map");

  buildMap = function() {

    if ("geolocation" in navigator) {

          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 42.359155, lng: -71.093058}, // 77 Mass Ave
            zoom: 18
          });

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


// array of {name: friend's name, pic: friend's pic,
// checkin: {availability: "available" or "busy", status: "hello", duration: 20, loc: {lat: 10, lng: 10}}}

    function displayUsers(map, pos, friends){
      console.log('displaying users');
      var gSelfLoc = new google.maps.LatLng(pos.lat, pos.lng);
      var selfMarker = new RichMarker({
        map: map,
        position: gSelfLoc,
        draggable: false,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        content: '<div class="here"><div><div><img src="'+Meteor.user().profile.picture+'"/></div><div>You are here!</div>'
      });
       Meteor.call("getFriendLocs", function(err, data) {
         if (err) {
            console.log(err);
         }
       var locations = data;;
       locations.forEach(function(loc) {
         var image = {
           url: loc.pic,
           size: new google.maps.Size(40, 40)
         };
         var gLoc = new google.maps.LatLng(loc.checkin.loc.lat, loc.checkin.loc.lng);
         var marker2 = new RichMarker({
           map: map,
           position: gLoc,
           draggable: false,
           flat: true,
           anchor: RichMarkerPosition.MIDDLE,
           content: '<div class=' + loc.checkin.availability + '><div><div>' + loc.name + '</div><img src="' + loc.pic + '"/></div>' + '<div>' + loc.checkin.text_status + '</div>'          });
        });
      });
    }
  }
}
