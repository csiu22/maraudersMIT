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
        console.log(typeof(user.id));
        var isFriend = false;
        Meteor.user().friends.forEach(function(friendId) {
          var friend = Meteor.users.findOne({_id: friendId});
          if (friend.services.facebook.id === user.id) {
            console.log("friending");
            userList.push({name: user.name, id: user.id, friend: true, request: false});
            isFriend = true;
          } 
        });
        if (!isFriend) {
          Meteor.user().requests.forEach(function(friendId) {
            var friend = Meteor.users.findOne({_id: friendId});
            if (friend.services.facebook.id === user.id) {
              userList.push({name: user.name, id:user.id, friend: false, request: true});
              isFriend = true;
            }
          });
        }
        if (!isFriend) {
          userList.push({name: user.name, id: user.id,friend: false, request: false});
        }
      });
      return userList;
    },

    addFriend: function(friendId) {
      Meteor.user().friends.push(friendId);
    },

    removeFriend: function(friendId) {
      var index = Meteor.user().friends.indexOf(friendId);
      Meteor.user.friends.splice(index, 1);
    }
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
  Template.maraudersMap.helpers({
    friendLocs: function() {
      console.log("friend locs");
      var friends = Meteor.user().friends;
      var locations = [];
      friends.forEach(function(friendId) {
        var friend = Meteor.users.findOne({_id: friendId});
        if (friend.checkin) {
          locations.push({friendId});
//          locations.push({name: friend.profile.name, pic: friend.profile.picture,
  //                       checkin: friend.checkin});
        } 
      });
      return locations;
    }
  });
  /*

  Template.maraudersMap.helpers({
    location: function() {
      return User_mm.find({id: Meteor.userId()}).loc;
    }
    friendLocs: function() {
      // find friends associated with current users
      var friends = User_mm.find({id: Meteor.userId()}).friends;
      // create locations array to return. should contain: friend's name, check in info
      var locations = [];
      // for each friend
      friends.forEach(function(friendId) {
        /*
          // find friend's profile and extract info about checkin if they are checked in 
          var friendMM = User_mm.find({id: friendId}); 
//          var friend = Meteor.users.find(id: 
          // if friend exists
          if (friend) {
//            locations.push({name: 
          } 
      });
    }
  });
 */ 
}


//   var currentUserId = Meteor.userId();
//   currentUser = UserInfo.findOne({user: currentUserId});

        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

// Template.maraudersMap.helpers({
//   location: function() {
//     return Meteor.user().geolocation;
//   }
// });

// Template.friends.helpers({
//   friends: function() {
//     return Meteor.user().friends;
//   }
// });

// Template.checkIn.helpers({
//   checkIn: function() {
//     Meteor.user().update(
//       {fields:
//         //add geolocation
//         {state:},
//         {availability:},
//         {duration:}
//       });
//   }
// });
  // Accounts.onCreateUser(function(options, user) {
  //       if (options.profile) {
  //           options.profile.picture = getFbPicture(user.services.facebook.accessToken);

  //           options.profile.friends = [];   //getFBfriends()
  //           user.profile = options.profile;

  //           user.profile.text_status = "I solemnly swear that I'm up to no good";

  //           user.profile.availability = "invisible";

  //           user.profile.duration = 0;

  //           user.geolocation = "bleh";



  //       }
  //       return user;
  //   });
// var getLocation = function(id) {
//   return currentUser.geolocation
// }
