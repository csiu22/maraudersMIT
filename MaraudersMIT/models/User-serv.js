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
      Meteor.user().requests.splice(index, 1);
      Meteor.user().friends.push(friendId);
      console.log("accepted friend request");
    },

    'removeFriend': function(friendId) {
      var index = Meteor.user().friends.indexOf(friendId);
      Meteor.user().friends.splice(index, 1);
      console.log("friend removed");
    },

    'getFriendLocs': function(callback) {
      var locations = [];
      Meteor.user().friends.forEach(function(friendId) {
        var friend = Meteor.users.findOne({_id: friendId});
        if (friend.checkIn != null) {
          locations.push({name: friend.services.facebook.name, pic: friend.services.facebook.profile.picture,
                          checkIn: friend.checkIn});
        }
      });
      callback(locations);
    }
  });
}
