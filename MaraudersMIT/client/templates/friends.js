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
  }

});