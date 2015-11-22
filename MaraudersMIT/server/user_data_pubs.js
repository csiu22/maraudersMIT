// Meteor.publish("userData", function () {
//   if (Meteor.userId()) {
//     return Meteor.users.find({_id: Meteor.userId()},
//                              {fields: {'email': 1,
//                                        'text_status': 1, "availability": 1, "duration": 1}});
//   } else {
//     this.ready();
//   }
// });