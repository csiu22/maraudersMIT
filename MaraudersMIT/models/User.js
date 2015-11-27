MILLISECONDS_IN_MINUTE = 60000;

if (Meteor.isServer) {
  Meteor.methods({
    // Allows a user to check in to a location with an availability, text status, and a duration.
    'checkIn': function(availability, text_status, duration, location) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: {availability: availability, text_status: text_status, duration: duration, loc: location}}});
      setTimeout(Meteor.bindEnvironment(function() {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: null}});
      }), duration * MILLISECONDS_IN_MINUTE);
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
        console.log("friend request sent");
      }
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
      console.log("accepted friend request");
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

      console.log("friend removed");
    },

    // Allows a user to get all of their friends' checkins to be displayed on the map
    'getFriendLocs': function() {
      var locations = [];
      if(Meteor.user() && Meteor.user().friends){
          Meteor.user().friends.forEach(function(friendId) {
          var friend = Meteor.users.findOne({_id: friendId});
          if (friend.checkin) {
                locations.push({name: friend.services.facebook.name, pic: friend.profile.picture, checkin: friend.checkin});
          }
        });
      }
      return locations;
    },

    // Allows a user to get all of the user's that they are facebook friends with to be displayed on the friend's page
    // Returns a list of facebook friends that have app permissions and are in our database. Info for each friend includes:
    // name: (String) The name of the user.
    // id:   (String) The app ID of the friend.
    // friend: (boolean) Whether the friend is friends with the current user.
    // request: (boolean) Whether the current user has sent a friend request to the friend.
    // requested: (boolean) Whether the friend has sent a friend request to the current user.
    'getFacebookFriends': function() {
      var userList = [];
      Meteor.user().profile.facebookfriends.forEach(function(user) {
        var doneChecking = false;
        var currentFriend = Meteor.users.findOne({"services.facebook.id": user.id});
        // If the current is in our database and is a verified user
        if (currentFriend && currentFriend.isVerified) {
          // Iterate through all of the user's app friends and check for a match
          Meteor.user().friends.forEach(function(friendId) {
            var friend = Meteor.users.findOne({_id: friendId});
            // The current friend is also the users app friend
            if (friend.services.facebook.id === user.id) {
              userList.push({name: user.name, id: currentFriend._id, friend: true, request: false, requested: false});
              doneChecking = true;
            }
          });
          // If current friend is not a friend, then check if they have sent a friend request to the current user.
          if (!doneChecking) {
            Meteor.user().requests.forEach(function(friendId) {
              var friend = Meteor.users.findOne({_id: friendId});
              // The current friend has sent a request to the current user.
              if (friend.services.facebook.id === user.id) {
                userList.push({name: user.name, id: currentFriend._id, friend: false, request: true, requested: false});
                doneChecking = true;
              }
            });
          }
          if (!doneChecking) {
            // If the current friend is not a friend and has not sent a request, check if the current user has sent a friend request to the friend.
            currentFriend.requests.forEach(function(requestId) {
              var request = Meteor.users.findOne({_id: requestId});
              // The current user has sent friend request to current friend.
              if (Meteor.userId() === request._id) {
                userList.push({name: user.name, id: currentFriend._id, friend: false, request: true, requested: true});
                doneChecking = true;
              }
            });
          }
          // If none of the above, set all booleans to false;
          if (!doneChecking) {
            userList.push({name: user.name, id: currentFriend._id, friend: false, request: false, requested: false});
          }
        }
      });
//      console.log("LIST");
//      console.log(userList);
      return userList;
    },

    'getMarauderFriends': function() {
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
        return friendNames; 
      }
    }
     
  });
}
