Template.friends.events({
  'submit .friend-accept': function() {
    var friendID = event.target.id;
    Meteor.call('acceptFriendRequest', friendID, function() {
      console.log("done accepting");
    });
  },

  'submit .friend-request': function() {
    console.log("friengin");
    console.log(event.target);
    console.log(this.id);
    var friendID = event.target.id;
    console.log(friendID);
    Meteor.call('sendFriendRequest', friendID, function() {
      console.log("done requesting");
    });
  },

  'submit .friend-remove': function() {
    var friendID = event.target.id;
    Meteor.call('removeFriend', friendID, function() {
      console.log("done unfriending");
    });
  }

});