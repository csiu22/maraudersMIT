if (Meteor.isServer) {
  Meteor.methods({
    'checkIn': function(availability, text_status, duration, location) {
      console.log("checking in from server");
      Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: {availability: availability, text_status: text_status, duration: duration, loc: location}}});
     },

    'sendFriendRequest': function(friendId) {
      if (Meteor.user().friends.indexOf(friendId) >= 0 || Meteor.user().friends.indexOf(friendId>=0)) {
        console.log("Invalid friend request. Already friends or already requested"); 
      } else {
        var friend = Meteor.users.findOne({_id: friendId});
        friend.requests.push(Meteor.userId());
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
      Meteor.user.friends.splice(index, 1); 
      console.log("friend removed");
    }
  });
}
