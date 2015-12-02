if (Meteor.isServer) {
  FutureTasks = new Meteor.Collection('future_tasks');
  
  checkOut = function(details) {
    Meteor.users.update({_id: details.user_id}, {$set: {checkin: null}});
    Meteor.users.update({_id: details.user_id}, {$set: {handle: null}});
  };
  
  addTask = function(id, details, fireDate) {
    Meteor.users.update({_id: details.user_id}, {$set: {checkin: details.checkin}});
    Meteor.users.update({_id: details.user_id}, {$set: {handle: id}});
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
    fireDate.setMinutes(fireDate.getMinutes() + parseInt(details.checkin.duration));
    var thisId = FutureTasks.insert({details, fireDate});
    addTask(thisId, details, fireDate);
    return true;
  };
}
