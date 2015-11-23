if (Meteor.isServer) {
  Meteor.methods({
    'checkIn': function(availability, text_status, duration, location) {
      console.log("checking in from server");
      Meteor.users.update({_id: Meteor.userId()}, {$set: {checkin: {availability: availability, text_status: text_status, duration: duration, loc: location}}});
     }
  });
}
