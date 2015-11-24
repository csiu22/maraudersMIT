if (Meteor.isServer) {
  Meteor.startup(function () {
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
      appId: "211487295849565",
      secret: "67be26f2e83883370b4802109488ed25",
      requestPermissions: ['user_friends']
    });


    Accounts.onCreateUser(function(options, user) {
        if (options.profile) {
	          console.log('creating new user');
            options.profile.picture = getFbPicture(user.services.facebook.accessToken);
      	    options.profile.facebookfriends = getFbFriends(user.services.facebook.accessToken);

            user.profile = options.profile;
        }
        user.friends = [];
        user.requests = []
        user.checkin = null;
        
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


