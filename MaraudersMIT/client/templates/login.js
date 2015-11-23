Template.loginbutton.events({
	"click #login" : function (e, tmpl) {
		Meteor.loginWithFacebook(
			{
			requestPermissions: ['user_friends']
			}, 
			function (err) {
				if (err) {
					//errorhandling
				} else {
					//show alert?
				}
			}
		);
	}
});

Template.logoutbutton.events({
	"click #logout" : function (e, tmpl) {
		Meteor.logout(function (err) {
			if (err) {
				//errorhandling
			} else {
				//show alert?
			}
		});
	}
});
