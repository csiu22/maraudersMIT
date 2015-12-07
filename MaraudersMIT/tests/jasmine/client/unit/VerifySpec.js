describe('VerifyService', function () {
  'use strict';

  describe('verifyUser', function () {
    it('should verify a user who provides a valid @mit.edu address.', function () {
      var userId = 123;
      // var email = "alyssap@mit.edu"
      spyOn(Meteor.users, 'update');

      VerifyService.verifyUser(userId);
      expect(Meteor.users.update.calls.argsFor(0)).toEqual([userId, {$set: {isVerified: true}}]);
    });
  });
});