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
       console.log("checkin availability " + event.target.attributes.checkinAvailability.nodeValue);

       if (event.target.attributes.checkinAvailability.nodeValue === "invisible") {
            console.log("your friend is invisible");
      } else {
            var latitude = event.target.attributes.checkinLatitude.nodeValue
            var longitude = event.target.attributes.checkinLongitude.nodeValue

            console.log("checked in" + latitude + "  " + longitude);

            // var pos = {
            //         lat: latitude,
            //         lng: longitude
            // }

            // maraudersMap.setCenter(pos);
      }
    }
  });