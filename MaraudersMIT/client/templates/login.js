
var redirect_main = function() {
  Router.go("maraudersMap");
//	this.route('maraudersMap', {path: '/maraudersmap'});
};

var redirect_register = function() {
  Router.go('newuser');
//	this.route('newuser', {path: '/newuser'});
};

Accounts.onLogin(function(){
	  if(Meteor.user().isVerified){
      console.log("already registered");
	  	redirect_main();
	  } else{
      console.log("registering");
	 	  redirect_register();
	 }
});

Template.newuser.events({
"submit .register-email": function () {      
		// Prevent default browser form submit
    console.log("submitted");
		event.preventDefault();

		// Get value from form element

		var email = event.target.email.value;
		var domain = email.trim().toLowerCase().slice(-8);

		if (domain === "@mit.edu") {
  		Meteor.users.update(Meteor.userId(),{
      		$set:{isVerified: true}
     	});
    	
      console.log("verfied!");
    	redirect_main();

		} else {
			
			console.log("You don't even go here");
			alert("Please enter a valid MIT address");
		}
	},
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

