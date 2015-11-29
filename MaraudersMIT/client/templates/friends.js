Template.friends.events({
  "click .friend-accept": function() {
    var friendID = this.id;
    Meteor.call('acceptFriendRequest', friendID, function() {
      console.log("done accepting");
    });
  },

  "click .friend-request": function() {
    var friendID = this.id;
    Meteor.call('sendFriendRequest', friendID, function() {
      console.log("done requesting");
    });
  },

  "click .friend-remove": function() {
    var friendID = this.id;
    Meteor.call('removeFriend', friendID, function() {
      console.log("done unfriending");
    });
  },

  "click .friend-cancel-request": function() {
    var friendID = this.id;
    Meteor.call('cancelFriendRequest', friendID, function() {
      console.log("done canceling");
    });
  }

});

// Sets up friends page so that helper functions can use async functions
  Template.friends.created = function(){
    var self = this;
    self.myAsyncValue = new ReactiveVar([]);

    Meteor.call('getFacebookFriends', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        self.myAsyncValue.set(data);;
      }
    });
  };

  Template.friends.helpers({
    facebookFriends: function() {
      return Template.instance().myAsyncValue.get();
    }
  });