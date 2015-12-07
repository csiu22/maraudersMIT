if (Meteor.isClient) {
  Meteor.subscribe("all-friends");
  Meteor.subscribe("facebook-friends");
}

Meteor.logout(function(err) {
  Router.go("login");
});

Accounts.onLogin(function(err) {
  Router.go("maraudersMap");
});

Template.login.events({
	  "click #login" : function (e, tmpl) {
      console.log("logging in");
			Meteor.loginWithFacebook(
				{requestPermissions: ['user_friends']}, 
				function (err) {
					if (err) {
						//errorhandling
					
					} else {
						
					}
				}
			);
		}, 

	"click #login-buttons-logout" : function (e, tmpl) {
			Meteor.logout(function (err) {
				if (err) {
					//errorhandling
				} else {
					console.log("logout!");
				}
			});
		}


  });


