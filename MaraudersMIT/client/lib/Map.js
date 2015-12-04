/*

Object that creates google map and displays users

*/


Map = function(){

    var that = Object.create(Map.prototype);


    var massave = new google.maps.LatLng( 42.359155,  -71.093058);

    var mapOptions = {
      center: massave,
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




    that.displaySelf = function(pos){
        if(!pos || !Meteor.user()) return;
        var gSelfLoc = new google.maps.LatLng(pos.lat, pos.lng);

        var display_status = function(checkin_obj) {
          var status = checkin_obj.availability;

          if(status != "available" && status != "busy" && status != "invisible"){
                console.log("status is not valid. status = " + status);
                return;
          }

        var marker_html = '<div id="'+ Meteor.userId()+'"><div class="pin">' +
            '<div id="wrapper" class="wrapper">' +
              '<div class="small">' +
                '<img src="' + Meteor.user().profile.picture + '" alt="" />' +
              '</div>' +
              '<div class="large">' +
                '<p style="float: left;"><img src="' + Meteor.user().profile.picture + '" alt="" /></p>' +
                '<p class="text"><strong>' + Meteor.user().profile.name + '</strong></p>';
               
                if(status === "available"){
                    marker_html +=  '<em>You are available</em>';

                }
                else if (status === "busy"){

                     marker_html +=  '<em>You are busy</em>';

                }
                else{

                    marker_html +=  '<em>You are invisible</em>';
                }

                 
        marker_html += '<a class="icn close" href="#" title="Close">Close</a>' +
              '</div>' +
            '</div>' +
            '<span></span>' +
            '</div></div>';


            return marker_html;
        };

  

            var user_marker = new RichMarker({
              position: gSelfLoc,
              flat: true,
              anchor: RichMarkerPosition.BOTTOM,
              content:  display_status(Meteor.user().checkin),
            });
            user_marker.setMap(that.map);

            google.maps.event.addListener(user_marker, 'click', function() {

              var modifier = 0.0178;
              if ($(window).width() < 768) {
                modifier = 0;
              }

              if (!$('#'+Meteor.userId()).hasClass('active')) {
   
              }

              $('#'+Meteor.userId()+' .pin ').removeClass('active').css('z-index', 10);
              $('#'+Meteor.userId()+' .pin').addClass('active').css('z-index', 200);

              $('#'+Meteor.userId()+' .pin #wrapper .large').click(function(){
                $('#'+Meteor.userId()+' .pin').removeClass('active');
                return false;
              });

            });


       }

      /*
      Function that displays each of the user's friends on the map
      map: a google maps object
      */

     that.displayFriends = function(){

         Meteor.call("getFriendLocs", function(err, data) {
           if (err && DEBUG) {
              console.log("error occurred! " + err.toString());
           }

           var friends = data;

           if (friends){
               friends.forEach(function(friend) {
                     var image = {
                       url: friend.pic,
                       size: new google.maps.Size(40, 40)
                     };

                    var gLoc = new google.maps.LatLng(friend.checkin.loc.lat, friend.checkin.loc.lng);

                    if (friend.checkin.availability == 'busy') {
                      var marker_html = '<div id="'+ friend.id+'"><div class="pin">' +
                        '<div class="wrapper">' +
                          '<div class="small">' +
                            '<img src="' + loc.pic + '" alt="" />' +
                          '</div>' +
                          '<div class="large">' +
                            '<p style="float: left;"><img src="' + loc.pic + '" alt="" /></p>' +
                            '<h3 class="text"><strong>' + loc.name + '</strong></p>' +
                            // '<div class="boo">' +
                            '<p>' + loc.checkin.duration + '</p>' +
                            '<em>' + loc.checkin.text_status + '</em>' +
                            // '</div>' +
                            '<a class="icn close" href="#" title="Close">Close</a>' +
                          '</div>' +
                        '</div>' +
                        '<span></span>' +
                        '</div></div>';
                    }

                    var friendMarker = new RichMarker({
                           map: that.map,
                           position: gLoc,
                           draggable: false,
                           flat: true,
                           anchor: RichMarkerPosition.BOTTOM,
                           content: marker_html
                    });

                    google.maps.event.addListener(friendMarker, 'click', function() {

                      var modifier = 0.0178;
                      if ($(window).width() < 768) {
                        modifier = 0;
                      }


               if (!$('#'+friend.id).hasClass('active')) {
   
              }

              $('#'+friend.id+' .pin ').removeClass('active').css('z-index', 10);
              $('#'+friend.id+' .pin').addClass('active').css('z-index', 200);

              $('#'+friend.id+' .pin .wrapper .large').click(function(){
                $('#'+friend.id+' .pin').removeClass('active');
                return false;
              });

            });
        });
      }
    });
  };


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

      that.renderMap = function (){

      //Geolocation is necessary in order for the user to be able to use this app
      if ("geolocation" in navigator) {

            var displayUsers = function(pos){
                that.map.setCenter(pos);
                that.displaySelf(pos);
                that.displayFriends();

            };

            that.getUserLocation(displayUsers);

      } else {
        /* error when geolocation IS NOT available */
        console.log("geo not available");
      }
  }

  /*
  Currently doesn't work, not sure why :(
    */

  that.redraw = function(){
     var x = that.map.getZoom();
     var c = that.map.getCenter();
     google.maps.event.trigger(that.map, 'resize');
     that.map.setZoom(x);
     that.map.setCenter(c);
  }



  Object.freeze(that);
  return that;
}
