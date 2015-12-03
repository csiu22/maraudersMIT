
//take user to their location on the map
var userFocus = function(){
  if(DEBUG) console.log("userFocus method");
  if( maraudersMap) {
    maraudersMap.getUserLocation(maraudersMap.setCenter);
  }

}

  Template.sideBar.events({
    'click #check-in': function () {
      	Overlay.show('checkInOverlay');
    },

    'click #check-out': function () {
        Meteor.call("checkOut", function() {
          console.log("finished checking out");
        });
        alert("You have successfully checked out.");
    },

     'click #locate': function () {
        userFocus();
    },
  });


 Template.sideBar.helpers({
    marauderFriends: function() {
      return Template.instance().myAsyncValue.get();
    },
  });

 // Sets up sideBar template so that helper functions can use async functions
  Template.sideBar.created = function(){
    var self = this;
    self.myAsyncValue = new ReactiveVar([]);

    Meteor.call('getMarauderFriends', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        self.myAsyncValue.set(data);
      }
    });
  };

//Initialize tooltips
Template.sideBar.rendered = function(){ $('[data-toggle="tooltip"]').tooltip();}
