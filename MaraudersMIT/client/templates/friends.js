FriendsService = {
  acceptFriendRequest: function (friendId) {
    Meteor.call('acceptFriendRequest', friendId, function() {
      console.log("done accepting");
    });
  },
  sendFriendRequest: function(friendId) {
    Meteor.call('sendFriendRequest', friendId, function() {
      console.log("done requesting");
    });
  },
  removeFriend: function(friendId) {
    Meteor.call('removeFriend', friendId, function() {
      console.log("done unfriending");
    });
  },
  cancelFriendRequest: function(friendId) {
    Meteor.call('cancelFriendRequest', friendId, function() {
      console.log("done canceling");
    });
  },

  /**
   * Allows a user to get all of the user's that they are facebook friends with to be displayed on the friend's page
   * Returns a list of facebook friends that have app permissions and are in our database. Info for each friend includes:
   * name: (String) The name of the user.
   * id:   (String) The app ID of the friend.
   * friend: (boolean) Whether the friend is friends with the current user.
   * request: (boolean) Whether the current user has sent a friend request to the friend.
   * requested: (boolean) Whether the friend has sent a friend request to the current user.
   */
  getFacebookFriends: function() {
    var userList = [];
    if( Meteor.user() && Meteor.user().profile.facebookfriends) {
      Meteor.user().profile.facebookfriends.forEach(function(user) {
        var doneChecking = false;
        var currentFriend = Meteor.users.findOne({"services.facebook.id": user.id});
        // If the current is in our database and is a verified user
        if (currentFriend && currentFriend.isVerified) {
          // Iterate through all of the user's app friends and check for a match
          if (Meteor.user().friends) {
            Meteor.user().friends.forEach(function(friendId) {
              var friend = Meteor.users.findOne({_id: friendId});
              // The current friend is also the users app friend
              if (friend.services.facebook.id === user.id) {
                userList.push({name: user.name, id: currentFriend._id, friend: true, request: false, requested: false, pic: currentFriend.profile.picture});
                doneChecking = true;
              }
            });
          }
          // If current friend is not a friend, then check if they have sent a friend request to the current user.
          if (!doneChecking) {
            Meteor.user().requests.forEach(function(friendId) {
              var friend = Meteor.users.findOne({_id: friendId});
              // The current friend has sent a request to the current user.
              if (friend.services.facebook.id === user.id) {
                userList.push({name: user.name, id: currentFriend._id, friend: false, request: true, requested: false, pic: currentFriend.profile.picture});
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
                userList.push({name: user.name, id: currentFriend._id, friend: false, request: true, requested: true, pic: currentFriend.profile.picture});
                doneChecking = true;
              }
            });
          }
          // If none of the above, set all booleans to false;
          if (!doneChecking) {
            userList.push({name: user.name, id: currentFriend._id, friend: false, request: false, requested: false, pic: currentFriend.profile.picture});
          }
        }
      });
    }
    return userList;
  }
};

if (Meteor.isClient) {
  Template.friends.events({
    "click #friend-accept": function() {
      var friendId = this.id;
      FriendsService.acceptFriendRequest(friendId);
    },

    "click #friend-request": function() {
      var friendId = this.id;
      FriendsService.sendFriendRequest(friendId);
    },

    "click #friend-remove": function() {
      var friendId = this.id;
      FriendsService.removeFriend(friendId);
    },

    "click #friend-cancel-request": function() {
      var friendId = this.id;
      FriendsService.cancelFriendRequest(friendId);
    }
  });

  Template.friends.helpers({
    facebookFriends: function() {
      return FriendsService.getFacebookFriends();
    }
  });
}
