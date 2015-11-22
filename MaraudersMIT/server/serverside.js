if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });

    //localhost:2001
    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "1490929597876207",
      secret: "48b68810d152e9508b23f35fa3addc34"
    });


    Accounts.onCreateUser(function(options, user) {
        if (options.profile) {
            options.profile.picture = getFbPicture(user.services.facebook.accessToken);

            options.profile.friends = [];

            options.profile.text_status = "I solemnly swear that I'm up to no good";

            options.profile.availability = "invisible";

            options.profile.duration = 0;

            user.geolocation = "bleh";  //idk isn't showing up???
            user.profile = options.profile;
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

    // Meteor.publish("access_token", function () {
    //   return Meteor.users().find(
    //     { _id : Meteor.userId() },
    //     {fields: {'service': 1}}
    //   );
    // });

  });


}


