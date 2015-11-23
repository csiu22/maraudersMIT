if (Meteor.isServer) {
  Meteor.startup(function () {
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
      appId: "1490929597876207",
      secret: "48b68810d152e9508b23f35fa3addc34",
      requestPermissions: ['user_friends']
    });


    Accounts.onCreateUser(function(options, user) {
	alert("does this work?");
        if (options.profile) {
	    console.log('creating new user');
            options.profile.picture = getFbPicture(user.services.facebook.accessToken);
	    options.profile.facebookfriends = getFbFriends(user.services.facebook.accessToken);

            options.profile.friends = [];

            options.profile.text_status = "I solemnly swear that I'm up to no good";

            options.profile.availability = "invisible";

            options.profile.duration = 0;

            user.geolocation = "bleh";  //idk isn't showing up???
            user.profile = options.profile;
        }
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
	friendNames = [];
	for (i=0; i < friendListData.length; i++) {
		friendNames.push(friendListData[i].name);
	}
        return friendNames;
    };

    // Meteor.publish("access_token", function () {
    //   return Meteor.users().find(
    //     { _id : Meteor.userId() },
    //     {fields: {'service': 1}}
    //   );
    // });

  });


}


