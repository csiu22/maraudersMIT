Template.searchBox.helpers({
  settings: function() {
    return {
      limit: 10,
      rules: [
        {
          collection: Meteor.users,
          field: 'services.facebook.name',
          options:"", //Only match beginning of first or last name
          matchAll: true,
          template: Template.searchResults
        }
      ]
    };
  }
});

  Template.searchResults.events({
    'click #clickOnFriend': function (event) {

       Meteor.call("isFriend",  event.target.attributes.friendId.nodeValue, function(err, data) {
             if (data) {
                    // Is a friend.
                    if (event.target.attributes.checkinAvailability.nodeValue === "unavailable") {
                          alert(event.target.attributes.name.nodeValue + " is currently unavailable");
                    } else {
                          var latitude = event.target.attributes.checkinLatitude.nodeValue
                          var longitude = event.target.attributes.checkinLongitude.nodeValue
                          var friendPos = new google.maps.LatLng(latitude, longitude);

                          if (maraudersMap) {
                                maraudersMap.setCenter(friendPos);
                          } else {
                                console.log("error");
                          }
                    }
             } else {
                    // Is not a friend.
                    alert("You are not friends with this person yet");
             }
       });

    }
  });