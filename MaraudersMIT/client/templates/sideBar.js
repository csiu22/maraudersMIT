
//take user to their location on the map
var userFocus = function(){
  if(DEBUG) console.log("userFocus method");
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
  });


 Template.sideBar.helpers({
    marauderFriends: function() {
      if (Meteor.user()) {
        var friendNames = []; 
        if(Meteor.user() && Meteor.user().friends){
          Meteor.user().friends.forEach(function(friendId) {
            var friend = Meteor.users.findOne({_id: friendId});
            friendNames.push(friend.services.facebook.name);
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
