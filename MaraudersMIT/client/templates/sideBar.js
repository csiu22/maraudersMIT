
//take user to their location on the map
var userFocus = function(){

  if( maraudersMap) {
    maraudersMap.getUserLocation(maraudersMap.setCenter);
  }

}

  Template.sideBar.events({
    'click #check-in': function () {
      	Overlay.show('checkInOverlay');
    },
  });


 Template.sideBar.helpers({
    friends: function() {  
      if (DEBUG) {
      		console.log(Meteor.user());
      		console.log(Meteor.user().friends);
      }

      var friendNames = [];
      if(Meteor.user() && Meteor.user().friends){		
      		Meteor.user().friends.forEach(function(friendId) {
        		var friend = Meteor.users.findOne({_id: friendId});
        		friendNames.push(friend.services.facebook.name);
     		 });
      }

      if (friendNames.length === 0) {
      	  friendNames.push("None");
      }
      return friendNames;
    },
     marauderFriends: function() {
      return Template.instance().myAsyncValue.get();
    },
  });

 // Sets up sideBar template so that helper functions can use async functions
  Template.sideBar.created = function(){
    var self = this;
    self.myAsyncValue = new ReactiveVar([]);

    Meteor.call('getMarauderFriends', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        self.myAsyncValue.set(data);
      }
    });
  };

//Initialize tooltips
Template.sideBar.rendered = function(){ $('[data-toggle="tooltip"]').tooltip();}