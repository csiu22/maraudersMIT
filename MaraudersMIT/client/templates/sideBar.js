
//take user to their location on the map
var userFocus = function(){


}

  Template.sideBar.events({
    'click #check-in': function () {
    	userFocus();
      	Overlay.show('checkInOverlay');
    },
    'click #map-icon': function() {
    	userFocus();
    }
  });

//Initialize tooltips
Template.sideBar.rendered = function(){ $('[data-toggle="tooltip"]').tooltip();}