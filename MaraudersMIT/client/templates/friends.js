Template.friends.events({
  "click .friend-accept": function() {
    var friendID = this.id;
    Meteor.call('acceptFriendRequest', friendID, function() {
      console.log("done accepting");
    });
  },

  "click .friend-request": function() {
    // event.preventDefault();
    console.log("friengin");
    console.log(this);
    console.log(this.name);
    var friendID = this.id;
    console.log(friendID);
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