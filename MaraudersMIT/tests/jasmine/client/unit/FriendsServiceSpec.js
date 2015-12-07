
describe('FriendsService', function () {
  'use strict';

  var fakes, fakeUser, fakeFriend;

  beforeEach(function () {
     fakes = {
	fakeUser: {
      		_id: '123',
       		friends: ["abc", "def"],
		requests: ['890']
     	},
     	fakeFriend: {
       		_id: '567',
       		friends: ["abc", "def"],
		requests: []
     	},
	fakeFriendTwo: {
       		_id: '890',
       		friends: ["abc", "def"],
		requests: ["imo", '123']
     	},
	fakeFriendAll: {
       		_id: 'abc',
       		friends: ["def", '123', '567', '890'],
		requests: []
     	}
     };
  });

  describe('sendFriendRequest', function () {
	it('should add a request to the friend requested.', function () {
    		spyOn(Meteor, 'user').and.returnValue(fakes.fakeFriend);
        	expect(fakes.fakeFriend.friends.length).toBe(2);
		expect(Meteor.user().friends.length).toBe(2);

		FriendsService.sendFriendRequest(fakes.fakeUser._id);
		expect(fakes.fakeUser.requests.length).toBe(1);
		expect(fakes.fakeFriend.requests.length).toBe(0);
  	});
  });

  describe('acceptFriendRequest', function () {
    	it('should make two users friends with each other in the database.', function () {
    		spyOn(Meteor, 'user').and.returnValue(fakes.fakeUser);
        	expect(fakes.fakeUser.friends.length).toBe(2);
		expect(Meteor.user().friends.length).toBe(2);

        	FriendsService.acceptFriendRequest(fakes.fakeFriendTwo._id);

        	expect(Meteor.user().friends.length).toBe(2);
    	});
  });

  describe('removeFriend', function () {
	it('should make two users that are friends not be friends with each other in the database.', function () {
    		spyOn(Meteor, 'user').and.returnValue(fakes.fakeUser);
        	expect(fakes.fakeUser.friends.length).toBe(2);
		expect(Meteor.user().friends.length).toBe(2);

        	FriendsService.removeFriend(fakes.fakeFriendAll._id);

        	expect(fakes.fakeUser.friends.length).toBe(2);
		expect(fakes.fakeFriendAll.friends.length).toBe(4);
    	});
  });

  describe('cancelFriendRequest', function () {
	it('should delete a request.', function () {
    		spyOn(Meteor, 'user').and.returnValue(fakes.fakeFriendTwo);

        	FriendsService.cancelFriendRequest(fakes.fakeUser._id);

        	expect(fakes.fakeUser.requests.length).toBe(1);

    	});
  });

});

