if (Meteor.isClient) {
	console.log("clientside code");
	Meteor.startup(function() {
  		Meteor.loginWithFacebook({
    			requestPermissions: ['publish_actions']
  		}, function (err) {
    			if (err) {
      				Session.set('errorMessage', err.reason || 'Unknown error');
    			}
  		});
	});

	
}


