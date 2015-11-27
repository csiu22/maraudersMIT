if (Meteor.isClient) {
  console.dir(Template);

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

  // Lists all of your friends on the app
  Template.sideBar.helpers({
    marauderFriends: function() {
      return Template.instance().myAsyncValue.get();
    }
  });

}
