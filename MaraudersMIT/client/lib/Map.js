/*

Object that creates google map and displays users

*/


Map = function(){

    var that = Object.create(Map.prototype);

    that.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 42.359155, lng: -71.093058}, // 77 Mass Ave
                zoom: 18
            });

      // // limit map to the Boston / Cambridge area
      // var allowedBounds = new google.maps.LatLngBounds(
      //     new google.maps.LatLng(42.330825, -71.110483), //southwest coord of bounds
      //     new google.maps.LatLng( 42.375860, -71.046968) // northeast coord of bounds
      // );
      // var lastValidCenter = that.map.getCenter();

      // google.maps.event.addListener(that.map, 'center_changed', function() {
      //         if (allowedBounds.contains(that.map.getCenter())) {
      //             // still within valid bounds, so save the last valid position
      //             lastValidCenter = that.map.getCenter();
      //         return;
      //         }
      //         that.map.panTo(lastValidCenter);
      // });

    that.displaySelf = function(pos){
        if(!pos) return;
        var gSelfLoc = new google.maps.LatLng(pos.lat, pos.lng);
        // var selfMarker = new RichMarker({
        //     map: that.map,
        //     position: gSelfLoc,
        //     draggable: false,
        //     flat: true,
        //     anchor: RichMarkerPosition.MIDDLE,
        //     content: '<div class="here"><div><div><img src="'+Meteor.user().profile.picture+'"/></div><div>You are here!</div>'
        // });

        var contentString =
          // '<div class="here">' +
          '<h1 id="firstHeading" class="firstHeading">' + Meteor.user().profile.name + ' (You)</h1>' +
          '<div>You are currently invisible</div>';
          // +
          // '<h3 class>' + Meteor.user().checkin.duration + ' minutes left</h2>' +
          // '<div>' + Meteor.user().checkin.text_status + '</div>'

        var avl_border = "/icons/invisible.png"
        if (Meteor.user().checkin == null || Meteor.user().checkin.availability == 'invisible') {
          avl_border = "/icons/invisible.png";
        } else if (Meteor.user().checkin.availability == 'available') {
          avl_border = "/icons/available2.png";
          contentString = '<h1 id="firstHeading" class="firstHeading">' + Meteor.user().profile.name + ' (You)</h1>' +
                          // '<h3 class>' + Meteor.user().checkin.duration + ' minutes left</h2>' +
                          '<div>' + Meteor.user().checkin.text_status + '</div>';
        } else if (Meteor.user().checkin.availability == 'busy'){
          avl_border = "/icons/busy2.png";
          contentString = '<h1 id="firstHeading" class="firstHeading">' + Meteor.user().profile.name + ' (You)</h1>' +
                          // '<h3 class>' + Meteor.user().checkin.duration + ' minutes left</h2>' +
                          '<div>' + Meteor.user().checkin.text_status + '</div>';
        }



        var selfMarker = new CustomMarker(
            gSelfLoc,
            that.map,
            {
              marker_id: '123',
              img: Meteor.user().profile.picture,
              name: Meteor.user().profile.name,
              image_container: avl_border
            }
        );






        var iw = new google.maps.InfoWindow({content: contentString, pixelOffset: new google.maps.Size(0,-60)});
        // iw.open(that.map, selfMarker);
        google.maps.event.addListener(selfMarker, "click", function() {
          iw.open(that.map, selfMarker);
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

           var locations = data;

           if (locations){
               locations.forEach(function(loc) {
                     var image = {
                       url: loc.pic,
                       size: new google.maps.Size(40, 40)
                     };

                    var gLoc = new google.maps.LatLng(loc.checkin.loc.lat, loc.checkin.loc.lng);
                    // var friendMarker = new RichMarker({
                    //        map: that.map,
                    //        position: gLoc,
                    //        draggable: false,
                    //        flat: true,
                    //        anchor: RichMarkerPosition.MIDDLE,
                    //        content: '<div class=' + loc.checkin.availability + '><div><div>' + loc.name + '</div><img src="' + loc.pic + '"/></div>' + '<div>' + loc.checkin.text_status + '</div>'
                    // });

                    var friendMarker = new CustomMarker(
                        gLoc,
                        that.map,
                        {
                          marker_id: '123',
                          img: loc.pic,
                          name: loc.name,
                          availability: loc.checkin.availability
                        }
                    );

                    var contentStringFriend =
                      // '<div class=' + loc.checkin.availability + '>' +
                      '<h1 id="firstHeading" class="firstHeading">' + loc.name + '</h1>' +
                      '<h3 class>' + loc.checkin.duration + ' minutes left</h2>' +
                      '<div>' + loc.checkin.text_status + '</div>'



                    var iwFriend = new google.maps.InfoWindow({content: contentStringFriend, pixelOffset: new google.maps.Size(5,0)});
                    google.maps.event.addListener(friendMarker, "click", function() {
                      iwFriend.open(that.map, friendMarker);
                    });
                });
          }
        });
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
