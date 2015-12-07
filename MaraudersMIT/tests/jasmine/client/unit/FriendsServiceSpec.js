describe('FriendsService', function () {
  'use strict';

  var fakeUser;
  beforeEach(function () {
    fakeUser = {
      _id: '123',
      friends: ["abc", "def"]
    };
    fakeFriend = {
      _id: '567',
      friends: ["abc", "def"]
    };
  });


  describe('acceptFriendRequest', function () {
    // it('should make two users friends with each other in the database.', function () {
    //   spyOn(Meteor, 'user').and.returnValue(fakeUser);
    //   expect(fakeUser.friends.length).toBe(2);

    //   var newFriend = "ghi"
    //   FriendsService.acceptFriendRequest(fakeFriend._id);

    //   expect(fakeUser.friends.length).toBe(3);

    //   //TODO check that the friend's list increased too??
    // });
  });

  describe('sendFriendRequest', function () {
  });

  describe('removeFriend', function () {
  });

  describe('cancelFriendRequest', function () {
  });

});