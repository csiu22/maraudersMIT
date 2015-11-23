//Every user has:

// id
// name
//	first
//	middle
//	last
// username (password will be in authentication?)
// location (latitude, longitude)

// list of Friends
// list of Friend Requests

// Status - state
//	available, busy, invisible -- enums?
// Status - text
// 	DISCUSS: character limit?


// Setters
// add Friend
// accept Friend (only for people in list of Friend Requests)
// delete Friend (only for people in list of Friends)


//Getters
// getLocation
// getStatus
// getName
// getUsername

/////////Checkins and userinfo of friends as different DBS????

// UserInfo = new Mongo.Collection('info');

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