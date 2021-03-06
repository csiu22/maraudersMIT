MILLISECONDS_IN_MINUTE = 60000;

if (Meteor.isServer) {
  Meteor.methods({
    // Allows a user to check in to a location with an availability, text status, and a duration.
    'checkIn': function(end_time, availability, text_status, duration, location) {
      var checkin = {end_time: end_time, availability: availability, text_status: text_status, duration: duration, loc: location, user_id: Meteor.userId()};
      checkIn(checkin);
     },

    // Allows a user to check out before the duration of a previous check-in is finished.
    'checkOut': function() {
      FutureTasks.remove(Meteor.user().checkin.handle);
      SyncedCron.remove(Meteor.user().checkin.handle);
      checkOut({user_id: Meteor.userId()});
     },

    // Allows user to send a friend request to another user
    'sendFriendRequest': function(friendId) {
      if ((Meteor.user().friends.indexOf(friendId) >= 0) || (Meteor.user().requests.indexOf(friendId) >= 0)) {
        console.log("Invalid friend request. Already friends or already requested");
      } else {
        var friend = Meteor.users.findOne({_id: friendId});
        var requests = friend.requests;
        requests.push(Meteor.userId());
        Meteor.users.update({_id: friendId}, {$set: {requests: requests}});
      }
    },

    'cancelFriendRequest': function(friendId) {
      // if ((Meteor.user().requests.indexOf(friendId) >= 0) || (Meteor.user().requests.indexOf(friendId) >= 0)) {
      //   console.log("Can't cancel friend request.");
      // } else {
        var friend = Meteor.users.findOne({_id: friendId});
        var requests = friend.requests;

        var index = requests.indexOf(Meteor.userId());
        requests.splice(index, 1);

        Meteor.users.update({_id: friendId}, {$set: {requests: requests}});
      // }
    },

    // Allows user to accept another user's friend request
    'acceptFriendRequest': function(friendId) {
      var index = Meteor.user().requests.indexOf(friendId);
      var requests = Meteor.user().requests;
      requests.splice(index, 1);

      var friends = Meteor.user().friends;
      friends.push(friendId);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {friends: friends, requests: requests}});

      Meteor.users.update({_id: friendId}, {$push: {friends: Meteor.userId()}});
  
    },

    // Allows user to remove another user from their friends
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

    },

    // Allows a user to get all of their friends' checkins to be displayed on the map
    'getFriendLocs': function() {
      var locations = [];
      if(Meteor.user() && Meteor.user().friends){
          Meteor.user().friends.forEach(function(friendId) {
          var friend = Meteor.users.findOne({_id: friendId});
          if (friend.checkin.availability !== "unavailable") {
                locations.push({id:friendId, name: friend.services.facebook.name, pic: friend.profile.picture, checkin: friend.checkin});
          }
        });
      }
      return locations;
    },

    // Checks if the id of the given user is the current user's friend
    'isFriend': function(givenFriendId) {
      return Meteor.user().friends.indexOf(givenFriendId) !== -1;
    }
  });
}
