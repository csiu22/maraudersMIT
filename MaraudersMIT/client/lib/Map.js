/*

Object that creates google map and displays users

*/


Map = function(){

    var that = Object.create(Map.prototype);
    var markers = {};

    var mapOptions = {
      center: new google.maps.LatLng( 42.359155,  -71.093058), // 77 Mass Ave
      zoom: 15,
      styles: map_styles,
      mapTypeControl: false,
      streetViewControl: false
    };

    that.map = new google.maps.Map(document.getElementById('map'), mapOptions);


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
                 marker_html += '<p style="clear: both;" class="status">' + fragment +' invisible</p>';
              } else {
                marker_html += '<p style="clear: both;" class="duration">' + Number(((user.checkin.end_time - Date.now()) / 60000).toFixed(0)) + ' minutes left</p>';
                marker_html += '<p class="status">' + user.checkin.text_status + '</p>';
              }

              marker_html += '<a class="icn close" href="#" title="Close">Close</a>' +
                              '</div>' +
                              '</div>' +
                              '<span></span>' +
                              '</div></div>';
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


    that.renderSelf = function(pos){  

        if(!Meteor.user()) return;
        if (! "geolocation" in navigator) {
          /* error when geolocation IS NOT available */
          console.log("geo not available");
          return;
        }

        var drawSelf = function(pos){

          var createMarker = function(){
              var marker = new RichMarker({
                  map: that.map,
                  position: new google.maps.LatLng(pos.lat, pos.lng),
                  draggable: false,
                  flat: true,
                  anchor: RichMarkerPosition.BOTTOM,
                  content:  display_status(Meteor.user(), Meteor.userId(), Meteor.user().profile.name, Meteor.user().profile.picture),
                });

                addUserListeners(marker, Meteor.userId());
                markers[Meteor.userId()] = marker;

          }

          if (markers[Meteor.userId()]){
            markers[Meteor.userId()].setMap(null);
            createMarker();
          }
          else{
            createMarker();
          }

      }

       if (pos) { drawSelf(pos); }
       else { that.getUserLocation(drawSelf); }

    }

    /*
    Function that displays each of the user's friends on the map

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


    /*
      Renders a marker which displays a friend
    */  

    that.renderUser= function(friend){

        var createMarker = function() {
            var marker = new RichMarker({
                       user_id: friend.id,
                       map: that.map,
                       position: new google.maps.LatLng(friend.checkin.loc.lat, friend.checkin.loc.lng),
                       draggable: false,
                       flat: true,
                       anchor: RichMarkerPosition.BOTTOM,
                       content: display_status(friend, friend.id, friend.name, friend.pic)
                });
              addUserListeners(marker, friend.id);
              return marker;
        }

        if(markers[friend.id]) { 
            markers[friend.id].setMap(null); 
            markers[friend.id] = createMarker(friend);
        }
        else{
            markers[friend.id] = createMarker(friend);
        }

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
    Function that is used to intialize the map
    */

    that.renderMap = function () {
        that.getUserLocation(function(pos){
          that.map.setCenter(pos);
          that.renderSelf(pos);
        })
        that.renderFriends();
    }


    /*
    Function that will be called 1x per minute to update the duration and status of all of the 
    friends that are displayed.
    */

    that.refresh = function(){
      that.renderSelf();
      that.renderFriends();
    }

  Object.freeze(that);
  return that;
}
