// var fakeUser;
beforeEach(function() {
  fakeUser = {
    "_id": 'myId',
    "friends": [
      "friend1",
      "friend2"
    ],
    "requests": [
      "requestedFriend1"
    ]
  };
});

describe("Tests for the User model", function() {
  it("verifies that the checkIn function is called", function() {
    spyOn(Meteor.users, 'update');

    //Call checkIn Meteor Method
    Meteor.call('checkIn');
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the checkOut function is called", function() {
    // var thisContext = {userId: 1};
    var user = {
      "_id": '123',
      "checkin" : {
        "end_time" : 1449433286186,
        "availability" : "available",
        "text_status" : "hello world",
        "duration" : 90,
        "loc" : {
          "lat" : 42.357301899999996,
          "lng" : -71.0936892
        }
      } 
    };
    spyOn(Meteor, 'user').and.returnValue(user);
    spyOn(Meteor.users, 'update');

    // //Call checkOut Meteor Method
    Meteor.call('checkOut');
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the sendFriendRequest function is called", function() {
    spyOn(Meteor, 'user').and.returnValue(fakeUser);
    // Finds and updates the friend.
    var friend = {
      "_id": '123',
      "friends": ['def'],
      "requests": []
    };

    spyOn(Meteor.users, 'findOne').and.returnValue(friend);
    spyOn(Meteor.users, 'update');

    //Call sendFriendRequest Meteor Method
    Meteor.call('sendFriendRequest');
    expect(Meteor.users.findOne).toHaveBeenCalled();
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the cancelFriendRequest function is called", function() {
    spyOn(Meteor, 'user').and.returnValue(fakeUser);
    // Finds and updates the friend.
    var friend = {
      "_id": '123',
      "friends": ['def'],
      "requests": ['myId']
    };

    spyOn(Meteor.users, 'findOne').and.returnValue(friend);
    spyOn(Meteor.users, 'update');

    //Call cancelFriendRequest Meteor Method
    Meteor.call('cancelFriendRequest');
    expect(Meteor.users.findOne).toHaveBeenCalled();
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the acceptFriendRequest function is called", function() {
    spyOn(Meteor, 'user').and.returnValue(fakeUser);
    // Finds and updates the friend.
    var friend = {
      "_id": '123',
      "friends": ['def'],
    };

    spyOn(Meteor.users, 'update');

    //Call acceptFriendRequest Meteor Method
    Meteor.call('acceptFriendRequest');
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the removeFriend function is called", function() {
    spyOn(Meteor, 'user').and.returnValue(fakeUser);
    // Finds and updates the friend.
    var friend = {
      "_id": '123',
      "friends": ['def'],
    };

    spyOn(Meteor.users, 'findOne').and.returnValue(friend);
    spyOn(Meteor.users, 'update');

    //Call removeFriend Meteor Method
    Meteor.call('removeFriend');
    expect(Meteor.users.findOne).toHaveBeenCalled();
    expect(Meteor.users.update).toHaveBeenCalled();
  });

  it("verifies that the getFriendLocs function is called", function() {
    spyOn(Meteor, 'user').and.returnValue(fakeUser);
    // Finds and updates the friend.
    var friend = {
      "_id" : "friendId",
      "services" : {
        "facebook" : {
          "name" : "Ben Bitdiddle",
        },
      },
      "profile" : {
        "picture" : "linkToFacebookProfilePicture"
      },
      "checkin" : {
        "end_time" : 1449463702756,
        "availability" : "busy",
        "text_status" : "Hello World",
        "duration" : "90",
        "loc" : {
          "lat" : 42.3572628,
          "lng" : -71.0939738
        }
      }
    }

    spyOn(Meteor.users, 'findOne').and.returnValue(friend);

    //Call getFriendLocs Meteor Method
    Meteor.call('getFriendLocs');
    expect(Meteor.users.findOne).toHaveBeenCalled();
  });
});