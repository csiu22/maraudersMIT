
var redirect_main = function() {
	this.route('maraudersmap', {path: '/maraudersmap'});
};

Template.login.events({
	"submit .register-email": function () {      
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		console.log(event.target);
		var email = event.target.email.value;
		var domain = email.trim().toLowerCase().slice(-8);

		if (domain === "@mit.edu") {
			console.log("Yay that's an mit email");
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
						
						Accounts.onLogin(function(){
	  						if(Meteor.user().isNew){
	    						Meteor.users.update(Meteor.userId(),{
	      							$set:{
	        							isNew: false
	      								}
	    						});		
	  						} else{
	  								redirect_main();
	  							}
	  					});
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


