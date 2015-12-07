VerifyService = {
  /**
   * Set user-inputted status, availability, duration, and location.
   */
  verifyUser: function (userId) {
		Meteor.users.update(userId,{
  			$set:{isVerified: true}
 	  	});
    	console.log("verified!");
  }
};

Template.newuser.events({
    "submit .register-email": function () {      
		// Prevent default browser form submit
      	console.log("submitted");
		event.preventDefault();

		// Get value from form element
		var email = event.target.email.value;
		var domain = email.trim().toLowerCase().slice(-8);

		if (domain === "@mit.edu") {
			if (Meteor.user()) {
				VerifyService.verifyUser(Meteor.userId());
				redirect('maraudersMap');
			}
		} else {
			console.log("You don't even go here");
			alert("Please enter a valid MIT address");
		}
	},
});
