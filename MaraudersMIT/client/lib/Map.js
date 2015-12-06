/*

Object that creates google map and displays users

*/


Map = function(){

    var that = Object.create(Map.prototype);
    that.markers = [];
    that.self_marker = null;

    var mapOptions = {
      center: new google.maps.LatLng( 42.359155,  -71.093058), // 77 Mass Ave
      zoom: 15,
      styles: map_styles,
      mapTypeControl: false,
      streetViewControl: false
    };

    that.map = new google.maps.Map(document.getElementById('map'), mapOptions);


            /*

            This is all to set the boundaries of the map, please do not touch!

            */

            // var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
            // that.map.mapTypes.set('gray', mapType);
            // that.map.setMapTypeId('gray');


            //   // limit map to the Boston / Cambridge area
            //   var allowedBounds = new google.maps.LatLngBounds(
            //       new google.maps.LatLng(42.330825, -71.110483), //southwest coord of bounds
            //       new google.maps.LatLng( 42.375860, -71.046968) // northeast coord of bounds
            //   );
            //   var lastValidCenter = that.map.getCenter();

            //   google.maps.event.addListener(that.map, 'center_changed', function() {
            //           if (allowedBounds.contains(that.map.getCenter())) {
            //               // still within valid bounds, so save the last valid position
            //               lastValidCenter = that.map.getCenter();
            //           return;
            //           }
            //           that.map.panTo(lastValidCenter);
            //   });

           /*
              End of boundary settings
           */

    var display_status = function(user, userId, userName, userPic) {
      var status = user.checkin.availability;
      var isUser = (userId === Meteor.userId() ? true : false);
      if (isUser){
          var fragment = "You are";
      }
      else{
          var fragment = userName + " is"
      }

      var marker_html = '<div id="'+ userId +'"><div class="pin">' +
          '<div class="wrapper ' + status + '">' +
            '<div class="small">' +
              '<img src="' + userPic + '" alt="" />' +
            '</div>' +
            '<div class="large">' +
              '<p style="float: left;"><img src="' + userPic + '" alt="" /></p>' +
              '<h1 class="text"><strong>' + userName + '</strong></h1>';

      if (status === "unavailable") {
         marker_html += '<em>' + fragment +' invisible</em>';
      } else {
        marker_html += '<p style="clear: both;" class="duration">' + Number(((user.checkin.end_time - Date.now()) / 60000).toFixed(0)) + ' minutes left</p>';
        marker_html += '<p class="status">' + user.checkin.text_status + '</p>';
      }

      marker_html += '<a class="icn close" href="#" title="Close">Close</a>' +
                      '</div>' +
                      '</div>' +
                      '<span></span>' +
                      '</div></div>';
      if(DEBUG) { console.log(marker_html); }
      return marker_html;
    };


    var addUserListeners = function(marker, userID){
        google.maps.event.addListener(marker, 'click', function() {
        var modifier = 0.0178;
        if ($(window).width() < 768) {
          modifier = 0;
        }

        $('#'+userID+' .pin ').removeClass('active').css('z-index', 10);
        $('#'+userID+' .pin').addClass('active').css('z-index', 300);

        $('#'+userID+' .pin .wrapper .large').click(function(){
          $('#'+userID+' .pin').removeClass('active');
          return false;
        });
      });


    }


    that.renderSelf = function(){

      if (that.self_marker){
          that.self_marker.setMap(null);
      }

        if(!Meteor.user()) return;
        if (! "geolocation" in navigator) {
          /* error when geolocation IS NOT available */
          console.log("geo not available");
          return;
        }

        var drawSelf = function(pos){
          var marker = new RichMarker({
              map: that.map,
              position: new google.maps.LatLng(pos.lat, pos.lng),
              draggable: false,
              flat: true,
              anchor: RichMarkerPosition.BOTTOM,
              content:  display_status(Meteor.user(), Meteor.userId(), Meteor.user().profile.name, Meteor.user().profile.picture),
            });

            console.log(marker);
            addUserListeners(marker, Meteor.userId());
            that.self_marker = marker;

      }

       var displaySelf = function(pos){
              that.map.setCenter(pos);
              drawSelf(pos);
          };

       that.getUserLocation(displaySelf);

    }

    /*
    Function that displays each of the user's friends on the map
    map: a google maps object
    */
    that.renderFriends = function(){
      Meteor.call("getFriendLocs", function(err, data) {
        if (err && DEBUG) {
          console.log("error occurred! " + err.toString());
        }

        if (data){
          data.forEach(function(friend) {

              that.renderUser(friend);

          });
        }
      });
    };

    that.renderUser= function(friend){
      if (friend.id in markers){
          markers[friend.id].setMap(null);
      }

       markers[friend.id] = new RichMarker({
                   user_id: friend.id,
                   map: that.map,
                   position: new google.maps.LatLng(friend.checkin.loc.lat, friend.checkin.loc.lng),
                   draggable: false,
                   flat: true,
                   anchor: RichMarkerPosition.BOTTOM,
                   content: display_status(friend, friend.id, friend.name, friend.pic)
            });

            addUserListeners(markers[friend.id], friend.id);
    }

    /*
    Function that returns the location of the current user, if it is available
    */

    that.getUserLocation = function(successfunc) {

      function errfunc(err){
        alert( 'Error: The Geolocation service failed.');
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          successfunc(pos);
        }, errfunc);
      } else {
        errfunc();
        return undefined;
      }
    }

    that.setCenter = function(pos){
      that.map.setCenter(pos);
    }


    /*
    Function that displays the current user on the map
    map: a google maps object
    pos: object that contains latitude and longitude coordinates
    */

    that.renderMap = function () {
        that.renderSelf();
        that.renderFriends();
    }



    that.refresh = function(){
      that.renderSelf();
      that.markers.forEach(function(marker){
          that.renderUser(marker.user_id);
      })
    }

  // Object.freeze(that);
  return that;
}