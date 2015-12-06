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

      if (maraudersMap) {
        console.log(event.target.attributes.friendId.nodeValue);
      if (maraudersMap.markers[event.target.attributes.friendId.nodeValue]){
          maraudersMap.setCenter(maraudersMap.markers[event.target.attributes.friendId.nodeValue].position);
          }
          else{
            console.log("error -- marker does not exist");
          }
      }
      else{
          console.log("error -- map is not available");
      }

    }
  });