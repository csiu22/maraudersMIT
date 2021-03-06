if (Meteor.isServer) {
    Meteor.startup(function () {
    var doneTasks = []
    FutureTasks.find().forEach(function(checkin) {
      if (checkin.fireDate < new Date()) {
        checkOut(checkin.details);
        doneTasks.push(checkin._id);
      } else {
        addTask(checkin._id, checkin.details, checkin.fireDate);
      }
    });
    doneTasks.forEach(function(id) {
      FutureTasks.remove(id);
    });
    SyncedCron.start();

    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });


    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      // Localhost
      appId: "1490929597876207",
      secret: "48b68810d152e9508b23f35fa3addc34",
      // Deploy
//       appId: "211487295849565",
//       secret: "67be26f2e83883370b4802109488ed25",
      requestPermissions: ['user_friends']
    });


    Accounts.onCreateUser(function(options, user) {
      if (options.profile) {
   
        user.facebookfriends = getFbFriends(user.services.facebook.accessToken);

        var name = user.services.facebook.name;;
        var fbID = user.services.facebook.id;
        var fbPic = getFbPicture(user.services.facebook.accessToken);
        user.profile = {name: name, picture: fbPic};

        user.facebookfriends.forEach(function(friendFB) {
          var isAlreadyFBFriend = false;
          var friend = Meteor.users.findOne({"services.facebook.id": friendFB.id});
          // For each friend, check to see if you are listed as a FB friend
          if (friend) {
            friend.facebookfriends.forEach(function(tempFriend) {
              if (tempFriend.id === fbID) {
                isAlreadyFBFriend = true;
              }
            });
            // If not, add yourself
            if (!isAlreadyFBFriend) {
              Meteor.users.update({"services.facebook.id": friendFB.id}, {$push: {"facebookfriends": {name: name, id: fbID}}});
            }
          } 
        });
      }
      return user;
    });

    var getFbPicture = function(accessToken) {
        var result;
        result = Meteor.http.get("https://graph.facebook.com/me",
            {params: {
                    access_token: accessToken,
                    fields: 'picture'
                  }
              });
        if (result.error) {
        console.log("error in serverside.js/getFbPicture");
        console.log(result.error);
        };

        return result.data.picture.data.url;
    };

    var getFbFriends = function(accessToken) {
        var result;
        result = Meteor.http.get("https://graph.facebook.com/me",
            {params: {
                    access_token: accessToken,
                    fields: 'friends'
                  }
              });
        if (result.error) {
        console.log("error in serverside.js/getFbFriends");
            console.log(result.error);
        };
	friendListData = result.data.friends.data;
        return friendListData;
    };

    // Meteor.publish("access_token", function () {
    //   return Meteor.users().find(
    //     { _id : Meteor.userId() },
    //     {fields: {'service': 1}}
    //   );
    // });

  });
   
  // Publishes all information about your Marauder friends. 
  Meteor.publish("all-friends", function() {
    if (this.userId) {
      var friends = Meteor.users.findOne({"_id": this.userId}).friends;
      friends.push(this.userId);
      return Meteor.users.find({"_id": {$in: friends}});
    }
  });

  // Publishes only facebook profile, basic profile information, and friend requests about 
  // Facebook friends who are not your Marauder friends. DOES NOT PUBLISH LOCATION.
  Meteor.publish("facebook-friends", function() {
    if (this.userId) {
      var facebookFriends = Meteor.users.findOne({"_id": this.userId}).facebookfriends;
      var fbFriendIds = [];
      facebookFriends.forEach(function(friend) {
        fbFriendIds.push(friend.id);
      });
      return Meteor.users.find({"services.facebook.id": {$in: fbFriendIds}}, {fields: {"profile": 1, "services.facebook": 1, "requests": 1}}); 
    }
  });
}


