if (Meteor.isServer) {
  FutureTasks = new Meteor.Collection('future_tasks');

  checkOut = function(details) {
    Meteor.users.update({_id: details.user_id}, {$set: {checkin: {availability: "unavailable"}}});
  };

  addTask = function(id, details, fireDate) {
    var checkin = {availability: details.availability, text_status: details.text_status, duration: details.duration, loc: details.loc, handle: id}
    Meteor.users.update({_id: details.user_id}, {$set: {checkin: checkin}});
    SyncedCron.add({
      name: id,
      schedule: function(parser) {
        return parser.recur().on(fireDate).fullDate();
      },

      job: function() {
        checkOut(details);
        FutureTasks.remove(id);
        SyncedCron.remove(id);
        return id;
      }
    });
  };

  checkIn = function(details) {
    var fireDate = new Date();
    fireDate.setMinutes(fireDate.getMinutes() + parseInt(details.duration));
    var thisId = FutureTasks.insert({details, fireDate});
    addTask(thisId, details, fireDate);
    return true;
  };
}
