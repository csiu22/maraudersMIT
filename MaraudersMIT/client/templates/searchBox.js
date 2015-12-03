// StandardLegends = new Mongo.Collection(null);

if (Meteor.isClient) {
  Meteor.subscribe("users");
}

Template.searchBox.helpers({
  settings: function() {
    return {
      limit: 10,
      rules: [
        {
          // token: '',
          collection: Meteor.users,
          field: 'services.facebook.name',
          matchAll: true,
          template: Template.searchResults
        }
      ]
    };
  }
});

  Template.searchResults.events({
    'click #centerOnFriend': function (event) {

       if (event.target.attributes.checkinAvailability.nodeValue === "invisible") {
            alert(event.target.attributes.name.nodeValue + " is currently invisible");
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
    }
  });