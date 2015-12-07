if (Meteor.isServer) {
  Schema = {};

  Schema.User = new SimpleSchema({
    "_id": {
      type: String
    },
    'profile': {
      type: Object,
      defaultValue: null,
      blackbox: true
    },
    "friends": {
      type: [String],
      defaultValue: []
    },
    "requests": {
      type: [String],
      defaultValue: []
    },
    "checkin": {
      type: Object,
      defaultValue: {availability: "unavailable"},
      blackbox: true,
      optional: true
    },
    "isVerified": {
      type: Boolean,
      defaultValue: false
    },
    "facebookfriends.$.name": {
      type: String
    },
    "facebookfriends.$.id": {
      type: String
    },
    "services": {
      type: Object,
      blackbox: true
    }
  });
  
  Meteor.users.attachSchema(Schema.User);
}
