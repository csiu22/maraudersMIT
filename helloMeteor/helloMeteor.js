if (Meteor.isClient) {

  // var getMap = (function() {
  //     var map;

  //     if ("geolocation" in navigator) {
  //         console.log("Hello");
  //     } else {
  //         console.log("Goodbye");
  //     }

  //     function initMap() {
  //         map = new google.maps.Map(document.getElementById('map'), {
  //                 center: {lat: 42.359155, lng: -71.093058},  //77 Mass Ave
  //                 zoom: 18
  //         });
  //     }



  //       </script>
  //       <script async defer
  //             src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUWvkqoAwT70st_eiDUo0xcnIcUGgo9g&callback=initMap">
  //       </script>
  // })();
  
      // var map;

      // function initMap() {
      //     map = new google.maps.Map(document.getElementById('map'), {
      //             center: {lat: 42.359155, lng: -71.093058},  //77 Mass Ave
      //             zoom: 18
      //     });
      // }






// This was in the meteor tutorial. Commenting bc it might be useful
  // // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
