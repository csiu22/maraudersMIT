
var redirect_main = function() {
	this.route('maraudersmap', {path: '/maraudersmap'});
};

var redirect_register = function() {
	this.route('newuser', {path: '/newuser'});
};

Accounts.onLogin(function(){
	  if(Meteor.user().isNew){
	 	redirect_register();
	  } else{
	  	redirect_main();
	 }
});

Template.login.events({
	"submit .register-email": function () {      
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element

		var email = event.target.email.value;
		var domain = email.trim().toLowerCase().slice(-8);

		if (domain === "@mit.edu") {
			
		Meteor.users.update(Meteor.userId(),{
      		$set:{isVerified: true}
    	});
    	
    	redirect_main();

		} else {
			
			console.log("You don't even go here");
			alert("Please enter a valid MIT address");
		}
	}, 

	"click #login" : function (e, tmpl) {
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


Template.login.helpers = ({
	redirect_main: redirect_main,
});

