
//take user to their location on the map
var userFocus = function(){
  if(maraudersMap) {
    maraudersMap.getUserLocation(maraudersMap.setCenter);
  }

}

  Template.sideBar.events({
    'click #check-in': function () {
      	Overlay.show('checkInOverlay');
    },

    'click #check-out': function () {
        Meteor.call("checkOut", function() {
          if(DEBUG) {console.log("finished checking out");}
          maraudersMap.renderSelf();
         if(timer) {clearInterval(timer);}
        });

        alert("You have successfully checked out.");
    },

     'click #locate': function () {
        userFocus();
    },
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


 Template.sideBar.helpers({
    marauderFriends: function() {
      if (Meteor.user()) {
        var friendNames = [];
        if(Meteor.user() && Meteor.user().friends){
          Meteor.user().friends.forEach(function(friendId) {
            var friend = Meteor.users.findOne({_id: friendId});
            friendNames.push(friend);
          });
          if (friendNames.length === 0) {
            friendNames.push("None");
          }
        }
        return friendNames.sort();
      }
    },
  });

//Initialize tooltips
Template.sideBar.rendered = function(){ $('[data-toggle="tooltip"]').tooltip();}
