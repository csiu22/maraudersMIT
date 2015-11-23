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
	    	
	        		console.log("verified!");
	    		redirect('maraudersMap');
		} else {
			console.log("You don't even go here");
			alert("Please enter a valid MIT address");
		}
	},
});
