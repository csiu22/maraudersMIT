if (Meteor.isServer) {
  Meteor.methods({
    'checkIn': function(availability, text_status, duration, location) {
      console.log("checking in from server");
      Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: {availability: availability, text_status: text_status, duration: duration, loc: location}}});
      console.log("setting timeout");
      setTimeout(Meteor.bindEnvironment(function() {
        console.log("timing out check in");
        Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: null}});
      }), duration * 1000 * 60);
     },

    'sendFriendRequest': function(friendId) {
      console.log("does it even get here");
      console.log(Meteor.user().friends.indexOf(friendId));
      console.log(Meteor.user().friends);
      console.log(Meteor.user().requests);
      if ((Meteor.user().friends.indexOf(friendId) >= 0) || (Meteor.user().requests.indexOf(friendId) >= 0)) {
        console.log("Invalid friend request. Already friends or already requested");
      } else {
        console.log("hello");
        console.log(friendId);
        var friend = Meteor.users.findOne({_id: friendId});
        console.log(friend);
        console.log(friend.requests);
        var requests = friend.requests;
        requests.push(Meteor.userId());
        Meteor.users.update({_id: friendId}, {$set: {requests: requests}});
        console.log(friend.requests);
        console.log("friend request sent");
      }
    },

    'acceptFriendRequest': function(friendId) {
      var index = Meteor.user().requests.indexOf(friendId);
      console.log(index);
      var requests = Meteor.user().requests;
      requests.splice(index, 1);

      var friends = Meteor.user().friends;
      friends.push(friendId);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {friends: friends, requests: requests}});

      Meteor.users.update({_id: friendId}, {$push: {friends: Meteor.userId()}});
      console.log("accepted friend request");
    },

    'removeFriend': function(friendId) {
      var index = Meteor.user().friends.indexOf(friendId);
      var friends = Meteor.user().friends;
      friends.splice(index, 1);


      var deleted = Meteor.users.findOne({_id: friendId});
      var deletedFriends = deleted.friends;
      var otherindex = deletedFriends.indexOf(Meteor.userId());
      deletedFriends.splice(otherindex, 1);

      Meteor.users.update({_id: Meteor.userId()}, {$set: {friends: friends}});
      Meteor.users.update({_id: friendId}, {$set: {friends: deletedFriends}});

      console.log("friend removed");
    },

    'getFriendLocs': function(callback) {
      var locations = [];
      Meteor.user().friends.forEach(function(friendId) {
        var friend = Meteor.users.findOne({_id: friendId});
        console.log(friend);
        if (friend.checkin) {
          locations.push({name: friend.services.facebook.name, pic: friend.profile.picture,
                          checkin: friend.checkin});
        }
      });
      return locations;
    }
  });
}
