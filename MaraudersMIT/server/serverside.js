if (Meteor.isServer) {
  Meteor.startup(function () {
    var doneTasks = []
    FutureTasks.find().forEach(function(checkin) {
      if (checkin.fireDate < new Date()) {
        checkOut(checkin.details);
        doneTasks.push(checkin._id);
      } else {
        addTask(checkin.user_id, checkin.details, checkin.fireDate);
      }
    });
    doneTasks.forEach(function(id) {
      console.log(id);
      FutureTasks.remove(id);
    });
    SyncedCron.start();

    Meteor.publish("users", function() {
      return Meteor.users.find();
    });
    Meteor.users.allow({
      update: function(userId, doc) {
        return true;
      }
    });
    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });

    //localhost:2001
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
	          console.log('creating new user');
            options.profile.picture = getFbPicture(user.services.facebook.accessToken);
      	    options.profile.facebookfriends = getFbFriends(user.services.facebook.accessToken);

            var name = user.services.facebook.name;;
            var fbID = user.services.facebook.id;
            // Iterate through all FB friends that use app
            options.profile.facebookfriends.forEach(function(friendFB) {
                console.log("updating with new friend");
                var isAlreadyFBFriend = false;
                var friend = Meteor.users.findOne({"services.facebook.id": friendFB.id});
                // For each friend, check to see if you are listed as a FB friend
                if (friend) {
                  friend.profile.facebookfriends.forEach(function(tempFriend) {
                    if (tempFriend.id === fbID) {
                      isAlreadyFBFriend = true;
                    }
                  });
                  // If not, add yourself
                  if (!isAlreadyFBFriend) {
                    Meteor.users.update({"services.facebook.id": friendFB.id}, {$push: {"profile.facebookfriends": {name: name, id: fbID}}});
                  }
                }
            });

            user.profile = options.profile;
        }
        user.friends = [];
        user.requests = []
        user.checkin = {availability: "invisible"};
        user.handle = null;
        
        user.isVerified = false;

       
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
	console.log('result');
	console.log(result);
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


}


