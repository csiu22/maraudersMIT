//Every user has:

// Setters
// add Friend
// accept Friend (only for people in list of Friend Requests)
// delete Friend (only for people in list of Friends)


//Getters
// getAvailability
// getStatus
// getName
// getUsername


// Variables:
// id: should be same as Meteor.userId() of the user
// name: name from Facebook
// friends: List of user ids []
// requests: List of user ids []
// checkin: null if invisible
//    else  {availability: "available" or "busy", status: "text status: duration: integer minutes?, loc: Object {lat: latitude, lng: longitude}}
/////////Checkins and userinfo of friends as different DBS????


// {id: 1, friends: [2, 3], requests: [], checkin: null}
// {id: 2, friends: [1, 3], requests: [], checkin: {availability: "available", status: "hi", duration: 20, loc: {lat: 10, lng: 10}}}
// {id: 3, friends: [2, 3], requests: [], checkin: {availability: "busy", status: "hello", duration: 20, loc: {lat: 10, lng: 10}}}
//
// array of {name: friend's name, pic: friend's pic, checkin: {availability: "available" or "busy", status: "hello", duration: 20: loc: {lat: 10, lng: 10}}}
// UserInfo = new Mongo.Collection('info');
if (Meteor.isClient) {
  console.dir(Template);

  Template.friends.helpers({
    users: function() {
      console.log("finding users");
      var userList = [];
      Meteor.user().profile.facebookfriends.forEach(function(user) {
        console.log(user.id);
        var isFriend = false;
        var currentUser = Meteor.users.findOne({"services.facebook.id": user.id});
        if (currentUser && currentUser.isVerified) {
          Meteor.user().friends.forEach(function(friendId) {
            var friend = Meteor.users.findOne({_id: friendId});
            if (friend.services.facebook.id === user.id) {
              console.log("friending");
              userList.push({name: user.name, id: currentUser._id, friend: true, request: false, requested: false});
              isFriend = true;
            }
          });
          if (!isFriend) {
            Meteor.user().requests.forEach(function(friendId) {
              var friend = Meteor.users.findOne({_id: friendId});
              if (friend.services.facebook.id === user.id) {
                userList.push({name: user.name, id: currentUser._id, friend: false, request: true, requested: false});
                isFriend = true;
              }
            });
          }
          if (!isFriend) {
            console.log("here");
            // var person = Meteor.users.findOne({_id: userId});
            console.log(currentUser.requests);
            currentUser.requests.forEach(function(requestId) {
              var request = Meteor.users.findOne({_id: requestId});
              console.log(request);
              if (Meteor.userId() === request._id) {
                userList.push({name: user.name, id: currentUser._id, friend: false, request: true, requested: true});
                isFriend = true;
              }
            })

          }
          if (!isFriend) {
            userList.push({name: user.name, id: currentUser._id, friend: false, request: false, requested: false});
          }
        }
      });
      console.log("LIST");
      console.log(userList);
      return userList;
    },
  });

  Template.sideBar.helpers({
    friends: function() {
      var friendNames = [];
      console.log(Meteor.user());
      console.log(Meteor.user().friends);
      Meteor.user().friends.forEach(function(friendId) {
        var friend = Meteor.users.findOne({_id: friendId});
        friendNames.push(friend.services.facebook.name);
      });
      if (friendNames.length === 0) {
        friendNames.push("None");
      }
      return friendNames;
    }
  });

}
