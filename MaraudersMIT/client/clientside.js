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

Template.googleMap.rendered = function() {
$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUWvkqoAwT70st_eiDUo0xcnIcUGgo9g', function(){
  			$.getScript('https://google-maps-utility-library-v3.googlecode.com/svn-history/r435/trunk/richmarker/src/richmarker-compiled.js', function(){
  				renderMap();
 		});
 	});

}

Template.sideBar.rendered = function() {
  
}
	
}


