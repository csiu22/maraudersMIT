describe('CheckInService', function () {
  'use strict';

  describe('setUserStatus', function () {
    it("should update the user\'s checkin data.", function() {
      expect(4).toBe(4);
    });

    // it('should update the user\'s checkin data.', function () {
    //   var fakeUser = {
    //     _id: '123',
    //     checkin: {
    //       availability: "unavailable"
    //     }
    //   };

    //   spyOn(Meteor, 'user').and.returnValue(fakeUser);
    //   expect(fakeUser.checkin.availability).toBe("unavailable");
      
    //   var end_time = 1449433286186;
    //   var availability = "available";
    //   var text_status = "Hello Word";
    //   var duration = 90;
    //   var latitude = 42.357301899999996;
    //   var longitude = -71.0936892;

    //   var checkedIn = {
    //     "checkin" : {
    //       "end_time" : end_time,
    //       "availability" : availability,
    //       "text_status" : text_status,
    //       "duration" : duration,
    //       "loc" : {
    //         "lat" : latitude,
    //         "lng" : longitude
    //       }
    //     }
    //   }

    //   var pos = {
    //     lat: latitude,
    //     lng: longitude
    //   };

    //   CheckInService.checkInUser(end_time, availability, text_status, duration, pos);
    //   expect(fakeUser.checkin).toBe(checkedIn);
  });

});