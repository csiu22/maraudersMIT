tryrenderMap = function (){

  buildMap = function() {
    console.log("yo");
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


      //function displayFriends(friends, map) {
        friends.forEach(function(friend){
          console.log("loe");
          var location = new google.maps.LatLng(friend.loc.lat, friend.loc.lng);
          marker = new CustomMarker(location, map, {marker_id: '123'});
        });
    }
  }

  //Make sure that the required libraries are loaded before the map is build
  var display = function(){
    if (! Session.get('richmarkerReady') ){
        setTimeout(display,100);
    } else {
      buildMap();
    }
  }();

}