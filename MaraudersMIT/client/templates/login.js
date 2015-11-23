if (Meteor.isClient) {
  Meteor.subscribe("users");
  Accounts.onLogin(function(){
    	  console.log("Is the user verified? " + Meteor.user().isVerified);
 	  if(Meteor.userId() || Meteor.user().isVerified){
 	  	// If the user is already verified or already logged in, go directly to the map.
 	  	if (Meteor.userId()) {
 	  		console.log("already logged in");
 	  	} else {
 	  		console.log("already registered");	
 	  	}      		
	  	redirect('maraudersMap');
	  } else{
      		console.log("registering");
	 	redirect('newuser');
	  }
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
}
