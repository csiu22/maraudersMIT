/*

Function that creates google map and displays users

*/
renderMap = function (){
  console.log("rendering map");

  //Geolocation is necessary in order for the user to be able to use this app
    if ("geolocation" in navigator) {

          //Create map centered on Mass Ave
          var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: 42.359155, lng: -71.093058}, // 77 Mass Ave
              zoom: 18
          });

          var displayUsers = function(pos){
              map.setCenter(pos);
              displaySelf(map, pos);
              displayFriends(map);

          };

          getUserLocation(displayUsers);

   } else {
      /* error when geolocation IS NOT available */
      console.log("geo not available");
    }    


  /*
  Function that displays the current user on the map
  map: a google maps object
  pos: object that contains latitude and longitude coordinates
  */

    function displaySelf(map, pos){
      if(!pos) return;
      var gSelfLoc = new google.maps.LatLng(pos.lat, pos.lng);
      var selfMarker = new RichMarker({
          map: map,
          position: gSelfLoc,
          draggable: false,
          flat: true,
          anchor: RichMarkerPosition.MIDDLE,
          content: '<div class="here"><div><div><img src="'+Meteor.user().profile.picture+'"/></div><div>You are here!</div>'
      });
    }

  /*
  Function that displays each of the user's friends on the map
  map: a google maps object
  */

    function displayFriends(map){

       Meteor.call("getFriendLocs", function(err, data) {
         if (err && DEBUG) {
            console.log("error occurred! " + err.toString());
         }

         var locations = data;
         
         if (locations){
             locations.forEach(function(loc) {
                   var image = {
                     url: loc.pic,
                     size: new google.maps.Size(40, 40)
                   };

                  var gLoc = new google.maps.LatLng(loc.checkin.loc.lat, loc.checkin.loc.lng);
                   var friendMarker = new RichMarker({
                         map: map,
                         position: gLoc,
                         draggable: false,
                         flat: true,
                         anchor: RichMarkerPosition.MIDDLE,
                         content: '<div class=' + loc.checkin.availability + '><div><div>' + loc.name + '</div><img src="' + loc.pic + '"/></div>' + '<div>' + loc.checkin.text_status + '</div>'
                  });
              });
        }
      });
    }

}
